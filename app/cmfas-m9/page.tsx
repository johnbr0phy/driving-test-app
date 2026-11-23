import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cmfas-m9/dashboard");
}
