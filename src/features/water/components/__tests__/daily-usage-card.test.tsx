import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailyUsageCard from '../daily-usage-card';

describe('DailyUsageCard', () => {
  it('renders daily usage and total dispenses correctly', () => {
    render(<DailyUsageCard dailyUsage={2.4567} totalDispenses={5} />);
    
    // Checks if the usage is rounded to 3 decimal places
    expect(screen.getByText('2.457')).toBeInTheDocument();
    expect(screen.getByText('5 kali pemakaian hari ini')).toBeInTheDocument();
  });

  it('renders zero usage correctly', () => {
    render(<DailyUsageCard dailyUsage={0} totalDispenses={0} />);
    
    expect(screen.getByText('0.000')).toBeInTheDocument();
    expect(screen.getByText('0 kali pemakaian hari ini')).toBeInTheDocument();
  });
});
