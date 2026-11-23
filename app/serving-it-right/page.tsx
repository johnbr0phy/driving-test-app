import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/serving-it-right/dashboard");
}
