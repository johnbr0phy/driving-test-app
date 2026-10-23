"use client";

import { useSyncExternalStore } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProgressSyncConflicts, getServerProgressSyncConflicts, subscribeProgressSyncConflicts } from '@/lib/mcpProgressGuard';

const labels = { catalog: 'training progress', v2: 'exam practice', quiz: 'quiz practice' };

/** One persistent notice for all account progress stores. Never auto-reload unsynced work. */
export function ProgressSyncConflictNotice() {
  const { user } = useAuth();
  const conflicts = useSyncExternalStore(subscribeProgressSyncConflicts, getProgressSyncConflicts, getServerProgressSyncConflicts);
  const own = conflicts.filter((item) => item.uid === user?.uid);
  if (!own.length) return null;

  return (
    <div role="alert" className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-xl border border-amber-400 bg-amber-50 p-4 text-amber-950 shadow-lg">
      <p className="font-bold">Progress changed in another session</p>
      <p className="mt-1 text-sm">Cloud saving is paused for {own.map((item) => labels[item.scope]).join(', ')} so newer progress is not overwritten.</p>
      <p className="mt-2 text-sm">Your work is still stored in this browser. Reloading may replace unsynced answers. Keep a note of anything you want to repeat, then reload to use the latest account progress. If you were resetting or deleting progress, repeat that action after reloading.</p>
      <button type="button" onClick={() => window.location.reload()} className="mt-3 rounded-md bg-amber-950 px-4 py-2 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-950">Reload saved progress</button>
    </div>
  );
}
