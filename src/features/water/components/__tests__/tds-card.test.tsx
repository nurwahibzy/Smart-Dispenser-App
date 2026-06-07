import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TdsCard from '../tds-card';

describe('TdsCard', () => {
  it('renders correctly with good TDS quality (tds < 100)', () => {
    render(<TdsCard tds={50} />);
    
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Kualitas air: Baik')).toBeInTheDocument();
  });

  it('renders correctly with adequate TDS quality (100 <= tds < 300)', () => {
    render(<TdsCard tds={200} />);
    
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('Kualitas air: Cukup')).toBeInTheDocument();
  });

  it('renders correctly with less than good TDS quality (300 <= tds < 600)', () => {
    render(<TdsCard tds={450} />);
    
    expect(screen.getByText('450')).toBeInTheDocument();
    expect(screen.getByText('Kualitas air: Kurang Baik')).toBeInTheDocument();
  });

  it('renders correctly with bad TDS quality (tds >= 600)', () => {
    render(<TdsCard tds={800} />);
    
    expect(screen.getByText('800')).toBeInTheDocument();
    expect(screen.getByText('Kualitas air: Buruk')).toBeInTheDocument();
  });

  it('rounds decimal TDS values to the nearest integer', () => {
    render(<TdsCard tds={123.4} />);
    expect(screen.getByText('123')).toBeInTheDocument();

    render(<TdsCard tds={123.6} />);
    expect(screen.getByText('124')).toBeInTheDocument();
  });
});
