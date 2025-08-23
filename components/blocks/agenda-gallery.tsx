"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

/* ================== TYPES & DATA ================== */

type EventItem = {
  id: number
  title: string
  type: "danse" | "theatre" | "atelier" | "langue" | "autre"
  date: string // YYYY-MM-DD
  time?: string
  venue?: string
  description: string
  images: string[]
  links?: { tickets?: string; video?: string; press?: string; gallery?: string }
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Corps en Mouvement",
    type: "danse",
    date: "2025-10-15",
    time: "20h30",
    venue: "Théâtre de la Renaissance, Paris",
    description: "Une exploration poétique du corps et de l'espace, où la danse contemporaine rencontre la musique live.",
    images: ["/dance.jpg", "/dance1.jpg", "/dance2.jpg"],
    links: { tickets: "#", video: "#", press: "#" },
  },
  {
    id: 2,
    title: "Fragments de Mémoire",
    type: "theatre",
    date: "2025-11-22",
    time: "19h00",
    venue: "Studio Théâtral, Berlin",
    description: "Un monologue introspectif sur l'identité et les racines, mêlant français, allemand et serbe.",
    images: ["/dance.jpg", "/dance1.jpg", "/dance2.jpg"],
    links: { tickets: "#", press: "#" },
  },
  {
    id: 3,
    title: "Atelier Voix & Mouvement",
    type: "atelier",
    date: "2025-12-05",
    time: "14h00 - 17h00",
    venue: "Centre Culturel Belgrade",
    description: "Découvrez l'harmonie entre voix, mouvement et langues dans un atelier immersif.",
    images: ["/dance.jpg", "/dance1.jpg", "/dance2.jpg"],
    links: { tickets: "#", gallery: "#" },
  },
  // Passés
  {
    id: 101,
    title: "Soirée Multilingue",
    type: "langue",
    date: "2024-03-12",
    time: "18h30",
    venue: "Maison des Arts, Lyon",
    description: "Performance collective autour de la musicalité des langues et du chœur parlé.",
    images: ["/dance.jpg", "/dance1.jpg", "/dance2.jpg"],
    links: { video: "#", gallery: "#" },
  },
  {
    id: 102,
    title: "Traversées",
    type: "danse",
    date: "2024-01-20",
    time: "20h00",
    venue: "Kampnagel, Hambourg",
    description: "Pièce chorégraphique sur les migrations intimes. Minimal, physique, lumineux.",
    images: ["/dance.jpg", "/dance1.jpg", "/dance2.jpg"],
    links: { video: "#", press: "#", gallery: "#" },
  },
]

/* ================== UTILS ================== */

function useAutoCarousel(length: number, delay = 2600) {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    if (length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay)
    return () => clearInterval(id)
  }, [length, delay])
  return [index, setIndex] as const
}

const springSoft = { type: "spring", stiffness: 220, damping: 28 }

const badgeTw: Record<EventItem["type"], string> = {
  danse: "bg-primary text-primary-foreground",
  theatre: "bg-secondary text-secondary-foreground",
  atelier: "bg-accent text-accent-foreground",
  langue: "bg-chart-5 text-white",
  autre: "bg-muted text-foreground",
}

/* ================== MAIN ================== */

