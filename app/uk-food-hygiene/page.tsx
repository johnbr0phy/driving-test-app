import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/uk-food-hygiene/dashboard");
}
