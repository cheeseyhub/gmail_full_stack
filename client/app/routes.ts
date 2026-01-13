import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/Main.tsx"),
    route("login", "routes/Login.tsx"),
    route("create", "routes/CreateAccount.tsx"),
  ]),
] satisfies RouteConfig;
