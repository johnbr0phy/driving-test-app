import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ssc-mts/dashboard");
}
