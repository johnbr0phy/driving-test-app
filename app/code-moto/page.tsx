import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/code-moto/dashboard");
}
