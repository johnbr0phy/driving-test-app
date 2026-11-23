import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/uk-level-3-food-safety/dashboard");
}
