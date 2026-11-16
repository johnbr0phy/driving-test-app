import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/bc-core-hunter-exam/dashboard");
}
