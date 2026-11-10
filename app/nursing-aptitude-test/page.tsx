import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nursing-aptitude-test/dashboard");
}
