import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cissp/dashboard");
}
