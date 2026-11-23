import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cism/dashboard");
}
