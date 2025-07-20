import React from "react";
import { Metadata } from "next";
import { Cinzel, Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import GrandioseCursor from "@/components/cursor";
import { ThemeProvider } from "@/components/magicui/theme-provider";
import ArtisticFooter from "@/components/blocks/artistic-footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: "400",
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
    <html lang="en" className={cn(lato.variable, cinzel.variable)}>
            <body className="min-h-screen bg-background font-lato antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        // enableSystem
        disableTransitionOnChange
      >

        <VideoDialogProvider>
          <GrandioseCursor />
          {children}
          <ArtisticFooter />
          <VideoDialog />
        </VideoDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
