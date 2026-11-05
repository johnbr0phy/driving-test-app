import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nz-heavy-vehicle-licence/dashboard");
}
