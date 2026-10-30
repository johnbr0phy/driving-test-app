import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/gcse-maths-higher/dashboard");
}
