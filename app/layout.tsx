import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import ClientOnlyWrapper from "./clientOnlyWrapper";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ClientOnlyWrapper>
            <main className="bg-main-black text-white">{children}</main>
          </ClientOnlyWrapper>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
