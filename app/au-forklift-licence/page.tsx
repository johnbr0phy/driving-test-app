import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/au-forklift-licence/dashboard");
}
