import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/txlifeonly/dashboard");
}
