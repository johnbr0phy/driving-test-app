import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/canadian-firearms/dashboard");
}
