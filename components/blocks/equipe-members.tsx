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
    image: "/stela.png"
  },
  {
    name: "Marie Dubois",
    role: "Chorégraphe Associée",
    description: "Spécialiste de la danse contemporaine, elle apporte sa sensibilité poétique aux créations de la compagnie.",
    image: "/stela.png"
  },
  {
    name: "Thomas Müller",
    role: "Metteur en Scène",
    description: "Dramaturge et metteur en scène, il explore les territoires narratifs entre les langues et les cultures.",
    image: "/stela.png"
  }
]

// Détails étoffés + liens
const extendedDetails: Record<
  string,
  { long: string; highlights: string[]; links?: { instagram?: string; twitter?: string; linkedin?: string }; portfolio?: string }
> = {
  "Stela Elena Stankovic": {
    long:
      "Formée entre Paris et Berlin, Stela tisse des ponts entre danse, théâtre et musicalité des langues. Elle dirige des projets multilingues où le geste devient une syntaxe et le silence, une respiration dramaturgique. Sa direction artistique se distingue par une exigence chorégraphique et une attention aux dramaturgies du corps, faisant dialoguer les scènes européennes autour d’esthétiques épurées et puissantes.",
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
      "Chorégraphe de formation contemporaine, Marie mêle écriture précise et improvisation guidée. Elle sculpte des trajectoires organiques, joue des ruptures et des contrepoints pour faire émerger des images sensibles. Sa pratique cherche l’équilibre entre virtuosité et écoute, pour des pièces justes, incarnées et délicates.",
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
      "Dramaturge et metteur en scène, Thomas construit des architectures scéniques où texte, corps et espace dialoguent. Son approche documentaire-poétique puise dans la pluralité des cultures européennes et interroge nos récits communs. Il signe des dispositifs minimalistes à haute densité symbolique, pour une expérience scénique claire et mémorable.",
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
                    <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                    />
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

      {/* Modale (élargie + éléments visibles dès l'entête) */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedMember(null)} />

            <motion.div
              key="modal"
              className="relative z-10 w-[96vw] max-w-7xl h-[95vh] bg-background border border-border/70 shadow-2xl overflow-hidden"
              variants={modalVariants as any}
              role="dialog"
              aria-modal="true"
            >
              {/* Fermer */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute right-3 top-3 h-9 w-9 rounded-full border border-border/60 hover:bg-muted"
                aria-label="Fermer"
              >
                ×
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                {/* Colonne gauche */}
                <div className="md:col-span-2 h-full bg-muted/20 border-r border-border/60">
                  <div className="h-full overflow-y-auto">
                    <div className="relative w-full h-1/2 bg-muted">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                      />
                    </div>

                    {/* Fiche rapide */}
                    <div className="p-6 md:p-7 space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-foreground/70 font-playfair">Rôle</p>
                        <p className="text-base font-playfair text-foreground">{selectedMember.role}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-foreground/70 font-playfair">Signature artistique</p>
                        <p className="text-base font-playfair text-muted-foreground">
                          {selectedMember.name === "Stela Elena Stankovic" && "Hybridations danse-théâtre, musicalité des langues, précision dramaturgique."}
                          {selectedMember.name === "Marie Dubois" && "Écritures organiques, corps musical, composition instantanée."}
                          {selectedMember.name === "Thomas Müller" && "Poétique documentaire, architectures scéniques, minimalisme signifiant."}
                        </p>
                      </div>

                      {/* Réseaux sociaux (gauche) */}
                      <div className="pt-2">
                        <p className="text-sm uppercase tracking-wider text-foreground/70 font-playfair mb-2">Réseaux</p>
                        <div className="flex gap-4">
                          {extendedDetails[selectedMember.name]?.links?.instagram && (
                            <a
                              href={extendedDetails[selectedMember.name].links?.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              aria-label="Instagram"
                            >
                              <FaInstagram size={20} />
                            </a>
                          )}
                          {extendedDetails[selectedMember.name]?.links?.twitter && (
                            <a
                              href={extendedDetails[selectedMember.name].links?.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              aria-label="Twitter"
                            >
                              <FaTwitter size={20} />
                            </a>
                          )}
                          {extendedDetails[selectedMember.name]?.links?.linkedin && (
                            <a
                              href={extendedDetails[selectedMember.name].links?.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              aria-label="LinkedIn"
                            >
                              <FaLinkedin size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* CTA Portfolio (gauche) */}
                      {extendedDetails[selectedMember.name]?.portfolio && (
                        <div className="pt-4">
                          <MagneticButton
                            href={extendedDetails[selectedMember.name].portfolio}
                            variant="outline"
                            label="Voir le portfolio"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Colonne droite */}
                <div className="md:col-span-3 h-full overflow-y-auto">
                  <div className="p-6 md:p-10 space-y-6">
                    {/* En-tête visible immédiatement */}
                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-corinthia leading-tight">{selectedMember.name}</h3>
                      {/* ➜ rôle TOUJOURS visible */}
                      <p className="text-base md:text-lg font-playfair text-primary">{selectedMember.role}</p>
                      <div className="w-16 h-px bg-primary" />
                    </div>

                    {/* Paragraphe long */}
                    <div className="text-base md:text-lg font-playfair text-muted-foreground leading-relaxed">
                      <p>{extendedDetails[selectedMember.name]?.long ?? selectedMember.description}</p>
                    </div>

                    {/* Citation/accroche */}
                    <div className="border-l-2 border-primary/60 pl-4 italic font-playfair text-foreground/90">
                      {selectedMember.name === "Stela Elena Stankovic" && (
                        <p>« Composer, c’est mettre le mouvement au service de la pensée et laisser le silence faire récit. »</p>
                      )}
                      {selectedMember.name === "Marie Dubois" && (
                        <p>« L’écriture chorégraphique commence là où le souffle dessine le temps. »</p>
                      )}
                      {selectedMember.name === "Thomas Müller" && (
                        <p>« Le plateau comme une page blanche où les corps écrivent ce que les mots taisent. »</p>
                      )}
                    </div>

                    {/* Highlights */}
                    {extendedDetails[selectedMember.name]?.highlights?.length ? (
                      <div className="space-y-3">
                        <h4 className="text-xl font-playfair text-foreground">Repères & temps forts</h4>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {extendedDetails[selectedMember.name].highlights.map((h) => (
                            <li
                              key={h}
                              className="text-sm md:text-base font-playfair text-foreground/90 border border-border/60 px-3 py-2"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="pt-2 text-sm md:text-base font-playfair text-foreground/80">
                      Disponible pour&nbsp;: créations, collaborations, ateliers & transmissions, conférences et accompagnements dramaturgiques.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
