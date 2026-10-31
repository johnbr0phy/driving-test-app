import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/hong-kong-driving-test/dashboard");
}
