import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { PageTransitionProvider } from "@/components/providers/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Icarus Infinity | Agentic Flagship",
  description: "2026 World-Class Luxury Experience. Refractive glassmorphism and private jets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorantGaramond.variable} ${montserrat.variable}`}>
        <SmoothScrollProvider>
          <Navbar />
          <CustomCursor />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
