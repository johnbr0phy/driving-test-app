import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/llqp/dashboard");
}
