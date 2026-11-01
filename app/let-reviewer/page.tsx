import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/let-reviewer/dashboard");
}
