import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HistoryTable } from '../history-table';
import { subscribeDispenseHistory } from '@/features/transaction/infrastructure/transaction.firebase';

jest.mock('@/features/transaction/infrastructure/transaction.firebase');

describe('HistoryTable', () => {
  const mockTransactions = [
    {
      id: '1',
      timestamp: new Date('2023-10-10T10:00:00Z'),
      type: 'auto',
      actualVolume: 250,
      tds: 50,
      status: true,
    },
    {
      id: '2',
      timestamp: new Date('2023-10-10T11:00:00Z'),
      type: 'manual',
      actualVolume: 500,
      tds: 160,
      status: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders history records', () => {
    (subscribeDispenseHistory as jest.Mock).mockImplementation((callback) => {
      callback(mockTransactions);
      return jest.fn(); // unsubscribe function
    });

    render(<HistoryTable />);
    
    expect(screen.getByText('Riwayat Pengisian')).toBeInTheDocument();
    expect(screen.getByText('2 data ditemukan')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('filters records by search text', () => {
    (subscribeDispenseHistory as jest.Mock).mockImplementation((callback) => {
      callback(mockTransactions);
      return jest.fn();
    });

    render(<HistoryTable />);
    
    const searchInput = screen.getByPlaceholderText('Cari data...');
    
    act(() => {
      fireEvent.change(searchInput, { target: { value: '250' } });
    });
    
    expect(screen.getByText('1 data ditemukan')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.queryByText('500')).not.toBeInTheDocument();
  });

  it('sorts records by volume', () => {
    (subscribeDispenseHistory as jest.Mock).mockImplementation((callback) => {
      callback(mockTransactions);
      return jest.fn();
    });

    render(<HistoryTable />);
    
    const volumeHeader = screen.getByText('Volume');
    
    act(() => {
      fireEvent.click(volumeHeader);
    });
    
    expect(screen.getByText('2 data ditemukan')).toBeInTheDocument();
  });
});
