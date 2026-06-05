import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VolumeControl from '../volume-control-card';
import { useMemberKiosk } from '@/features/member/hooks/useMemberKiosk';

jest.mock('@/features/member/hooks/useMemberKiosk');

describe('VolumeControl', () => {
  const mockSetSelectedVolume = jest.fn();
  const mockStartDispensing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in initial state', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({
      volumeOptions: [100, 250, 500, 1000],
      selectedVolume: null,
      setSelectedVolume: mockSetSelectedVolume,
      startDispensing: mockStartDispensing,
      isDispensing: false,
      progressPercent: 0,
    });

    render(<VolumeControl />);
    
    expect(screen.getByText('Pilih jumlah volume air')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
    
    // Check if volume options are rendered
    expect(screen.getByText('100ml')).toBeInTheDocument();
    expect(screen.getByText('250ml')).toBeInTheDocument();
    expect(screen.getByText('500ml')).toBeInTheDocument();
    expect(screen.getByText('1000ml')).toBeInTheDocument();

    // Check if start button is disabled
    const startButton = screen.getByRole('button', { name: /Mulai/i });
    expect(startButton).toBeDisabled();
  });

  it('allows selecting a volume and enables start button', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({
      volumeOptions: [100, 250],
      selectedVolume: 250,
      setSelectedVolume: mockSetSelectedVolume,
      startDispensing: mockStartDispensing,
      isDispensing: false,
      progressPercent: 0,
    });

    render(<VolumeControl />);
    
    expect(screen.getByText('250')).toBeInTheDocument();
    
    const startButton = screen.getByRole('button', { name: /Mulai/i });
    expect(startButton).not.toBeDisabled();
    
    fireEvent.click(startButton);
    expect(mockStartDispensing).toHaveBeenCalled();
  });

  it('calls setSelectedVolume when a volume preset is clicked', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({
      volumeOptions: [100, 250],
      selectedVolume: null,
      setSelectedVolume: mockSetSelectedVolume,
      startDispensing: mockStartDispensing,
      isDispensing: false,
      progressPercent: 0,
    });

    render(<VolumeControl />);
    
    const volumeButton = screen.getByText('100ml');
    fireEvent.click(volumeButton);
    expect(mockSetSelectedVolume).toHaveBeenCalledWith(100);
  });

  it('renders correctly in dispensing state', () => {
    (useMemberKiosk as jest.Mock).mockReturnValue({
      volumeOptions: [100, 250],
      selectedVolume: 250,
      setSelectedVolume: mockSetSelectedVolume,
      startDispensing: mockStartDispensing,
      isDispensing: true,
      progressPercent: 45,
    });

    render(<VolumeControl />);
    
    expect(screen.getByText('Pengisian sedang berlangsung...')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    
    // Buttons should be disabled
    const startButton = screen.getByRole('button', { name: /Mulai/i });
    expect(startButton).toBeDisabled();
    
    const volumeButton = screen.getByText('100ml');
    expect(volumeButton).toBeDisabled();
  });
});
