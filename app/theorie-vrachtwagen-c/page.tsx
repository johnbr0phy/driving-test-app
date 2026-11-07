import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/theorie-vrachtwagen-c/dashboard");
}
