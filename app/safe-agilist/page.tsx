import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/safe-agilist/dashboard");
}
