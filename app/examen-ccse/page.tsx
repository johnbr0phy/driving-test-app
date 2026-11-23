import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/examen-ccse/dashboard");
}
