import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nz-day-skipper/dashboard");
}
