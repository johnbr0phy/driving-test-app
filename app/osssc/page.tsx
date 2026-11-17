import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/osssc/dashboard");
}
