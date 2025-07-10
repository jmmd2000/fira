import type { Route } from "./+types/home";
import { authClient } from "@/app/lib/auth-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const session = authClient.useSession();
  console.log("Session:", session);
  return (
    <>
      <h1>Home</h1>
      <p>Welcome {session.data?.user.name}</p>
    </>
  );
}
