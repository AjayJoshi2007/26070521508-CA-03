import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

// Mock the config module
jest.mock('@/lib/config', () => ({
  SOCIAL_LINKS: {
    twitter: 'https://twitter.com/solochief',
    linkedin: 'https://linkedin.com/company/solochief',
    instagram: 'https://instagram.com/solochief',
    youtube: 'https://youtube.com/@solochief',
  },
  NAVIGATION: {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  FOOTER_TEXT: {
    description: 'Test description',
    copyright: '© 2026 SoloChief. All rights reserved.',
  },
}));

// Mock SoloChiefLogo
jest.mock('@/components/SoloChiefLogo', () => ({
  SoloChiefLogo: () => <div data-testid="solo-chief-logo">Logo</div>,
}));

describe('Footer Component', () => {
  it('renders footer with site name', () => {
    render(<Footer />);
    expect(screen.getByText('SoloChief')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('renders footer text sections', () => {
    render(<Footer />);
    expect(screen.getByText(/Company/)).toBeInTheDocument();
    expect(screen.getByText(/Legal/)).toBeInTheDocument();
  });

  it('has correct copyright year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
