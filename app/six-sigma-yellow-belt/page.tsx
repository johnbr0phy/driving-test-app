import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/six-sigma-yellow-belt/dashboard");
}
