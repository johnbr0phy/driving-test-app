import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/trcn-pqe/dashboard");
}
