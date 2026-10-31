import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/k53-learners/dashboard");
}
