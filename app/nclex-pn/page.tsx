import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nclex-pn/dashboard");
}
