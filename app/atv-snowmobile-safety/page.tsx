import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/atv-snowmobile-safety/dashboard");
}
