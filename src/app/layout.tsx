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
  metadataBase: new URL("https://mohamedabdulla.vercel.app"),
  title: {
    default: "Mohamed Abdulla | Full Stack & Systems Architect",
    template: "%s | Mohamed Abdulla",
  },
  description:
    "Portfolio of Mohamed Abdulla, Full Stack Software Engineer specializing in production-grade distributed systems, event-driven services (Kafka/RabbitMQ), custom identity (Keycloak/Kong), and Flutter mobile apps.",
  icons: {
    icon: "/assets/abd-hoodie.jpeg",
    shortcut: "/assets/abd-hoodie.jpeg",
    apple: "/assets/abd-hoodie.jpeg",
  },
  keywords: [
    "Mohamed Abdulla",
    "Full Stack Software Engineer",
    "Systems Architect",
    "Distributed Systems",
    "Kafka Event-Driven",
    "FastAPI",
    "NestJS",
    "Flutter Mobile Engineer",
    "Docker Swarm",
    "Keycloak IAM",
    "Kong Gateway",
    "Next.js Developer",
    "DevOps Engineer",
  ],
  authors: [{ name: "Mohamed Abdulla", url: "https://github.com/Mohamed-Abdulla" }],
  creator: "Mohamed Abdulla",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohamed Abdulla | Full Stack & Systems Architect",
    description:
      "Production-grade distributed systems, event-driven architectures, and high-performance mobile applications.",
    url: "https://mohamed-abdulla.dev",
    siteName: "Mohamed Abdulla Portfolio",
    images: [
      {
        url: "/assets/abd-hoodie.jpeg",
        width: 600,
        height: 600,
        alt: "Mohamed Abdulla Profile Image",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Abdulla | Full Stack & Systems Architect",
    description:
      "Production-grade distributed systems, event-driven architectures, and high-performance mobile applications.",
    images: ["/assets/abd-hoodie.jpeg"],
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
