import { auth } from "@/auth";

export async function getUser() {
  const session = await auth();
  console.log("🚀 ~ getUser ~ session:", session);
  return session?.user;
}
