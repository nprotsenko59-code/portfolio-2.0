import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../public/fonts/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../public/fonts/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const switzer = localFont({
  src: [
    { path: "../public/fonts/Switzer-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Switzer-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/Switzer-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Switzer-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Switzer-Extrabold.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/Switzer-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const patrickHandSC = localFont({
  src: [{ path: "../public/fonts/PatrickHandSC-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-patrick-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikita Protsenko — Product Designer",
  description: "I build unique and friendly product experiences for startups, corporations and myself.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${switzer.variable} ${patrickHandSC.variable} antialiased`}>
      <body className="bg-[#161616] text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
