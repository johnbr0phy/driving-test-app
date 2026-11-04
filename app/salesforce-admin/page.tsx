import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/salesforce-admin/dashboard");
}
