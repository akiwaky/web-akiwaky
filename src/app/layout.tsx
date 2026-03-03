import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akiwaky.cloud"),
  title: "Alejandro AG — Herramientas Internas y Automatizaciones",
  description:
    "De ideas de IA a sistemas que sí se usan. Diagnóstico, integraciones robustas y enablement (n8n, APIs, Retool, Claude/OpenAI) para tu equipo.",
  openGraph: {
    title: "Alejandro AG — Herramientas Internas y Automatizaciones",
    description: "Diagnóstico, integraciones robustas y enablement para tu equipo.",
    url: "https://akiwaky.cloud",
    siteName: "Alejandro AG",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro AG — Automatización con IA",
    description: "Diagnóstico, integraciones robustas y enablement para tu equipo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      {/* TODO: Add en-US translation support (i18n) */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
