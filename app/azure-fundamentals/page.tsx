import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/azure-fundamentals/dashboard");
}
