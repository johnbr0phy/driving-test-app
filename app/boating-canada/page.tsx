import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/boating-canada/dashboard");
}
