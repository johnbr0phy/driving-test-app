import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nsw-dkt/dashboard");
}
