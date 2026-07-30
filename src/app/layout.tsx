import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Abdulla | Full Stack Software Engineer",
  description: "Portfolio of Mohamed Abdulla, Full Stack Software Engineer specializing in production-grade distributed systems, event-driven services (Kafka/RabbitMQ), custom identity (Keycloak/Kong), and Flutter mobile apps.",
  icons: {
    icon: "/assets/abd-hoodie.jpeg",
  },
  keywords: [
    "Mohamed Abdulla",
    "Full Stack Software Engineer",
    "Distributed Systems",
    "Kafka Developer",
    "FastAPI",
    "NestJS",
    "Flutter Mobile Engineer",
    "Docker Swarm",
    "Keycloak IAM",
    "Next.js Developer",
  ],
  authors: [{ name: "Mohamed Abdulla" }],
  openGraph: {
    title: "Mohamed Abdulla | Full Stack Software Engineer",
    description: "Production-grade distributed systems, event-driven architectures, and mobile applications.",
    type: "website",
    locale: "en_US",
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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-screen flex flex-col font-sans select-none antialiased"
      >
        {children}
      </body>
    </html>
  );
}
