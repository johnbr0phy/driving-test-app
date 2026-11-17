import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ontario-air-brake/dashboard");
}
