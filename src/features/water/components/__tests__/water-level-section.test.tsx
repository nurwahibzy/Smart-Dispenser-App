import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WaterLevelSection from '../water-level-section';
import { useWaterData } from '@/lib/hooks/useWaterData';

// Mock the hook and the child component
jest.mock('@/lib/hooks/useWaterData');
jest.mock('../water-gauge', () => ({
  WaterGauge: ({ level, liters, capacity }: { level: number, liters: number, capacity: number }) => (
    <div data-testid="water-gauge">
      Level: {level}, Liters: {liters}, Capacity: {capacity}
    </div>
  ),
}));
jest.mock('@/lib/utils/water', () => ({
  calculateWaterLiters: jest.fn((level, capacity) => level * capacity / 100),
}));

describe('WaterLevelSection', () => {
  it('renders loading state when loading is true', () => {
    (useWaterData as jest.Mock).mockReturnValue({
      waterLevel: 0,
      loading: true,
    });

    render(<WaterLevelSection />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders WaterGauge when data is loaded', () => {
    (useWaterData as jest.Mock).mockReturnValue({
      waterLevel: 50,
      loading: false,
    });

    render(<WaterLevelSection />);
    expect(screen.getByTestId('water-gauge')).toBeInTheDocument();
    expect(screen.getByText('Level: 50, Liters: 10, Capacity: 20')).toBeInTheDocument();
  });
});
