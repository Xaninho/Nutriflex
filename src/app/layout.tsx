import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`max-w-6xl mx-auto border p-4 ${roboto.className}`}>
          <AppProvider>
            
            <Toaster />

            <Header />
            
            {children}
            
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              @copy; 2024 All rights reserved
            </footer>

          </AppProvider> 
      </body>
    </html>
  );
}
