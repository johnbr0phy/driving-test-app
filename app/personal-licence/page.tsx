import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/personal-licence/dashboard");
}
