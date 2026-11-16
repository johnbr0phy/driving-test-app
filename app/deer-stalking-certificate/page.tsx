import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/deer-stalking-certificate/dashboard");
}
