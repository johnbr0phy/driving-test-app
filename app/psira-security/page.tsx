import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/psira-security/dashboard");
}
