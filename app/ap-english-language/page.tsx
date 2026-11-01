import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ap-english-language/dashboard");
}
