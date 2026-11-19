import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cils-b2/dashboard");
}
