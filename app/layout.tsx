import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import LeftAside from "@/components/LeftAside";

export const metadata: Metadata = {
  title: "Aether Chat",
  description: "Developed by SN4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full w-full flex">
        <Menu />
        <div className='w-full flex flex-col bg-[#101017]'>
          <Header />
          <div className="flex justify-between">
            <LeftAside />
            {children}
            <Aside />
          </div>
        </div>
      </body>
    </html>
  );
}