import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sa-firearms-licence/dashboard");
}
