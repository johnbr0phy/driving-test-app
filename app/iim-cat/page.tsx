import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/iim-cat/dashboard");
}
