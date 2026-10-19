import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/epa-608/dashboard");
}
