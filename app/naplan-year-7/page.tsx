import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/naplan-year-7/dashboard");
}
