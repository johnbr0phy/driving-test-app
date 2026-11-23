import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/au-amateur-radio/dashboard");
}
