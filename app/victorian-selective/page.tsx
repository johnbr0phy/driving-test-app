import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/victorian-selective/dashboard");
}
