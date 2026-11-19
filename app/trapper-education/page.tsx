import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/trapper-education/dashboard");
}
