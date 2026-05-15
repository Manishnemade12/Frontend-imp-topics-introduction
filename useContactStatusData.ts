import { severe } from '@packages/logger';
import { sleep } from '@packages/utils/sleep';
import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactTimelineState = 'complete' | 'active' | 'pending';

export interface ContactTimelineStep {
  title: string;
  detail: string;
  state: ContactTimelineState;
}

export interface ContactStatusData {
  timeline: ContactTimelineStep[];
  artistImageSrc: string;
  userProfileImageSrc: string;
  currentArtistIndex: number; // 1-based  →  "Trying Artist 1 of 3"
  totalArtists: number;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
// Replace with API response when backend is ready

const DUMMY_TIMELINE: ContactTimelineStep[] = [
  {
    title: 'Contacting artist',
    detail: 'Artist reached successfully',
    state: 'complete',
  },
  {
    title: 'Artist notified',
    detail: 'Request delivered',
    state: 'complete',
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

const DUMMY_USER_PROFILE_IMAGE_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDZOKOEJcMCjjkJpDa4kswKvFZYbktUhzbSNKCjbfcxoEZtR3yL5IXWCiX47Ygmpu6y3Mlpjm-GggYBEIuKKZXJ1cAWy1Rh3MT7HP0YYuWpxsEsFy2BV363HxZryoi-OAkfSn6vyXPyykMwR68szll_oVasAC9ShLG3Le9QBhH2vItXp09dRJ2_n6m7fWvMED5Ng7E5l0S9u8gSjXprYPYhJdp2YFoI1ENcD5pyAcjKGU6sj8lA7SZReym94Mu07ZualJb3ztZfb_0';

// How often to poll the API for live status updates (ms)
// Artist changes every ~10 min, but steps can update sooner
const POLL_INTERVAL_MS = 10_000;

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseContactStatusDataReturn {
  loadContactStatus: () => Promise<void>;
  timeline: ContactTimelineStep[];
  artistImageSrc: string;
  userProfileImageSrc: string;
  currentArtistIndex: number;
  totalArtists: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and poll ContactStatus page data.
 *
 * DATA FLOW (Backend as Single Source of Truth):
 * 1. Component mounts → loadContactStatus() called once via useEffect
 * 2. Hook starts polling every POLL_INTERVAL_MS for live step + artist updates
 * 3. Each poll replaces all state with fresh API response
 * 4. Polling stops automatically on unmount (cleanup)
 *
 * When switching to real API:
 * - Uncomment the fetch call inside loadContactStatus
 * - Remove dummy data simulation
 * - Adjust POLL_INTERVAL_MS if needed
 * - For WebSocket/SSE: remove polling, connect stream in useEffect instead
 */
export function useContactStatusData(): UseContactStatusDataReturn {
  const [timeline, setTimeline] = useState<ContactTimelineStep[]>([]);
  const [artistImageSrc, setArtistImageSrc] = useState('');
  const [userProfileImageSrc, setUserProfileImageSrc] = useState('');
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track initial load separately so polling skips the loading spinner
  const hasLoadedOnce = useRef(false);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // API endpoint: GET /booking/contact-status
  const loadContactStatus = useCallback(async () => {
    if (!hasLoadedOnce.current) {
      setIsLoading(true);
    }
    setError(null);
    try {
      // Replace with actual API call:
      // const response = await fetch('/api/booking/contact-status');
      // if (!response.ok) throw new Error('Failed to fetch');
      // const result: ContactStatusData = await response.json();

      // Simulate API call
      await sleep(hasLoadedOnce.current ? 0 : 1000);
      const result: ContactStatusData = {
        timeline: DUMMY_TIMELINE,
        artistImageSrc: DUMMY_ARTIST_IMAGE_SRC,
        userProfileImageSrc: DUMMY_USER_PROFILE_IMAGE_SRC,
        currentArtistIndex: 1,
        totalArtists: 3,
      };

      setTimeline(result.timeline);
      setArtistImageSrc(result.artistImageSrc);
      setUserProfileImageSrc(result.userProfileImageSrc);
      setCurrentArtistIndex(result.currentArtistIndex);
      setTotalArtists(result.totalArtists);

      hasLoadedOnce.current = true;
    } catch (err) {
      severe('Failed to fetch contact status:', err);
      setError('Failed to load contact status. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start polling on mount, stop on unmount
  useEffect(() => {
    loadContactStatus();

    pollTimerRef.current = setInterval(() => {
      loadContactStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [loadContactStatus]);

  return {
    loadContactStatus,
    timeline,
    artistImageSrc,
    userProfileImageSrc,
    currentArtistIndex,
    totalArtists,
    isLoading,
    error,
  };
}
