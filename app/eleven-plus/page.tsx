import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/eleven-plus/dashboard");
}
