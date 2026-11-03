import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/npte-pta/dashboard");
}
