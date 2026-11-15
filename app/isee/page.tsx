import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/isee/dashboard");
}
