import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wa-learners/dashboard");
}
