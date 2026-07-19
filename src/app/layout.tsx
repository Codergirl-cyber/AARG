import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteTransition from "@/components/RouteTransition";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AARG | Advanced Aerial Robotics Group",
  description: "Official website for the Advanced Aerial Robotics Group (AARG), an elite student UAV engineering team designing, building, and flying next-generation autonomous aircraft for national-level competitions.",
  keywords: ["AARG", "Advanced Aerial Robotics Group", "UAV", "Drone", "Fixed-Wing", "Student Engineering Team", "SAE Aero Design", "SAE India", "Aerospace Robotics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-foreground font-sans selection:bg-primary-accent selection:text-white overflow-x-hidden max-w-[100vw]">
        <Header />
        <main className="flex-grow flex flex-col pt-16 min-w-0 w-full overflow-x-hidden">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
