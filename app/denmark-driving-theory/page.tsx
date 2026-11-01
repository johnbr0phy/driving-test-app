import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/denmark-driving-theory/dashboard");
}
