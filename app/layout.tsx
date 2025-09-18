import React from "react";
import { Metadata } from "next";
import { Caveat, Playfair_Display, Inter as FontSans, Nunito, Corinthia } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import GrandioseCursor from "@/components/cursor";
import { ThemeProvider } from "@/components/magicui/theme-provider";
import ArtisticFooter from "@/components/blocks/artistic-footer";
import SidebarMenu from "@/components/blocks/sidebar-menu";
import MobileMenu from "@/components/blocks/mobile-menu";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const corinthia = Corinthia({
  subsets: ["latin"],
  variable: "--font-corinthia",
  weight: ["400", "700"],
});

// Font script manuscrite avec grain
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

// Font serif élégante pour le texte
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "La Stela Company",
  description: "La Stela Company - Danse contemporaine et théâtre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable, caveat.variable, playfair.variable, nunito.variable, corinthia.variable  )}>
            <body className="min-h-screen bg-white text-black font-serif antialiased">

        <VideoDialogProvider>
          <GrandioseCursor />
          <SidebarMenu />
          {/* <MobileMenu /> */}
          {children}
          <ArtisticFooter />
          <VideoDialog />
        </VideoDialogProvider>
      </body>
    </html>
  );
}
