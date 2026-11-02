// The sender's postal address, which US law (CAN-SPAM) requires in every
// marketing email. Set EMAIL_POSTAL_ADDRESS (a PO box or virtual mailbox is
// fine, e.g. "PO Box 123, San Diego, CA 92101, USA"); until it is set the
// footer names the sender only.
export function postalFooterLine(): string {
  const address = process.env.EMAIL_POSTAL_ADDRESS?.trim();
  const text = address ? `Tigertest, ${address}` : "Tigertest, run by John Brophy";
  return `<br><span style="color: #b3b3b3;">${text.replace(/[<>&]/g, "")}</span>`;
}
