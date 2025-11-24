import type { Route } from "./+types/home";
import Index from "../components/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gmail Clone" },
    { name: "description", content: "Simple clone of gmail" },
  ];
}

export default function main() {
  return <Index />;
}
