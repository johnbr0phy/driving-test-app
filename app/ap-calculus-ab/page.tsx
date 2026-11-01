import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ap-calculus-ab/dashboard");
}
