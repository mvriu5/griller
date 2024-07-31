import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/component/toaster";
import React, {ReactNode} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Griller",
  description: "A React Toast Component",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
      <html lang="en">
          <body className={inter.className}>
              <div className={"bg-white"}>
                  <Toaster>
                    {children}
                  </Toaster>
              </div>
          </body>
      </html>
  );
}
