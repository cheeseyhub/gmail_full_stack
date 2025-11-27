import SideBar from "~/components/SideBar";
import type { Route } from "./+types/Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gmail Clone" },
    { name: "description", content: "Simple clone of gmail" },
  ];
}

export default function main() {
  return <SideBar />;
}
