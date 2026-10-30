import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/red-seal-automotive/dashboard");
}
