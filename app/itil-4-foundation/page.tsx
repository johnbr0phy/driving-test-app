import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/itil-4-foundation/dashboard");
}