export default function AgendaGallery() {
  const [scope, setScope] = React.useState<"all" | "upcoming" | "past">("all")
  const [category, setCategory] = React.useState<"all" | EventItem["type"]>("all")
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<EventItem | null>(null)
  const [modalIndex, setModalIndex] = React.useState(0)

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const isPast = (d: string) => new Date(d) < today

  const filtered = React.useMemo(() => {
    const inScope = (e: EventItem) => {
      const d = new Date(e.date); d.setHours(0, 0, 0, 0)
      if (scope === "upcoming") return d >= today
      if (scope === "past") return d < today
      return true
    }
    const byCat = (e: EventItem) => (category === "all" ? true : e.type === category)
    const byQuery = (e: EventItem) =>
      [e.title, e.venue, e.description].join(" ").toLowerCase().includes(query.toLowerCase())

    const list = events.filter((e) => inScope(e) && byCat(e) && byQuery(e))
    const up = list.filter((e) => !isPast(e.date)).sort((a, b) => +new Date(a.date) - +new Date(b.date))
    const past = list.filter((e) => isPast(e.date)).sort((a, b) => +new Date(b.date) - +new Date(a.date))
    if (scope === "upcoming") return up
    if (scope === "past") return past
    return [...up, ...past]
  }, [scope, category, query])

  // ESC / flèches
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
      if (selected && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        setModalIndex((i) => {
          const len = selected.images.length
          return e.key === "ArrowRight" ? (i + 1) % len : (i - 1 + len) % len
        })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  return (
    <section className="py-24 px-6 md:px-12 lg:pr-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header + Filtres (shadcn) */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-5xl md:text-6xl font-corinthia text-foreground">Galerie & Agenda</h2>
            <div className="w-16 h-px bg-primary mt-3" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Segmented minimal (3 états) */}
            <div className="inline-flex text-sm font-playfair">
              <Button
                variant={scope === "all" ? "default" : "outline"}
                onClick={() => setScope("all")}
                className={`rounded-none ${scope === "all" ? "" : "bg-transparent"}`}
              >
                Tout
              </Button>
              <Button
                variant={scope === "upcoming" ? "default" : "outline"}
                onClick={() => setScope("upcoming")}
                className={`rounded-none border-l-0 ${scope === "upcoming" ? "" : "bg-transparent"}`}
              >
                À venir
              </Button>
              <Button
                variant={scope === "past" ? "default" : "outline"}
                onClick={() => setScope("past")}
                className={`rounded-none border-l-0 ${scope === "past" ? "" : "bg-transparent"}`}
              >
                Passés
              </Button>
            </div>

            {/* Select catégorie */}
            <Select value={category} onValueChange={(v) => setCategory(v as any)}>
              <SelectTrigger className="h-10 w-[220px] rounded-none">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="danse">Danse</SelectItem>
                <SelectItem value="theatre">Théâtre</SelectItem>
                <SelectItem value="atelier">Ateliers</SelectItem>
                <SelectItem value="langue">Langues</SelectItem>
              </SelectContent>
            </Select>

            {/* Recherche compacte */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="h-10 w-56 pl-8 rounded-none"
              />
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((ev) => (
            <CardWithAutoCarousel
              key={ev.id}
              ev={ev}
              onClick={() => { setSelected(ev); setModalIndex(0) }}
              isPast={(d) => isPast(d)}
            />
          ))}
        </div>

        {/* MODALE LARGE (sans arrondis, sauf bouton fermer) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} />
              <motion.div
                className="relative z-10 w-[95vw] max-w-7xl h-[90vh] bg-background border border-border/60 overflow-hidden rounded-none"
                initial={{ opacity: 0, y: 20, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.25 }}
                role="dialog"
                aria-modal="true"
              >
                {/* Fermer */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 h-9 w-9 rounded-full border border-border/60 hover:bg-muted"
                >
                  ×
                </button>

                <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                  {/* Carousel gauche */}
                  <div className="md:col-span-3 relative h-[45vh] md:h-full bg-black">
                    <ModalCarousel
                      images={selected.images}
                      index={modalIndex}
                      setIndex={setModalIndex}
                    />
                  </div>

                  {/* Infos droites */}
                  <div className="md:col-span-2 h-full overflow-y-auto p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`rounded-none ${badgeTw[selected.type]}`}>
                        {selected.type === "theatre" ? "Théâtre" :
                          selected.type === "danse" ? "Danse" :
                          selected.type === "atelier" ? "Atelier" :
                          selected.type === "langue" ? "Langues" : "Autre"}
                      </Badge>
                      <Badge className={`rounded-none ${isPast(selected.date) ? "bg-foreground/80 text-background" : "bg-primary/10 text-primary"}`}>
                        {isPast(selected.date) ? "Passé" : "À venir"}
                      </Badge>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-corinthia leading-tight">{selected.title}</h3>
                    <p className="text-lg font-playfair text-primary">
                      {new Date(selected.date).toLocaleDateString("fr-FR", {
                        weekday: "long", day: "numeric", month: "long", year: "numeric"
                      })} {selected.time ? `• ${selected.time}` : ""}
                    </p>
                    {selected.venue && (
                      <p className="text-sm text-foreground/70 font-playfair">📍 {selected.venue}</p>
                    )}

                    <p className="text-base md:text-lg font-playfair text-muted-foreground">
                      {selected.description}
                    </p>

                    {(selected.links?.tickets || selected.links?.video || selected.links?.press || selected.links?.gallery) && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {selected.links?.tickets && (
                          <Button asChild variant="outline" className="rounded-none">
                            <a href={selected.links.tickets} target="_blank" rel="noopener noreferrer">Billetterie</a>
                          </Button>
                        )}
                        {selected.links?.video && (
                          <Button asChild variant="outline" className="rounded-none">
                            <a href={selected.links.video} target="_blank" rel="noopener noreferrer">Vidéo</a>
                          </Button>
                        )}
                        {selected.links?.press && (
                          <Button asChild variant="outline" className="rounded-none">
                            <a href={selected.links.press} target="_blank" rel="noopener noreferrer">Dossier de presse</a>
                          </Button>
                        )}
                        {selected.links?.gallery && (
                          <Button asChild variant="outline" className="rounded-none">
                            <a href={selected.links.gallery} target="_blank" rel="noopener noreferrer">Galerie photo</a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ================== SUB COMPONENTS ================== */

// CARD — autoplay seulement au hover (Embla + shadcn)
function CardWithAutoCarousel({
    ev,
    onClick,
    isPast,
  }: {
    ev: EventItem
    onClick: () => void
    isPast: (d: string) => boolean
  }) {
    // Instance du plugin stable sur toute la durée de vie du composant
    const autoplay = React.useMemo(
      () =>
        Autoplay(
          {
            delay: 2600,
            stopOnInteraction: false,
            stopOnMouseEnter: false, // on gère le hover nous-mêmes
          }
          // rootNode non nécessaire ici, on garde le défaut
        ),
      []
    )
  
    // Récupère l'API Embla pour stopper le plugin à l'init
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined)
  
    // Stopper l’autoplay au montage une fois Embla prêt (par défaut Embla le lance)
    React.useEffect(() => {
      if (!api) return
      // s'assurer que le plugin est attaché avant d'appeler stop()
      autoplay?.stop && autoplay.stop()
    }, [api, autoplay])
  
    // Nettoyage à l’unmount
    React.useEffect(() => {
      return () => {
        autoplay?.stop && autoplay.stop()
      }
    }, [autoplay])
  
    const handleEnter = () => {
      autoplay?.play && autoplay.play()
    }
    const handleLeave = () => {
      autoplay?.stop && autoplay.stop()
    }
  
    return (
      <button
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group aspect-square relative border border-border/50 overflow-hidden bg-muted/20 hover:border-primary/30 transition rounded-none"
      >
        {/* Carousel shadcn en fond (autoplay contrôlé par hover) */}
        <Carousel
          className="absolute inset-0 rounded-none"
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay]}
          setApi={setApi}
        >
          <CarouselContent className="rounded-none">
            {ev.images.map((src, i) => (
              <CarouselItem key={src + i} className="rounded-none p-0 basis-full">
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ aspectRatio: "1 / 1", backgroundImage: `url(${src})` }}
                  aria-hidden
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Pas de contrôles dans la card pour rester épuré */}
        </Carousel>
  
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center gap-2">
          <Badge className={`rounded-none ${badgeTw[ev.type]}`}>
            {ev.type === "theatre" ? "Théâtre" :
             ev.type === "danse" ? "Danse" :
             ev.type === "atelier" ? "Atelier" :
             ev.type === "langue" ? "Langues" : "Autre"}
          </Badge>
          <Badge className={`rounded-none ${isPast(ev.date) ? "bg-foreground/80 text-background" : "bg-primary/10 text-primary"}`}>
            {isPast(ev.date) ? "Passé" : "À venir"}
          </Badge>
        </div>
  
        {/* Infos bas */}
        <motion.div
          className="absolute inset-x-2 bottom-2 bg-background/75 backdrop-blur-sm p-2 rounded-none"
          initial={{ y: 8, opacity: 0.9 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          <div className="text-[15px] font-corinthia leading-tight line-clamp-1">{ev.title}</div>
          <div className="text-[12px] text-foreground/80 font-playfair line-clamp-1">
            {new Date(ev.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
            {ev.time ? ` • ${ev.time}` : ""}{ev.venue ? ` • ${ev.venue}` : ""}
          </div>
        </motion.div>
      </button>
    )
  }
  
  

// MODAL CAROUSEL — force la hauteur sur le viewport/container Embla
function ModalCarousel({
    images,
    index,
    setIndex,
  }: {
    images: string[]
    index: number
    setIndex: React.Dispatch<React.SetStateAction<number>>
  }) {
    const [api, setApi] = React.useState<CarouselApi>()
  
    // Sync externe -> Embla
    React.useEffect(() => {
      if (!api) return
      api.scrollTo(index)
    }, [index, api])
  
    // Sync Embla -> externe
    React.useEffect(() => {
      if (!api) return
      const onSelect = () => setIndex(api.selectedScrollSnap())
      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api, setIndex])
  
    return (
      <div className="absolute inset-0">
        <Carousel
          setApi={setApi}
          // ⬇️ Ces classes forcent la hauteur sur le viewport Embla et son container
          className="h-full w-full rounded-none [&_.embla__viewport]:h-full [&_.embla__container]:h-full"
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 3500 })]}
        >
          <CarouselContent className="h-full rounded-none">
            {images.map((src, i) => (
              <CarouselItem key={src + i} className="h-full basis-full p-0 rounded-none">

                <div
                className="w-full h-full bg-center bg-cover"
                style={{ aspectRatio: "1 / 1", backgroundImage: `url(${src})` }}
                aria-hidden
              />
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <CarouselPrevious className="left-3 rounded-none bg-background/70 hover:bg-background border-border/60">
            <ChevronLeft className="h-5 w-5" />
          </CarouselPrevious>
          <CarouselNext className="right-3 rounded-none bg-background/70 hover:bg-background border-border/60">
            <ChevronRight className="h-5 w-5" />
          </CarouselNext>
        </Carousel>
  
        {/* Vignettes */}
        <div className="absolute left-0 right-0 bottom-2 px-3">
          <div className="mx-auto max-w-[90%] flex gap-2 overflow-x-auto no-scrollbar">
            {images.map((thumb, i) => (
              <button
                key={thumb + i}
                onClick={() => setIndex(i)}
                className={`h-10 w-16 border rounded-none ${
                  i === index ? "border-primary" : "border-border/60 opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundImage: `url(${thumb})`, backgroundSize: "cover", backgroundPosition: "center" }}
                aria-label={`Aller à l'image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  