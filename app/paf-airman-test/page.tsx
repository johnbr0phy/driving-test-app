import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/paf-airman-test/dashboard");
}
