import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/denmark-motorcycle-theory/dashboard");
}
