import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/oposiciones-policia-nacional/dashboard");
}
