import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cobit-2019-foundation/dashboard");
}
