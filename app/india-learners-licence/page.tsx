import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/india-learners-licence/dashboard");
}
