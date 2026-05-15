import { severe } from '@packages/logger';
import { sleep } from '@packages/utils/sleep';
import { useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactFailedData {
  currentAttempt: number;   // "Attempt 3 of 3"  → 3
  totalAttempts: number;    // "Attempt 3 of 3"  → 3
  currentArtistIndex: number; // "Trying Artist 3 of 3" → 3
  totalArtists: number;       // "Trying Artist 3 of 3" → 3
  statusMessage: string;    // "No artists available at the moment"
  errorBadgeText: string;   // "Connection failed"
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
// Replace with API response when backend is ready

const DUMMY_CONTACT_FAILED_DATA: ContactFailedData = {
  currentAttempt: 3,
  totalAttempts: 3,
  currentArtistIndex: 3,
  totalArtists: 3,
  statusMessage: 'No artists available at the moment',
  errorBadgeText: 'Connection failed',
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseContactFailedDataReturn {
  loadContactFailedData: () => Promise<void>;
  currentAttempt: number;
  totalAttempts: number;
  currentArtistIndex: number;
  totalArtists: number;
  statusMessage: string;
  errorBadgeText: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch ContactFailed page data.
 *
 * DATA FLOW (Backend as Single Source of Truth):
 * 1. Component mounts → loadContactFailedData() called once via useEffect
 * 2. No polling needed — this is a terminal failure state, data won't change
 *
 * When switching to real API:
 * - Uncomment the fetch call inside loadContactFailedData
 * - Remove dummy data simulation
 * - No other changes needed!
 */
export function useContactFailedData(): UseContactFailedDataReturn {
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorBadgeText, setErrorBadgeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API endpoint: GET /booking/contact-failed
  const loadContactFailedData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call:
      // const response = await fetch('/api/booking/contact-failed');
      // if (!response.ok) throw new Error('Failed to fetch');
      // const result: ContactFailedData = await response.json();

      // Simulate API call
      await sleep(1000);
      const result = DUMMY_CONTACT_FAILED_DATA;

      setCurrentAttempt(result.currentAttempt);
      setTotalAttempts(result.totalAttempts);
      setCurrentArtistIndex(result.currentArtistIndex);
      setTotalArtists(result.totalArtists);
      setStatusMessage(result.statusMessage);
      setErrorBadgeText(result.errorBadgeText);
    } catch (err) {
      severe('Failed to fetch contact failed data:', err);
      setError('Failed to load status. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loadContactFailedData,
    currentAttempt,
    totalAttempts,
    currentArtistIndex,
    totalArtists,
    statusMessage,
    errorBadgeText,
    isLoading,
    error,
  };
}
