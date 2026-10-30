import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nova-scotia-learners/dashboard");
}
