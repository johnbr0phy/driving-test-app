import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ascp-mls/dashboard");
}
