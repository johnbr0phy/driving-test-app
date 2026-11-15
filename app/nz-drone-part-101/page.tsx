import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nz-drone-part-101/dashboard");
}
