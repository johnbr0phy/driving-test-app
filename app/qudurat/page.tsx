import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/qudurat/dashboard");
}
