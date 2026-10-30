import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/uk-motorcycle-theory/dashboard");
}
