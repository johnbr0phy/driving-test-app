import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cma-aama/dashboard");
}
