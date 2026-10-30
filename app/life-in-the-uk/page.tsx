import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/life-in-the-uk/dashboard");
}
