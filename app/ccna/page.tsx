import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ccna/dashboard");
}
