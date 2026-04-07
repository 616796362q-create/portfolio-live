import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abdikarim | Full-Stack Developer Portfolio",
  description: "Crafting aesthetic and functional digital environments. High-performance project showcase by Abdikarim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${playfair.variable} ${nunito.variable} font-nunito h-full antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
