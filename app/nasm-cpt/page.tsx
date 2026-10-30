import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nasm-cpt/dashboard");
}
