import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Premium Luxury Travel Excellence",
  description: "Discover the legacy of Icarus Flight Agency, where we combine unparalleled global expertise with bespoke service to craft extraordinary journeys.",
  openGraph: {
    title: "Our Story | Icarus Flight Agency",
    description: "Discover the legacy of Icarus Flight Agency, where we combine unparalleled global expertise with bespoke service to craft extraordinary journeys.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
