import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/hungary-driving-theory/dashboard");
}
