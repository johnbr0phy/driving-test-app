import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ascp-ht/dashboard");
}
