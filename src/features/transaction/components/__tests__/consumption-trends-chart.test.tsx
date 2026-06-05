import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConsumptionTrend } from '../consumption-trends-chart';

// Mock the TrendChart component
jest.mock('@/components/charts/trend-chart', () => ({
  TrendChart: ({ data }: { data: any[] }) => (
    <div data-testid="trend-chart">
      Trend Chart Data Points: {data.length}
    </div>
  ),
}));

describe('ConsumptionTrend', () => {
  it('renders correctly with given data', () => {
    const mockData = [
      { day: 'Mon', liters: 10 },
      { day: 'Tue', liters: 15 },
    ];

    render(<ConsumptionTrend data={mockData} />);
    
    expect(screen.getByTestId('trend-chart')).toBeInTheDocument();
    expect(screen.getByText('Trend Chart Data Points: 2')).toBeInTheDocument();
  });
});
