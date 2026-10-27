import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CookieConsent } from '@/components/CookieConsent';

// Mock Firebase functions
jest.mock('@/lib/firestore', () => ({
  saveCookiePreferences: jest.fn().mockResolvedValue('test-doc-id'),
  getCookiePreferences: jest.fn().mockResolvedValue(null),
}));

// Mock Firebase auth
jest.mock('@/lib/firebase', () => ({
  auth: {
    currentUser: null,
  },
}));

// Mock uuid
jest.mock('uuid', () => ({
  v4: () => 'test-uuid-1234-5678-90ab-cdef',
}));

describe('CookieConsent Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should show cookie consent when no preference is saved', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });
  });

  it('should not show cookie consent when preference already saved', async () => {
    // Simulate saved preference
    localStorage.setItem(
      '__cookie_consent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      })
    );

    const { container } = render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Cookie Preferences/)).not.toBeInTheDocument();
    });
  });

  it('should have all consent checkboxes', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Necessary/)).toBeInTheDocument();
      expect(screen.getByText(/Analytics/)).toBeInTheDocument();
      expect(screen.getByText(/Marketing/)).toBeInTheDocument();
    });
  });

  it('should disable necessary checkbox', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      const necessaryCheckbox = screen.getAllByRole('checkbox')[0];
      expect(necessaryCheckbox).toBeDisabled();
    });
  });

  it('should have action buttons', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reject Non-Essential/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Preferences/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Accept All/ })).toBeInTheDocument();
    });
  });

  it('should save preferences when clicking "Accept All"', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const acceptButton = screen.getByRole('button', { name: /Accept All/ });
    fireEvent.click(acceptButton);

    await waitFor(() => {
      const saved = localStorage.getItem('__cookie_consent');
      expect(saved).toBeTruthy();
      const preferences = JSON.parse(saved!);
      expect(preferences.analytics).toBe(true);
      expect(preferences.marketing).toBe(true);
    });
  });

  it('should save preferences when clicking "Reject Non-Essential"', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const rejectButton = screen.getByRole('button', { name: /Reject Non-Essential/ });
    fireEvent.click(rejectButton);

    await waitFor(() => {
      const saved = localStorage.getItem('__cookie_consent');
      expect(saved).toBeTruthy();
      const preferences = JSON.parse(saved!);
      expect(preferences.analytics).toBe(false);
      expect(preferences.marketing).toBe(false);
      expect(preferences.necessary).toBe(true);
    });
  });

  it('should hide banner after user makes choice', async () => {
    const { rerender } = render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const acceptButton = screen.getByRole('button', { name: /Accept All/ });
    fireEvent.click(acceptButton);

    // Re-render to check if banner is hidden
    await waitFor(() => {
      rerender(<CookieConsent />);
      expect(screen.queryByText(/Cookie Preferences/)).not.toBeInTheDocument();
    });
  });

  it('should have privacy policy link', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      const privacyLink = screen.getByRole('link', { name: /privacy policy/ });
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });
  });

  it('should call Firebase saveCookiePreferences on save', async () => {
    const { saveCookiePreferences } = require('@/lib/firestore');
    
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: /Save Preferences/ });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveCookiePreferences).toHaveBeenCalled();
    });
  });

  it('should generate and store anonymous ID', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      const anonymousId = localStorage.getItem('__anonymous_id');
      expect(anonymousId).toBeTruthy();
      expect(anonymousId).toContain('uuid');
    });
  });

  it('should toggle analytics preference', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    const analyticsCheckbox = checkboxes[1];

    // Initially checked
    expect(analyticsCheckbox).toBeChecked();

    // Click to uncheck
    fireEvent.click(analyticsCheckbox);

    await waitFor(() => {
      expect(analyticsCheckbox).not.toBeChecked();
    });
  });

  it('should toggle marketing preference', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Cookie Preferences/)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    const marketingCheckbox = checkboxes[2];

    // Initially checked
    expect(marketingCheckbox).toBeChecked();

    // Click to uncheck
    fireEvent.click(marketingCheckbox);

    await waitFor(() => {
      expect(marketingCheckbox).not.toBeChecked();
    });
  });
});
