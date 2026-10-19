import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/osha-10/dashboard");
}
