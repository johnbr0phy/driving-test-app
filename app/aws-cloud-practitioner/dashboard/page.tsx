import { permanentRedirect } from "next/navigation";

export default function OldDashboard() {
  permanentRedirect("/aws-cloud-practitioner");
}
