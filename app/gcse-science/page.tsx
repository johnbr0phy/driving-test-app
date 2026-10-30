import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/gcse-science/dashboard");
}
