import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cdl-school-bus-endorsement/dashboard");
}
