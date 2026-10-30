import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/functional-skills-maths/dashboard");
}
