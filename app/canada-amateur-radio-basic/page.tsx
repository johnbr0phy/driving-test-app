import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/canada-amateur-radio-basic/dashboard");
}
