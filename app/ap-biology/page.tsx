import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ap-biology/dashboard");
}
