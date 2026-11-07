import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/motorcykel-teori/dashboard");
}
