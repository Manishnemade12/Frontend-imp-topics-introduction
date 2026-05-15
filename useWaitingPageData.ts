import { severe } from '@packages/logger';
import { sleep } from '@packages/utils/sleep';
import { useCallback, useState } from 'react';

// Dummy Data - Replace with API response when backend is ready

export type WaitingStepState = 'done' | 'active' | 'pending';

export interface WaitingStep {
  title: string;
  detail: string;
  state: WaitingStepState;
}

export interface WaitingPageData {
  steps: WaitingStep[];
  artistImageSrc: string;
}

const DUMMY_WAITING_STEPS: WaitingStep[] = [
  {
    title: 'Contacting artist',
    detail: 'Artist reached successfully',
    state: 'done',
  },
  {
    title: 'Artist notified',
    detail: 'Request delivered',
    state: 'done',
  },
  {
    title: 'Waiting for confirmation',
    detail: 'Awaiting artist response...',
    state: 'active',
  },
  {
    title: 'Booking finalized',
    detail: '',
    state: 'pending',
  },
];

const DUMMY_ARTIST_IMAGE_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1IDzcXchXmw3S8ZEx6lmkaCacFFSpQTqV3SCvMhtCKyM20H5GQo4Vl39J6szHBYIV-SIUZF-Bxm50WjBthfQ2h4hjum6ohL6dxX09Kx2IQIDhjgzEjl-jblxBeblJ4hInZorO7nvuP4O_hBN5NnTIwCErj6Mtqgy_rCP1Q91K1IMsgHT77Lo2QbMgSj9FOX0060zAblpHuRk18A-og1yA9LXbDnRxXdzuXETGi-BhM-3m7mbE6HbEA03uG1UcoatgVdOlkx7Xwpk';

interface UseWaitingPageDataReturn {
  loadWaitingPageData: () => Promise<void>;
  steps: WaitingStep[];
  artistImageSrc: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch WaitingPage data — booking progress steps and artist image.
 *
 * DATA FLOW (Backend as Single Source of Truth):
 * 1. Hook initializes with empty state
 * 2. Component calls loadWaitingPageData() in useEffect
 * 3. Fetches data from backend and updates state
 *
 * When switching to real API:
 * - Uncomment the API fetch call inside loadWaitingPageData
 * - Remove dummy data simulation
 * - No other changes needed!
 */
export function useWaitingPageData(): UseWaitingPageDataReturn {
  const [steps, setSteps] = useState<WaitingStep[]>([]);
  const [artistImageSrc, setArtistImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API endpoint: GET /booking/waiting-status
  const loadWaitingPageData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call:
      // const response = await fetch('/api/booking/waiting-status');
      // if (!response.ok) throw new Error('Failed to fetch');
      // const result: WaitingPageData = await response.json();

      // Simulate API call
      await sleep(1000);
      const result: WaitingPageData = {
        steps: DUMMY_WAITING_STEPS,
        artistImageSrc: DUMMY_ARTIST_IMAGE_SRC,
      };

      setSteps(result.steps);
      setArtistImageSrc(result.artistImageSrc);
    } catch (err) {
      severe('Failed to fetch waiting page data:', err);
      setError('Failed to load booking status. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loadWaitingPageData,
    steps,
    artistImageSrc,
    isLoading,
    error,
  };
}
