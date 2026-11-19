import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nail-technician/dashboard");
}
