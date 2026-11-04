import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/florida-adjuster/dashboard");
}
