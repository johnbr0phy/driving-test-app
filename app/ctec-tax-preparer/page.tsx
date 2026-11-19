import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ctec-tax-preparer/dashboard");
}
