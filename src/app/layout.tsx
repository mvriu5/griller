import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/component/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Griller",
  description: "A React Toast Component",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="en">
          <body className={inter.className}>
              <div className={"w-screen h-screen flex flex-col px-80 py-32 bg-white"}>
                  <Toaster>
                    {children}
                  </Toaster>
              </div>
          </body>
      </html>
  );
}
