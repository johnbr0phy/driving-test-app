import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/frm-part-1/dashboard");
}
