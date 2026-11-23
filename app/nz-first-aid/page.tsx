import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nz-first-aid/dashboard");
}
