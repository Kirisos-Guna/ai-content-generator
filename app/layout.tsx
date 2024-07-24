import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
    <body className={clsx(inter.className, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
