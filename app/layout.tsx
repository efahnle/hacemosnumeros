import type { Metadata } from "next";
import "./globals.css";
import { inter,archivo } from "@/app/ui/fonts";
import Link from 'next/link';
import logo from "@/app/ui/images/logo3.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";


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
        <header className="fixed top-0 left-0 right-0 bg-[#39a399] shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16">
              <div className="flex items-center flex-shrink-0">
                <Link href="/" className="flex fixed left-0 items-center lg:ml-8 ml-2">
                  <Image
                    src={logo}
                    alt="Picture of fahrul-saputra"
                    width={50}
                    height={50}
                  />
                  
                </Link>
                <span className={`${archivo.className}ml-4 text-center break-normal text-nowrap items-center text-2xl md:text-3xl lg:text-3xl`}>¿Hacemos números?</span>
                <a href="https://github.com/efahnle/hacemosnumeros" className="flex fixed right-0 items-center lg:mr-8 mr-2" target="_blank">
                  <FaGithub size={45}/>
                  
                </a>
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
