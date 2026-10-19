import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/forklift/dashboard");
}
