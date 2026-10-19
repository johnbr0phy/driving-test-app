import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/food-handler/dashboard");
}
