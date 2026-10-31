import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/kenya-driving-test/dashboard");
}
