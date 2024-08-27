import type { Metadata } from "next";
import "./globals.css";
import { inter,archivo } from "@/app/ui/fonts";
import Link from 'next/link';
import logo from "@/app/ui/images/logo.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "¿Hacemos números?",
  description: "La app para dividir gastos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 bg-cyan-300 shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16">
              <div className="flex items-center flex-shrink-0">
                <Link href="/" className="flex fixed left-0 items-center">
                  <Image
                    src={logo}
                    alt="Picture of fahrul-saputra"
                    width={64}
                    height={64}
                  />
                  
                </Link>
                <span className={`${archivo.className}ml-4 text-center break-normal text-nowrap items-center text-3xl md:text-4xl lg:text-5xl`}>¿Hacemos números?</span>
              </div>
              {/* Add additional elements like navigation links, user profile, etc., here */}
            </div>
          </div>
        </header>
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  );
}
