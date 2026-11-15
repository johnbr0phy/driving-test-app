import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/tabe/dashboard");
}
