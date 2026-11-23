import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/uk-drone-flyer-id/dashboard");
}
