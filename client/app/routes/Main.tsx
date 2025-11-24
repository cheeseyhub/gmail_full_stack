import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gmail Clone" },
    { name: "description", content: "Simple clone of gmail" },
  ];
}

export default function main() {
  return <h1>Main Page</h1>;
}
