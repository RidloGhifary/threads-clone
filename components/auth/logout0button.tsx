"use client";

import { logout } from "@/actions/auth/logout";

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const onClick = () => logout();

  return <span onClick={onClick}>{children}</span>;
}
