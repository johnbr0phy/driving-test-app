import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/psm-1/dashboard");
}
