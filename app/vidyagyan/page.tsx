import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/vidyagyan/dashboard");
}
