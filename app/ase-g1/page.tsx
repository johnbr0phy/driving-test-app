import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ase-g1/dashboard");
}
