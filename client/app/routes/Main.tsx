import Layout from "~/components/Layout";
import type { Route } from "./+types/Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gmail Clone" },
    { name: "description", content: "Simple clone of gmail" },
  ];
}

export default function main() {
  return <h1 className="text-3xl font-bold">Welcome to Gmail Clone</h1>;
}
