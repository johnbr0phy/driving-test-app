import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/fortinet-nse-1/dashboard");
}
