import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wft-basis/dashboard");
}
