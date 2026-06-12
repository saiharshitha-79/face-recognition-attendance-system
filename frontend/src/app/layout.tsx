import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendance Intelligence Platform",
  description: "Next-Generation Multi-Modal Presence Verification",
};

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GenAIAssistant from "@/components/GenAIAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#09090b] text-white min-h-screen flex overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 flex flex-col relative">
          <Header />
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>
          <GenAIAssistant />
        </main>
      </body>
    </html>
  );
}
