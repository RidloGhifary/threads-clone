import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout0button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Hello {session ? session.user?.name : "World"}</h1>
      <Button>
        <LogoutButton>Sign Out</LogoutButton>
      </Button>
    </div>
  );
}
