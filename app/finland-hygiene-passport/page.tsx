import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/finland-hygiene-passport/dashboard");
}
