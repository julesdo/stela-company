import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import ArtisticNavbar from "../blocks/artistic-navbar";
import ArtisticFooter from "../blocks/artistic-footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  let globalSettings: any;
  
  try {
    const result = await client.queries.global({
      relativePath: "index.json",
    });
    globalSettings = result?.data?.global;
  } catch (error: any) {
    // Silently fallback to default settings
    globalSettings = {
      header: {
        icon: { name: "Tina", color: "orange", style: "float" },
        name: "La Stela Company",
        color: "default",
        nav: [
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]
      },
      footer: {
        social: []
      },
      theme: {
        color: "blue",
        font: "sans",
        darkMode: "light"
      }
    };
  }

  // Ensure globalSettings is never undefined
  if (!globalSettings) {
    globalSettings = {
      header: {
        icon: { name: "Tina", color: "orange", style: "float" },
        name: "La Stela Company",
        color: "default",
        nav: []
      },
      footer: {
        social: []
      },
      theme: {
        color: "blue",
        font: "sans",
        darkMode: "light"
      }
    };
  }

  return (
    <LayoutProvider globalSettings={globalSettings} pageData={rawPageData}>
      <main className="relative overflow-x-hidden">
        {children}
      </main>
    </LayoutProvider>
  );
}
