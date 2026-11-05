import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/singapore-res/dashboard");
}
