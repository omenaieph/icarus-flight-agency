import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { PageTransitionProvider } from "@/components/providers/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Banner } from "@/components/ui/Banner";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://icarusflightagency.com"),
  title: {
    default: "Icarus Flight Agency | Premium Luxury Travel",
    template: "%s | Icarus Flight Agency",
  },
  description: "Experience unparalleled travel with Icarus Flight Agency. We offer exclusive flights, global accommodations, visa assistance, and travel insurance.",
  applicationName: "Icarus Flight Agency",
  openGraph: {
    siteName: "Icarus Flight Agency",
    title: "Icarus Flight Agency | Premium Luxury Travel",
    description: "Experience unparalleled travel with Icarus Flight Agency. We offer exclusive flights, global accommodations, visa assistance, and travel insurance.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/icarus-logo-dark-solid.png",
        width: 1563,
        height: 1563,
        alt: "Icarus Flight Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Icarus Flight Agency | Premium Luxury Travel",
    description: "Experience unparalleled travel with Icarus Flight Agency. We offer exclusive flights, global accommodations, visa assistance, and travel insurance.",
    images: ["/icarus-logo-dark-solid.png"],
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Icarus Flight Agency",
              "url": "https://icarusflightagency.com",
              "logo": "https://icarusflightagency.com/icarus-logo-dark-solid.png",
              "image": "https://icarusflightagency.com/icarus-logo-dark-solid.png",
              "description": "Experience unparalleled travel with Icarus Flight Agency. We offer exclusive flights, global accommodations, visa assistance, and travel insurance."
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorantGaramond.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <Banner id="global-development-disclaimer" variant="rainbow">
            🚀 This project is undergoing changes and updates. Current content is for demonstration purposes only.
          </Banner>
          <Navbar />
          <CustomCursor />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
