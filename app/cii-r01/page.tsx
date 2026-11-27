import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cii-r01/dashboard");
}
