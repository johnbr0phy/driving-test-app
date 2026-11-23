import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/master-electrician/dashboard");
}
