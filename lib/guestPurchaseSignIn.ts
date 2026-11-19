// Set by components/GuestPurchaseReturn.tsx just before it signs a guest
// buyer in to the account their checkout made. That account holds nothing
// but Premium, so AuthContext moves the guest's progress onto it without
// asking which copy to keep. Tied to the uid the server named, so a failed
// sign-in can never wave through a later sign-in to some other account.
let pendingUid: string | null = null;

export function markGuestPurchaseSignIn(uid: string): void {
  pendingUid = uid;
}

export function clearGuestPurchaseSignIn(): void {
  pendingUid = null;
}

/** True once, for the sign-in to the account markGuestPurchaseSignIn named. */
export function takeGuestPurchaseSignIn(uid: string): boolean {
  const match = pendingUid !== null && pendingUid === uid;
  pendingUid = null;
  return match;
}
