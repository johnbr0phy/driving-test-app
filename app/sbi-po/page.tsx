import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sbi-po/dashboard");
}
