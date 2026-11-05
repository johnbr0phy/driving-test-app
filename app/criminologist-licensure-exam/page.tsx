import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/criminologist-licensure-exam/dashboard");
}
