import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/epa609/dashboard");
}
