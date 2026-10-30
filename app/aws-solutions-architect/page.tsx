import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aws-solutions-architect/dashboard");
}
