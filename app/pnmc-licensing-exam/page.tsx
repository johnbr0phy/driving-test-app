import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pnmc-licensing-exam/dashboard");
}
