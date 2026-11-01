import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/mht-cet/dashboard");
}
