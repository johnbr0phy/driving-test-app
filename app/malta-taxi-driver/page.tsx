import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/malta-taxi-driver/dashboard");
}
