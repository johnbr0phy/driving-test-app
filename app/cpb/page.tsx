import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cpb/dashboard");
}
