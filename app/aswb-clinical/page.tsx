import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aswb-clinical/dashboard");
}
