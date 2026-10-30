import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/rsa/dashboard");
}
