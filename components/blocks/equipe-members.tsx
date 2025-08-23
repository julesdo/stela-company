"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import MagneticButton from "../ui/magnetic-button"

const teamMembers = [
  {
    name: "Stela Elena Stankovic",
    role: "Fondatrice & Directrice Artistique",
    description: "Artiste pluridisciplinaire franco-germano-serbe, elle orchestre la vision créative de la compagnie entre danse, théâtre et langues.",
    image: "/team/stela.jpg"
  },
  {
    name: "Marie Dubois",
    role: "Chorégraphe Associée",
    description: "Spécialiste de la danse contemporaine, elle apporte sa sensibilité poétique aux créations de la compagnie.",
    image: "/team/marie.jpg"
  },
  {
    name: "Thomas Müller",
    role: "Metteur en Scène",
    description: "Dramaturge et metteur en scène, il explore les territoires narratifs entre les langues et les cultures.",
    image: "/team/thomas.jpg"
  }
]

// Détails étoffés + liens
const extendedDetails: Record<
  string,
  { long: string; highlights: string[]; links?: { instagram?: string; twitter?: string; linkedin?: string }; portfolio?: string }
> = {
  "Stela Elena Stankovic": {
    long:
      "Formée entre Paris et Berlin, Stela tisse des ponts entre danse, théâtre et musicalité des langues. Elle dirige des projets multilingues où le geste devient une syntaxe et le silence, une respiration dramaturgique.",
    highlights: [
      "Direction de 12 créations originales depuis 2016",
      "Résidences : Radialsystem Berlin, CN D Pantin",
      "Transmission : ateliers danse-théâtre bilingues (FR/DE)"
    ],
    links: {
      instagram: "https://instagram.com/stela",
      linkedin: "https://linkedin.com/in/stela"
    },
    portfolio: "https://stela-portfolio.com"
  },
  "Marie Dubois": {
    long:
      "Chorégraphe de formation contemporaine, Marie mêle écriture précise et improvisation guidée. Elle sculpte des trajectoires organiques, joue des ruptures et des contrepoints pour faire émerger des images sensibles.",
    highlights: [
      "Lauréate Jeune Scène Chorégraphique 2022",
      "Collab. : musiciens live & scénographes lumière",
      "Pédagogie : ateliers corps-voix, composition instantanée"
    ],
    links: {
      instagram: "https://instagram.com/marie",
      twitter: "https://twitter.com/marie"
    },
    portfolio: "https://marie-dubois.com"
  },
  "Thomas Müller": {
    long:
      "Dramaturge et metteur en scène, Thomas construit des architectures scéniques où texte, corps et espace dialoguent. Son approche documentaire-poétique puise dans la pluralité des cultures européennes.",
    highlights: [
      "Adaptations multilingues (FR/DE/EN)",
      "Recherche : théâtre postdramatique & chœur",
      "Scénographies minimales à forte charge symbolique"
    ],
    links: {
      linkedin: "https://linkedin.com/in/thomas",
      twitter: "https://twitter.com/thomas"
    },
    portfolio: "https://thomas-muller.com"
  }
}

export default function EquipeMembers() {
  const [selectedMember, setSelectedMember] = React.useState<(typeof teamMembers)[number] | null>(null)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.4, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } }
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <motion.div key={member.name} variants={itemVariants} className="group">
              <div
                className={`grid lg:grid-cols-12 gap-16 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:text-right" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  className={`lg:col-span-4 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="w-full aspect-[3/4] relative bg-muted "
                  >
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground font-playfair text-lg">{member.name.split(" ")[0]}</span>
                    </div>
                  </button>
                </motion.div>

                {/* Contenu */}
                <div
                  className={`lg:col-span-8 space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                  onClick={() => setSelectedMember(member)}
                >
                  <motion.h3
                    className="text-4xl md:text-5xl lg:text-6xl font-corinthia text-foreground leading-tight cursor-pointer"
                    whileHover={{ x: index % 2 === 1 ? -5 : 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>
                  <p className="text-xl md:text-2xl font-playfair text-primary font-light">{member.role}</p>
                  <p className="text-lg md:text-xl font-playfair text-muted-foreground leading-relaxed max-w-2xl">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modale */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedMember(null)} />
            <motion.div
              key="modal"
              className="relative z-10 w-full md:max-w-3xl bg-background  shadow-xl mx-0 md:mx-6 p-6 md:p-8"
              variants={modalVariants as any}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute right-3 top-3 h-9 w-9 rounded-full border border-border/60 hover:bg-muted"
              >
                ×
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
                <div className="md:col-span-2">
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground font-playfair text-lg">
                        {selectedMember.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-corinthia">{selectedMember.name}</h3>
                  <p className="text-lg font-playfair text-primary">{selectedMember.role}</p>

                  <p className="text-base md:text-lg font-playfair text-muted-foreground">
                    {extendedDetails[selectedMember.name]?.long ?? selectedMember.description}
                  </p>

                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base font-playfair text-muted-foreground/90">
                    {extendedDetails[selectedMember.name]?.highlights?.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  {/* Réseaux sociaux */}
                  <div className="flex gap-4 pt-4">
                    {extendedDetails[selectedMember.name]?.links?.instagram && (
                      <a
                        href={extendedDetails[selectedMember.name].links?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <FaInstagram size={22} />
                      </a>
                    )}
                    {extendedDetails[selectedMember.name]?.links?.twitter && (
                      <a
                        href={extendedDetails[selectedMember.name].links?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <FaTwitter size={22} />
                      </a>
                    )}
                    {extendedDetails[selectedMember.name]?.links?.linkedin && (
                      <a
                        href={extendedDetails[selectedMember.name].links?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <FaLinkedin size={22} />
                      </a>
                    )}
                  </div>

                  {/* Bouton Portfolio */}
                  {extendedDetails[selectedMember.name]?.portfolio && (
                    <div className="pt-4 text-start">
                      <MagneticButton
                      label="Voir le portfolio"
                      >
                      <a
                        href={extendedDetails[selectedMember.name].portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir le portfolio
                      </a>
                      </MagneticButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
