import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/corrections-officer-exam/dashboard");
}
