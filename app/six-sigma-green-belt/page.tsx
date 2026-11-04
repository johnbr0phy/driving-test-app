import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/six-sigma-green-belt/dashboard");
}
