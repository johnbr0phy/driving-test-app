import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ham-radio-general/dashboard");
}
