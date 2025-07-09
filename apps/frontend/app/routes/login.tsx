import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login page" },
    { name: "description", content: "This is a test login page" },
  ];
}

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}
