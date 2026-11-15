import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/adc/dashboard");
}
