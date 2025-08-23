"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

function buildMailto({
  to,
  subject,
  body
}: { to: string; subject: string; body: string }) {
  const q = new URLSearchParams({
    subject,
    body
  }).toString()
  return `mailto:${to}?${q}`
}

export default function ContactSplit() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
  }

  const mailCours = buildMailto({
    to: "hello@lastelacompany.com",
    subject: "Rejoindre la compagnie – Cours / Ateliers",
    body:
`Bonjour La Stela Company,

Je souhaite rejoindre la compagnie pour des cours/ateliers.

Nom :
Niveau (débutant/intermédiaire/avancé) :
Dispo (jours/horaires) :
Ville :
Message complémentaire :

Merci !`
  })

  const mailProg = buildMailto({
    to: "hello@lastelacompany.com",
    subject: "Programmation – Représentation de la compagnie",
    body:
`Bonjour La Stela Company,

Je représente (institution / théâtre / association) :
Nom de la structure :
Ville / Lieu :
Fenêtre de dates envisagées :
Jauge et dispositif technique :
Contact (email/téléphone) :
Message / Contexte :

Au plaisir,`
  })

  return (
    <section className="py-28 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        {/* En-tête */}
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground leading-none mb-6">
            Choisissez votre voie
          </h2>
          <p className="text-lg md:text-xl font-playfair text-muted-foreground">
            Côté gauche&nbsp;: cours & ateliers • Côté droit&nbsp;: programmation & tournée
          </p>
        </motion.div>

        {/* Split 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Colonne 1 — Rejoindre la compagnie */}
          <motion.div
            variants={item}
            className="
              border border-border/60 p-8 md:p-10 bg-background
              hover:border-primary/40 transition-colors
            "
          >
            <h3 className="text-3xl md:text-4xl font-corinthia mb-4 text-foreground">
              Rejoindre la Compagnie
            </h3>
            <p className="text-base md:text-lg font-playfair text-muted-foreground mb-8 leading-relaxed">
              Cours, ateliers, entraînements et laboratoires artistiques. Ouverts aux
              danseur·euse·s, comédien·ne·s, performeur·euse·s et passionné·e·s.
            </p>

            <ul className="text-sm md:text-base font-playfair text-foreground/80 space-y-3 mb-10">
              <li>• Parcours adaptés&nbsp;: initiation → avancé</li>
              <li>• Axes&nbsp;: danse contemporaine, théâtre physique, voix & langues</li>
              <li>• Formats&nbsp;: workshops, cursus régulier, intensifs</li>
              <li>• Villes&nbsp;: Paris, Berlin, Belgrade</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href={mailCours}
                variant="outline"
                label="Demander à rejoindre"
              />
              <a
                href="#infos-cours"
                className="text-sm font-playfair underline underline-offset-4 text-foreground/70 hover:text-foreground"
              >
                En savoir plus
              </a>
            </div>
          </motion.div>

          {/* Colonne 2 — Programmer une représentation */}
          <motion.div
            variants={item}
            className="
              border border-border/60 p-8 md:p-10 bg-background
              hover:border-primary/40 transition-colors
            "
          >
            <h3 className="text-3xl md:text-4xl font-corinthia mb-4 text-foreground">
              Programmer une Représentation
            </h3>
            <p className="text-base md:text-lg font-playfair text-muted-foreground mb-8 leading-relaxed">
              Institutions, théâtres, festivals, associations&nbsp;: contactez-nous pour accueillir les pièces de la compagnie
              (formats plateau, in situ, jeune public, médiations).
            </p>

            <ul className="text-sm md:text-base font-playfair text-foreground/80 space-y-3 mb-10">
              <li>• Dossier artistique & fiche technique sur demande</li>
              <li>• Tournées France / Europe, team bilingue FR/DE/EN</li>
              <li>• Actions culturelles et ateliers en lien avec les spectacles</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href={mailProg}
                variant="outline"
                label="Proposer une date"
              />
              <a
                href="#infos-pro"
                className="text-sm font-playfair underline underline-offset-4 text-foreground/70 hover:text-foreground"
              >
                Informations techniques
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
