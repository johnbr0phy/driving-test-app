import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/gcse-computer-science/dashboard");
}
