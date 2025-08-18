import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Logo } from "./components/Logo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketSwap",
  description: "Popular events in TicketSwap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
          <div className="flex justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
