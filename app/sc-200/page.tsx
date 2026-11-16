import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sc-200/dashboard");
}
