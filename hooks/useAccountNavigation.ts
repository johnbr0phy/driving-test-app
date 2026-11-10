import { useAuth } from '@/contexts/AuthContext';
import { useHydration } from '@/hooks/useHydration';
import { useStore } from '@/store/useStore';
import { accountNavigationState } from '@/lib/authDestination';

/** loadedUid is deliberately not persisted: a cached flag is not a cloud read. */
export function useAccountNavigation() {
  const { user, loading: authLoading } = useAuth();
  const hydrated = useHydration();
  const loadedUid = useStore(state => state.loadedUid);
  const firestoreLoaded = useStore(state => state.firestoreLoaded);
  return { user, ...accountNavigationState({ hydrated, authLoading, uid: user?.uid ?? null, loadedUid, firestoreLoaded }) };
}
