import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nz-amateur-radio/dashboard");
}
