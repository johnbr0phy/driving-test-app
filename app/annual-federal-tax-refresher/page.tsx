import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/annual-federal-tax-refresher/dashboard");
}
