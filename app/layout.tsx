import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ReactNode } from "react";

// faster loads
const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
});

export const metadata: Metadata = {
  title: "Bluedit",
  description:
    "A collaborative platform where developers can ask and answer coding questions. Connect with others, exchange knowledge, and work together on solutions. Dive into topics like web and mobile development, algorithms, data structures, and much more.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    // recommended to use "suppressHydrationWarning"
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable}  antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
