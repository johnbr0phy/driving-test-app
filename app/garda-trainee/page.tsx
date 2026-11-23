import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/garda-trainee/dashboard");
}
