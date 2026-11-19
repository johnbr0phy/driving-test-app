// Set by components/GuestPurchaseReturn.tsx just before it signs a guest
// buyer in to the account their checkout made. That account holds nothing
// but Premium, so AuthContext moves the guest's progress onto it rather than
// asking which copy to keep (the Premium flag would otherwise count as
// existing progress and show the conflict dialog).
let pending = false;

export function markGuestPurchaseSignIn(): void {
  pending = true;
}

/** True once, for the sign-in that follows markGuestPurchaseSignIn(). */
export function takeGuestPurchaseSignIn(): boolean {
  const was = pending;
  pending = false;
  return was;
}
