import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '../page';
import { useDeviceData } from '@/lib/hooks/useDeviceData';
import { useTransactionData } from '@/lib/hooks/useTransactionData';
import { calculateDailyUsage } from '@/lib/utils/transaction';

jest.mock('@/lib/hooks/useDeviceData');
jest.mock('@/lib/hooks/useTransactionData');
jest.mock('@/lib/utils/transaction');

jest.mock('@/features/water/components/water-level-section', () => {
    return function MockWaterLevelSection() {
        return <div data-testid="water-level-section">WaterLevelSection</div>;
    };
});
jest.mock('@/features/water/components/tds-card', () => {
    return function MockTdsCard() {
        return <div data-testid="tds-card">TdsCard</div>;
    };
});
jest.mock('@/features/water/components/daily-usage-card', () => {
    return function MockDailyUsageCard() {
        return <div data-testid="daily-usage-card">DailyUsageCard</div>;
    };
});
jest.mock('@/features/water/components/valve-control-card', () => {
    return function MockValveControl() {
        return <div data-testid="valve-control-card">ValveControl</div>;
    };
});
jest.mock('@/features/water/components/volume-control-card', () => {
    return function MockVolumeControl() {
        return <div data-testid="volume-control-card">VolumeControl</div>;
    };
});
jest.mock('@/features/transaction/components/consumption-trends-chart', () => ({
    ConsumptionTrend: function MockConsumptionTrend() {
        return <div data-testid="consumption-trend">ConsumptionTrend</div>;
    },
}));
jest.mock('@/features/transaction/components/history-table', () => ({
    HistoryTable: function MockHistoryTable() {
        return <div data-testid="history-table">HistoryTable</div>;
    },
}));

describe('DashboardPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state when device or transaction data is loading', () => {
        (useDeviceData as jest.Mock).mockReturnValue({ data: null, loading: true });
        (useTransactionData as jest.Mock).mockReturnValue({ data: null, loading: false });

        render(<DashboardPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders dashboard features correctly after loading', async () => {
        (useDeviceData as jest.Mock).mockReturnValue({
            data: { sensors: { tds: 120 } },
            loading: false,
        });
        (useTransactionData as jest.Mock).mockReturnValue({
            data: [],
            loading: false,
        });
        (calculateDailyUsage as jest.Mock).mockReturnValue({
            dailyUsage: 5,
            totalDispenses: 10,
        });

        render(<DashboardPage />);

        expect(screen.getByTestId('water-level-section')).toBeInTheDocument();
        expect(screen.getByTestId('tds-card')).toBeInTheDocument();
        expect(screen.getByTestId('valve-control-card')).toBeInTheDocument();
        expect(screen.getByTestId('daily-usage-card')).toBeInTheDocument();
        expect(screen.getByTestId('volume-control-card')).toBeInTheDocument();
        expect(screen.getByTestId('history-table')).toBeInTheDocument();

        // Chart has a setTimeout for rendering (showChart state)
        await waitFor(() => {
            expect(screen.getByTestId('consumption-trend')).toBeInTheDocument();
        });
    });
});
