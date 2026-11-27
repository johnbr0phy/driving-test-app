import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/faa-mechanic-airframe/dashboard");
}
