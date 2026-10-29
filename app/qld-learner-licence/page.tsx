import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/qld-learner-licence/dashboard");
}
