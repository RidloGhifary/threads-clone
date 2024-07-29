import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return <h1>Hello {session ? session.user?.name : "World"}</h1>;
}
