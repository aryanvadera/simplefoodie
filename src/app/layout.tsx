import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyOrderBar } from "@/components/site/StickyOrderBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#f5efe6",
};

export const metadata: Metadata = {
  title: {
    default: "The Simple Foodie — Café & Catering, Docklands Melbourne",
    template: "%s · The Simple Foodie",
  },
  description:
    "Fresh, handmade food and barista-made coffee in Docklands. Lunch, brunch, sweet treats and corporate catering — delivered to your door.",
  metadataBase: new URL("https://thesimplefoodie.com.au"),
  openGraph: {
    title: "The Simple Foodie",
    description:
      "Café & catering in Docklands, Melbourne. Order online or get a quote in 60 seconds.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linen text-ink">
        <ScrollProgress />
        <Cursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyOrderBar />
      </body>
    </html>
  );
}
