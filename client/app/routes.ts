import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Main.tsx"),
  route("login", "routes/Login.tsx"),
  route("create", "routes/CreateAccount.tsx"),
] satisfies RouteConfig;
