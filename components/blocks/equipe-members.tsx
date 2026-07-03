"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaInstagram } from "react-icons/fa"

const teamMembers = [
  {
    name: "Stela Elena Stankovic",
    role: "Chorégraphe & Directrice Artistique",
    description: "Danseuse et comédienne serbe-allemande née à Munich, elle intègre la California Ballet Company de San Diego, étudie la sociologie et la philosophie à Paris, puis travaille à Los Angeles autour des méthodes de l'Actors Studio.",
    image: "/stela.png"
  },
  {
    name: "Jean Guizerix",
    role: "Avec la complicité de — Chorégraphie",
    description: "Ancienne Étoile à l'Opéra de Paris, il a participé aux créations de Merce Cunningham, Rudolf Noureev et Karole Armitage. Grand Prix national de la Danse 1984, Chevalier de la Légion d'Honneur 2012.",
    image: "/stela.png"
  },
  {
    name: "Mélen Constant",
    role: "Danseur & Chorégraphe",
    description: "Interprète français formé au Ballet Junior de Genève et à l'Ensemble Program SUB.LAB.PRO à Budapest. Fondateur de la compagnie ARAN, accompagné par La Fabrique de la Danse pour la saison 2025.",
    image: "/stela.png"
  },
  {
    name: "Matthieu Lecoq",
    role: "Musicien en direct & Compositeur",
    description: "Musique en direct mêlant improvisation et dialogue avec les danseurs. Recherche amorcée avec Jean-Jacques Lemêtre (Théâtre du Soleil) vers une musique organique entre théâtre et transe.",
    image: "/stela.png"
  }
]

const extendedDetails: Record<
  string,
  { long: string; highlights: string[]; signature: string; citation: string; links?: { instagram?: string } }
> = {
  "Stela Elena Stankovic": {
    long:
      "Danseuse et comédienne serbe-allemande née à Munich, Stela Elena Stankovic enchaîne les concours de danse en Allemagne, intègre la California Ballet Company de San Diego, étudie la sociologie et la philosophie à Paris, puis travaille à Los Angeles autour des méthodes de l’Actors Studio. Elle réalise également des documentaires engagés sur l’art et la culture pour ARTE et d’autres médias, en collaboration avec le collectif WALLIS. Elle conçoit et anime par ailleurs des ateliers de danse-langue pour le jeune public, alliant apprentissage corporel et acquisition de la langue allemande.",
    highlights: [
      "California Ballet Company — San Diego",
      "Documentaires ARTE & collectif WALLIS",
      "Méthode danse-langue pour le jeune public"
    ],
    signature: "Hybridation corps-voix-langue, création Médée MEDEA.",
    citation: "« Je pars, forte de cette douleur, déterminée à vivre. »",
    links: { instagram: "https://www.instagram.com/la_stela_company/" }
  },
  "Jean Guizerix": {
    long:
      "Ancienne Étoile à l’Opéra de Paris, Jean Guizerix a participé aux créations de Merce Cunningham, Rudolf Noureev et Karole Armitage. Il reçoit le Grand Prix national de la Danse en 1984, devient Officier des Arts et des Lettres en 2001 et est élevé au rang de Chevalier de la Légion d’Honneur en 2012. Il apporte à Médée MEDEA une complicité chorégraphique d’une rare exigence, héritière des plus grands maîtres du XXe siècle.",
    highlights: [
      "Grand Prix national de la Danse 1984",
      "Officier des Arts et des Lettres 2001",
      "Chevalier de la Légion d’Honneur 2012"
    ],
    signature: "Héritage des grands maîtres du XXe siècle, complicité chorégraphique.",
    citation: "« La danse est une langue universelle qui transcende toutes les frontières. »"
  },
  "Mélen Constant": {
    long:
      "Interprète français formé au Ballet Junior de Genève et à l’Ensemble Program SUB.LAB.PRO à Budapest, Mélen Constant est le fondateur de la compagnie ARAN, dont le solo NEVEN témoigne d’une écriture chorégraphique singulière. Il est accompagné par La Fabrique de la Danse pour la saison 2025. Dans Médée MEDEA, il interprète avec une précision technique et une présence corporelle nourries par ses expériences en danse contemporaine européenne.",
    highlights: [
      "Ballet Junior de Genève",
      "La Fabrique de la Danse 2025",
      "Compagnie ARAN — solo NEVEN"
    ],
    signature: "Danse contemporaine européenne, précision technique, présence corporelle.",
    citation: "« Chaque mouvement est une question posée à l’espace. »"
  },
  "Matthieu Lecoq": {
    long:
      "Musicien et compositeur, Matthieu Lecoq crée une musique en direct qui dialogue avec les corps en mouvement. Il a amorcé une recherche approfondie avec Jean-Jacques Lemêtre du Théâtre du Soleil, vers une musique organique qui se situe entre théâtre et transe. Dans Médée MEDEA, son travail sonore improvise en temps réel avec les danseurs, créant une partition vivante où chaque représentation est unique.",
    highlights: [
      "Recherche avec Jean-Jacques Lemêtre — Théâtre du Soleil",
      "Improvisation & dialogue avec les danseurs",
      "Composition en temps réel, musique en direct"
    ],
    signature: "Musique organique en direct, improvisation, dialogue corps-son.",
    citation: "« La musique en direct est un dialogue vivant avec l’instant. »"
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
    <section className="py-32 px-6 md:px-12 lg:px-20">
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
                          {extendedDetails[selectedMember.name]?.signature}
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
                        </div>
                      </div>

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
                      <p>{extendedDetails[selectedMember.name]?.citation}</p>
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
