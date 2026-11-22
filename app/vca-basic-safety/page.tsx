import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/vca-basic-safety/dashboard");
}
