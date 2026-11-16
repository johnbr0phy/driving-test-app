import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/hk-nursing-licensing/dashboard");
}
