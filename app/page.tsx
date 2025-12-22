import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export default async function Home() {
  let data;
  try {
    data = await client.queries.page({
      relativePath: `home.mdx`,
    });
  } catch (error) {
    console.error("Error loading home page:", error);
    // Return a minimal fallback structure
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-black/60">Chargement de la page d'accueil...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}