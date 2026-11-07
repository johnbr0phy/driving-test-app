import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/exame-cam/dashboard");
}
