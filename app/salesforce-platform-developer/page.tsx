import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/salesforce-platform-developer/dashboard");
}
