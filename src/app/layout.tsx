import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://akiwaky.cloud"),
  title: "Alejandro AG — akiwaky.cloud",
  description:
    "Personal operating system of Alejandro AG. Engineer, automator, melómano, photographer, builder of useful little machines.",
  openGraph: {
    title: "Alejandro AG — akiwaky.cloud",
    description:
      "Engineer, automator, melómano, photographer — builder of useful little machines.",
    url: "https://akiwaky.cloud",
    siteName: "akiwaky.cloud",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro AG — akiwaky.cloud",
    description: "Builder of useful little machines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
