import { useEffect, useState } from 'react';

/**
 * Hook to ensure components only render after Zustand store hydration
 * This prevents hydration mismatches in Next.js SSR
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
