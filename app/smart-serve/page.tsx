import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/smart-serve/dashboard");
}
