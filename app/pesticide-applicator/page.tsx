import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pesticide-applicator/dashboard");
}
