import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ibps-rrb-clerk/dashboard");
}
