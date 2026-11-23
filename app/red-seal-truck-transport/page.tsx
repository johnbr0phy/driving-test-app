import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/red-seal-truck-transport/dashboard");
}
