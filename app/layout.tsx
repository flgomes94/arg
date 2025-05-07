import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "ARG - Casos Investigativos",
  description: "Plataforma de casos investigativos para Alternate Reality Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${specialElite.variable} bg-background font-mono`}>
        {children}
      </body>
    </html>
  );
}
