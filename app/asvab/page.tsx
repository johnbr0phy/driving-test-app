import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/asvab/dashboard");
}
