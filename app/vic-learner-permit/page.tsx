import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/vic-learner-permit/dashboard");
}
