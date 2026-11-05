import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nurse-licensure-exam/dashboard");
}
