import React from "react"
import { Metadata } from "next"
import ContactHero from "@/components/blocks/contact-hero"
import ContactInfo from "@/components/blocks/contact-info"
import ContactConnect from "@/components/blocks/contact-connect"

export const metadata: Metadata = {
  title: "Contact | La Stela Company",
  description: "Entrez en contact avec La Stela Company pour vos projets artistiques et collaborations",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero épuré */}
      <ContactHero />
      
      {/* Informations de contact */}
      <ContactInfo />
      
      {/* Connexion */}
      <ContactConnect />
    </>
  )
}