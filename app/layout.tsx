import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thread clone",
  description: "Thread clone built for learning purposes",
};

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
          <Providers>
            <main className="dark:bg-main-black dark:text-white">
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </main>
          </Providers>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
