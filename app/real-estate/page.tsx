import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/real-estate/dashboard");
}
