import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/praxis-elementary/dashboard");
}
