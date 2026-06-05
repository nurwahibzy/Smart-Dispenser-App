import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ValveControl from '../valve-control-card';
import { useMemberKiosk } from '@/features/member/hooks/useMemberKiosk';
import { useDeviceData } from '@/lib/hooks/useDeviceData';

jest.mock('@/features/member/hooks/useMemberKiosk');
jest.mock('@/lib/hooks/useDeviceData');

describe('ValveControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders closed state by default', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({ isDispensing: false });
    (useDeviceData as jest.Mock).mockReturnValue({ data: { status: { valveOpen: false } } });

    render(<ValveControl />);
    
    expect(screen.getByText('TERTUTUP')).toBeInTheDocument();
    expect(screen.getByText('TUTUP')).toBeInTheDocument();
    expect(screen.getByText('Katup dalam keadaan tertutup')).toBeInTheDocument();
    expect(screen.getByText('Siaga')).toBeInTheDocument();
  });

  it('renders open state when valve is open from device data', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({ isDispensing: false });
    (useDeviceData as jest.Mock).mockReturnValue({ data: { status: { valveOpen: true } } });

    render(<ValveControl />);
    
    expect(screen.getByText('TERBUKA')).toBeInTheDocument();
    expect(screen.getByText('BUKA')).toBeInTheDocument();
    expect(screen.getByText('Aliran air aktif')).toBeInTheDocument();
    expect(screen.getByText('Mengalir')).toBeInTheDocument();
  });

  it('renders dispensing state when isDispensing is true', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({ isDispensing: true });
    (useDeviceData as jest.Mock).mockReturnValue({ data: { status: { valveOpen: false } } });

    render(<ValveControl />);
    
    expect(screen.getByText('TERBUKA')).toBeInTheDocument();
    expect(screen.getByText('BUKA')).toBeInTheDocument();
    expect(screen.getByText('Proses pengisian sedang berlangsung...')).toBeInTheDocument();
    expect(screen.getByText('Mengalir')).toBeInTheDocument();
  });
});
