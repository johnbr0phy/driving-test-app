'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

export function AccountLoadRetry({ uid }: { uid: string }) {
  const [retrying, setRetrying] = useState(false);
  return <div className="p-6 text-center" role="status">
    <p>We could not load your account. Your destination has been kept.</p>
    <button className="mt-3 underline" disabled={retrying} onClick={async () => {
      setRetrying(true);
      try { await useStore.getState().loadUserData(uid); } finally { setRetrying(false); }
    }}>{retrying ? 'Loading…' : 'Try again'}</button>
  </div>;
}
