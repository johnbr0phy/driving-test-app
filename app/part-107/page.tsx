import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/part-107/dashboard");
}
