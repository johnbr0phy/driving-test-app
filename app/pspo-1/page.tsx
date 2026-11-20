import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pspo-1/dashboard");
}
