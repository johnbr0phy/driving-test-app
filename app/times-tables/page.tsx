import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/times-tables/dashboard");
}
