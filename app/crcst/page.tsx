import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/crcst/dashboard");
}
