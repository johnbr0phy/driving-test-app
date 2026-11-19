import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/istqb-ctfl/dashboard");
}
