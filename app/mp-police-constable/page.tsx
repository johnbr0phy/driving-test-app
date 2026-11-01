import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/mp-police-constable/dashboard");
}
