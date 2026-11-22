import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/motor-theorie/dashboard");
}
