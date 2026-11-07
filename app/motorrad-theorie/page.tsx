import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/motorrad-theorie/dashboard");
}
