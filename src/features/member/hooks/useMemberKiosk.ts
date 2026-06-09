'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
    resetKioskProgress,
    sendDispenseCommand,
    setKioskProgress,
    subscribeDeviceStatus,
    subscribeKioskProgress,
    type KioskProgress,
} from '@/features/device/infrastructure/device.firebase';
import { addTransaction } from '@/features/transaction/infrastructure/transaction.firebase';
import type { DeviceData } from '@/types/device';

const VOLUME_OPTIONS = [100, 300, 500, 1000] as const;

type FinishState = 'idle' | 'done';

const getWaterQuality = (tds: number) => {
    if (tds <= 150) return 'Baik';
    if (tds <= 300) return 'Sedang';
    return 'Kurang Baik';
};

export const useMemberKiosk = () => {
    const [device, setDevice] = useState<DeviceData | null>(null);
    const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
    const [kiosk, setKiosk] = useState<KioskProgress | null>(null);
    const [finishState, setFinishState] = useState<FinishState>('idle');

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const finishRef = useRef<NodeJS.Timeout | null>(null);

    // Simpan TDS terkini di ref agar selalu bisa dibaca dari dalam interval callback
    const tdsRef = useRef<number>(0);

    useEffect(() => {
        const unsubDevice = subscribeDeviceStatus((data) => {
            setDevice(data);
            tdsRef.current = Number(data?.sensors?.tds || 0);
        });
        const unsubKiosk = subscribeKioskProgress((data) => setKiosk(data));

        return () => {
            unsubDevice();
            unsubKiosk();

            if (intervalRef.current) clearInterval(intervalRef.current);
            if (finishRef.current) clearTimeout(finishRef.current);
        };
    }, []);

    const isOnline = !!device?.status?.online;
    const waterLevel = Number(device?.sensors?.waterLevel || 0);
    const tds = Number(device?.sensors?.tds || 0);
    const glassDetected = !!device?.sensors?.glassDetected;
    const waterQuality = getWaterQuality(tds);

    const isDispensing = kiosk?.isDispensing || false;
    const targetVolume = selectedVolume || 0;
    const filledVolume = selectedVolume ? kiosk?.filledVolume || 0 : 0;

    const canStart = useMemo(() => {
        if (!selectedVolume) return false;
        if (!isOnline) return false;
        if (!glassDetected) return false;
        if (waterLevel <= 0) return false;
        if (isDispensing) return false;
        return true;
    }, [selectedVolume, isOnline, glassDetected, waterLevel, isDispensing]);

    const resetToInitial = async () => {
        await resetKioskProgress();
        setSelectedVolume(null);
        setKiosk(null);
        setFinishState('idle');
    };

    const startDispensing = async () => {
        if (!selectedVolume || !canStart) return;

        setFinishState('idle');

        await sendDispenseCommand(selectedVolume);
        await setKioskProgress({
            isDispensing: true,
            targetVolume: selectedVolume,
            filledVolume: 0,
            status: 'filling',
            updatedAt: Date.now(),
        });

        if (intervalRef.current) clearInterval(intervalRef.current);
        let localFilled = 0;
        // Simpan volume target secara lokal agar bisa diakses di dalam closure interval
        const requestedVol = selectedVolume;

        intervalRef.current = setInterval(async () => {
            localFilled = Math.min(localFilled + 1, requestedVol); // increment per tick (ml)

            const isCompleted = localFilled >= requestedVol;

            await setKioskProgress({
                isDispensing: !isCompleted,
                targetVolume: requestedVol,
                filledVolume: localFilled,
                status: isCompleted ? 'completed' : 'filling',
                updatedAt: Date.now(),
            });

            if (isCompleted) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }

                // ─── CATAT TRANSAKSI KE FIRESTORE ─────────────────────
                try {
                    await addTransaction({
                        actualVolume: localFilled,
                        requestedVolume: requestedVol,
                        type: 'auto',
                        tds: tdsRef.current,
                    });
                } catch (err) {
                    console.error('Gagal mencatat transaksi:', err);
                }
                // ──────────────────────────────────────────────────────

                setFinishState('done');

                if (finishRef.current) clearTimeout(finishRef.current);
                finishRef.current = setTimeout(() => {
                    resetToInitial();
                }, 4000);
            }
        }, 40); // interval per tick (ms)
    };

    const progressPercent = targetVolume ? Math.min(100, Math.round((filledVolume / targetVolume) * 100)) : 0;

    const progressText = selectedVolume ? `Mengisi... ${filledVolume}ml / ${targetVolume}ml` : 'Siap mengisi';

    return {
        volumeOptions: VOLUME_OPTIONS,
        selectedVolume,
        setSelectedVolume,
        startDispensing,
        canStart,
        isDispensing,
        finishState,
        progressPercent,
        progressText,
        statusCard: {
            online: isOnline,
            waterLevel,
            waterQuality,
        },
        guardReason: !isOnline
            ? 'Dispenser offline'
            : waterLevel <= 0
              ? 'Air habis'
              : !glassDetected
                ? 'Gelas tidak terdeteksi'
                : !selectedVolume
                  ? 'Pilih volume dulu'
                  : '',
    };
};
