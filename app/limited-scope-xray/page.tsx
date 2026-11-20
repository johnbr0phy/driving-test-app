import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/limited-scope-xray/dashboard");
}
