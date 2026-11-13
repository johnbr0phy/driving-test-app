import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/map-growth/dashboard");
}
