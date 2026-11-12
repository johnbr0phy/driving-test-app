import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/unvented-hot-water/dashboard");
}
