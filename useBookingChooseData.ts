import { severe } from '@packages/logger';
import { sleep } from '@packages/utils/sleep';
import { useCallback, useState } from 'react';

// Dummy Data - Replace with API response when backend is ready

const DUMMY_FASTEST_AVATARS: string[] = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_59kMYTiOIS6qKJNbti7Tq6SzWiLZdxtHpOaHZCPPZkT95yvs73PPfdSHTer5rb7jfd0h8EdUzoeQ5eaalFFtZZpdcNkrtQKT-b8LYZmFL7RIRh9t3KRY2NSmMws5oHqlp3U6JXpo3ldw2Uk8-xpdy16VMzmSvUgaOgobpU3K-agZk8iqzWG8b89emylzQcni4yYfbUaGaYck08W68bAx626qB8jsOCrHZq0dvLShnp-q7Lay1LYFnRoM2oTD1Gy5bPke5yFXK0s',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWruhyTIwjr-L4dPXLcsJrpWfoiL1Hxh7S2pG42KTc7-6LtUz7bdeXDH8NhvsouJy7OnrEcCWV4BT2Z9ipxfZIRPU4TQlf4H-qmw2StlpsRI25QSNOB9GgBZvbukKy91-7vMmC4jUhbc7xzkv6Mu2JdcYuYnoJDI8mJyovKvGIgogl2aXKcE7MAzksCxiqYFsNRrI2TdXQ-5WfF8CUGvATbL3OWl6TKdSDYDhpO_ceVw_CieiUn86483q0bTLf2PcokdXaYn5GRnE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKC0YZfQkRtdwTXY5Rli6mcO3QQ_uC1pbB5qAnKApv1ZpVF3vbqxUn5PZ22LCeWO0uCFk0fgsgyVLVBF0q5uw7aXWKzLM-nr7r4fIrH2V-OnKMI-UCX3cgVsssu7WkaEf2osKH26JLnsSNDjCLWfcAeJ_ucsuudriU6I43K09nkrYSDve9jejkgpMWi42hSUowRvg7Y14zDvuQTEa0dSDX9AJhlR7A2zMTnYnmaTjnTCjb3_kmOPhkA3kVDN4BQZjZ4ri_Rc98Xvw',
];

const DUMMY_FASTEST_STATUSES: string[] = ['Contacting', 'Waiting', 'Confirming'];

export interface BookingChooseData {
  avatars: string[];
  statuses: string[];
}

interface UseBookingChooseDataReturn {
  loadBookingChooseData: () => Promise<void>;
  avatars: string[];
  statuses: string[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch BookingChoose page data — fastest search avatars and status labels.
 *
 * DATA FLOW (Backend as Single Source of Truth):
 * 1. Hook initializes with empty state
 * 2. Parent page calls loadBookingChooseData() in useEffect
 * 3. Fetches data from backend and updates state
 * 4. Data is passed down as props to the BookingChoose presentational component
 *
 * When switching to real API:
 * - Uncomment API fetch calls inside loadBookingChooseData
 * - Remove dummy data simulation
 * - No other changes needed!
 */
export function useBookingChooseData(): UseBookingChooseDataReturn {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API endpoint: GET /booking/choose-data
  const loadBookingChooseData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call:
      // const response = await fetch('/api/booking/choose-data');
      // if (!response.ok) throw new Error('Failed to fetch');
      // const result: BookingChooseData = await response.json();

      // Simulate API call
      await sleep(1000);
      const result: BookingChooseData = {
        avatars: DUMMY_FASTEST_AVATARS,
        statuses: DUMMY_FASTEST_STATUSES,
      };

      setAvatars(result.avatars);
      setStatuses(result.statuses);
    } catch (err) {
      severe('Failed to fetch booking choose data:', err);
      setError('Failed to load booking data. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loadBookingChooseData,
    avatars,
    statuses,
    isLoading,
    error,
  };
}
