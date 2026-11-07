import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/fsma-examen-verzekeringen/dashboard");
}
