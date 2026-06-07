import { renderHook, act } from "@testing-library/react";
import { useMemberKiosk } from "../useMemberKiosk";
import {
	sendDispenseCommand,
	setKioskProgress,
	subscribeDeviceStatus,
	subscribeKioskProgress,
} from "@/features/device/infrastructure/device.firebase";
import type { DeviceData } from "@/types/device";

jest.mock("@/features/device/infrastructure/device.firebase", () => ({
	subscribeDeviceStatus: jest.fn(),
	subscribeKioskProgress: jest.fn(),
	sendDispenseCommand: jest.fn(),
	setKioskProgress: jest.fn(),
	resetKioskProgress: jest.fn(),
}));

const baseDeviceData: DeviceData = {
	sensors: {
		waterLevel: 100,
		tds: 100,
		glassDetected: true,
	},
	status: {
		lastUpdated: 0,
		online: true,
	},
};

const baseKioskProgress = {
	isDispensing: false,
	targetVolume: 0,
	filledVolume: 0,
	status: "idle",
	updatedAt: 0,
};

describe("useMemberKiosk", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(subscribeDeviceStatus as jest.Mock).mockImplementation((cb) => {
			cb(baseDeviceData);
			return jest.fn();
		});

		(subscribeKioskProgress as jest.Mock).mockImplementation((cb) => {
			cb(baseKioskProgress);
			return jest.fn();
		});
	});

	it("memiliki state awal yang benar", () => {
		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.selectedVolume).toBeNull();
		expect(result.current.finishState).toBe("idle");
		expect(result.current.isDispensing).toBe(false);
		expect(result.current.progressPercent).toBe(0);
		expect(result.current.progressText).toBe("Siap mengisi");
		expect(result.current.canStart).toBe(false);
	});

	it("volumeOptions berisi [100, 300, 500, 1000]", () => {
		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.volumeOptions).toEqual([100, 300, 500, 1000]);
	});

	it("setSelectedVolume bekerja dengan benar", async () => {
		const { result } = renderHook(() => useMemberKiosk());

		await act(async () => {
			result.current.setSelectedVolume(300);
		});

		expect(result.current.selectedVolume).toBe(300);
	});

	it("guardReason menampilkan 'Dispenser offline'", () => {
		const offlineDevice: DeviceData = {
			sensors: {
				waterLevel: 100,
				tds: 100,
				glassDetected: true,
			},
			status: {
				lastUpdated: 0,
				online: false,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(offlineDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.guardReason).toBe("Dispenser offline");
	});

	it("guardReason menampilkan 'Air habis'", () => {
		const emptyWaterDevice: DeviceData = {
			sensors: {
				waterLevel: 0,
				tds: 100,
				glassDetected: true,
			},
			status: {
				lastUpdated: 0,
				online: true,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(emptyWaterDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.guardReason).toBe("Air habis");
	});

	it("guardReason menampilkan 'Gelas tidak terdeteksi'", () => {
		const noGlassDevice: DeviceData = {
			sensors: {
				waterLevel: 100,
				tds: 100,
				glassDetected: false,
			},
			status: {
				lastUpdated: 0,
				online: true,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(noGlassDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.guardReason).toBe("Gelas tidak terdeteksi");
	});

	it("canStart bernilai true jika semua syarat terpenuhi", async () => {
		const { result } = renderHook(() => useMemberKiosk());

		await act(async () => {
			result.current.setSelectedVolume(500);
		});

		expect(result.current.canStart).toBe(true);
	});

	it("waterQuality bernilai 'Baik' saat tds <= 150", () => {
		const goodTdsDevice: DeviceData = {
			sensors: {
				waterLevel: 100,
				tds: 120,
				glassDetected: true,
			},
			status: {
				lastUpdated: 0,
				online: true,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(goodTdsDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.statusCard.waterQuality).toBe("Baik");
	});

	it("waterQuality bernilai 'Sedang' saat tds <= 300", () => {
		const mediumTdsDevice: DeviceData = {
			sensors: {
				waterLevel: 100,
				tds: 250,
				glassDetected: true,
			},
			status: {
				lastUpdated: 0,
				online: true,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(mediumTdsDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.statusCard.waterQuality).toBe("Sedang");
	});

	it("waterQuality bernilai 'Kurang Baik' saat tds > 300", () => {
		const badTdsDevice: DeviceData = {
			sensors: {
				waterLevel: 100,
				tds: 350,
				glassDetected: true,
			},
			status: {
				lastUpdated: 0,
				online: true,
			},
		};

		(subscribeDeviceStatus as jest.Mock).mockImplementationOnce((cb) => {
			cb(badTdsDevice);
			return jest.fn();
		});

		const { result } = renderHook(() => useMemberKiosk());

		expect(result.current.statusCard.waterQuality).toBe("Kurang Baik");
	});

	it("startDispensing memanggil sendDispenseCommand dengan volume yang dipilih", async () => {
		const { result, unmount } = renderHook(() => useMemberKiosk());

		await act(async () => {
			result.current.setSelectedVolume(300);
		});

		await act(async () => {
			await result.current.startDispensing();
		});

		expect(sendDispenseCommand).toHaveBeenCalledWith(300);

		unmount();
	});

	it("startDispensing memanggil setKioskProgress", async () => {
		const { result, unmount } = renderHook(() => useMemberKiosk());

		await act(async () => {
			result.current.setSelectedVolume(300);
		});

		await act(async () => {
			await result.current.startDispensing();
		});

		expect(setKioskProgress).toHaveBeenCalledWith(
			expect.objectContaining({
				isDispensing: true,
				targetVolume: 300,
				filledVolume: 0,
				status: "filling",
			}),
		);

		unmount();
	});
});
