import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nmc-cbt/dashboard");
}
