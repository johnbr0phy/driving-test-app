import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/hunter-safety/dashboard");
}
