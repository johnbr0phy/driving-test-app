import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/canada-drone-basic/dashboard");
}
