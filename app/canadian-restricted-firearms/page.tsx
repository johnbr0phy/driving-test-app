import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/canadian-restricted-firearms/dashboard");
}
