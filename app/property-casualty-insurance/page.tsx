import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/property-casualty-insurance/dashboard");
}
