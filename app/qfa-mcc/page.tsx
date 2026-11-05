import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/qfa-mcc/dashboard");
}
