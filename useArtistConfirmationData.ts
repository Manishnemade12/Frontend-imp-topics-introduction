import { severe } from '@packages/logger';
import { sleep } from '@packages/utils/sleep';
import { useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingFact {
  label: string;
  value: string;
  icon: string;
}

export interface ArtistConfirmationData {
  artistName: string;
  artistRole: string;         // e.g. "Senior Esthetician • 4.9 ★"
  artistImageSrc: string;
  serviceName: string;        // e.g. "Signature Facial"
  bookingFacts: BookingFact[];
  nextSteps: string[];
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
// Replace with API response when backend is ready

const DUMMY_ARTIST_CONFIRMATION_DATA: ArtistConfirmationData = {
  artistName: 'Elena R.',
  artistRole: 'Senior Esthetician • 4.9 ★',
  artistImageSrc:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCwQHEJZWiAp56dbv0AHb4fUOx2Wh5BtsQDZ2vAfeYvH6jFGqOd9g9uHoJQA6ew8pKSopZ2NH1jiAr3S899RPKnSlHS7fmIA5eWe_MPGphrZ1PmNBr_1LUSY9asKdQBskIy43NbyT1u9GTIEWJWA1PA4NRV1P9jhEAeDO2a-Bpwe52bC9B9UbqkNGsCT0wJun3UApeRbuz_aC6qAMb9s8UVqbU_Yz0ul8hIym3mDnu7XJETLcKtGm8DLF8CtzT82NtYJYBZFRXQ4',
  serviceName: 'Signature Facial',
  bookingFacts: [
    {
      label: 'Date & Time',
      value: 'Oct 24 • 2:30 PM',
      icon: 'calendar_today',
    },
    {
      label: 'Total Price',
      value: '$145.00',
      icon: 'payments',
    },
    {
      label: 'Location',
      value: '123 Serenity Way, 4B',
      icon: 'location_on',
    },
  ],
  nextSteps: [
    'A consultation call will be scheduled with the artist.',
    'Artist arrives with all professional equipment at the scheduled time.',
    "You'll receive a reminder notification 30 minutes before arrival.",
    "Track your artist's status and updates in the app dashboard.",
  ],
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseArtistConfirmationDataReturn {
  loadArtistConfirmationData: () => Promise<void>;
  artistName: string;
  artistRole: string;
  artistImageSrc: string;
  serviceName: string;
  bookingFacts: BookingFact[];
  nextSteps: string[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch ArtistConfirmation page data.
 *
 * DATA FLOW (Backend as Single Source of Truth):
 * 1. Component mounts → loadArtistConfirmationData() called once via useEffect
 * 2. No polling needed — terminal success state, data won't change
 *
 * When switching to real API:
 * - Uncomment the fetch call inside loadArtistConfirmationData
 * - Remove dummy data simulation
 * - No other changes needed!
 */
export function useArtistConfirmationData(): UseArtistConfirmationDataReturn {
  const [artistName, setArtistName] = useState('');
  const [artistRole, setArtistRole] = useState('');
  const [artistImageSrc, setArtistImageSrc] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [bookingFacts, setBookingFacts] = useState<BookingFact[]>([]);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API endpoint: GET /booking/confirmation
  const loadArtistConfirmationData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call:
      // const response = await fetch('/api/booking/confirmation');
      // if (!response.ok) throw new Error('Failed to fetch');
      // const result: ArtistConfirmationData = await response.json();

      // Simulate API call
      await sleep(1000);
      const result = DUMMY_ARTIST_CONFIRMATION_DATA;

      setArtistName(result.artistName);
      setArtistRole(result.artistRole);
      setArtistImageSrc(result.artistImageSrc);
      setServiceName(result.serviceName);
      setBookingFacts(result.bookingFacts);
      setNextSteps(result.nextSteps);
    } catch (err) {
      severe('Failed to fetch artist confirmation data:', err);
      setError('Failed to load booking confirmation. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loadArtistConfirmationData,
    artistName,
    artistRole,
    artistImageSrc,
    serviceName,
    bookingFacts,
    nextSteps,
    isLoading,
    error,
  };
}
