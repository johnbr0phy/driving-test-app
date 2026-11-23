import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/dental-infection-control/dashboard");
}
