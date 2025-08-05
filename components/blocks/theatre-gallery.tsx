"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=600&fit=crop&crop=center",
    alt: "Performance théâtrale expressive",
    caption: "L'art de l'expression"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=400&fit=crop&crop=center", 
    alt: "Mise en scène contemporaine",
    caption: "Théâtre contemporain"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=500&fit=crop&crop=center",
    alt: "Jeu d'acteur intense",
    caption: "Intensité dramatique"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=700&fit=crop&crop=center",
    alt: "Scène théâtrale éclairée",
    caption: "Magie scénique"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1586873055737-1e40888e3d6e?w=600&h=500&fit=crop&crop=center",
    alt: "Moment dramatique",
    caption: "Émotion pure"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1594736797933-d0d9a47ba567?w=400&h=600&fit=crop&crop=center",
    alt: "Performance solo",
    caption: "Monologue intérieur"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=500&h=400&fit=crop&crop=center",
    alt: "Théâtre en mouvement",
    caption: "Corps et parole"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1586874117938-86a923b25c4b?w=400&h=550&fit=crop&crop=center",
    alt: "Création théâtrale",
    caption: "Création vivante"
  }
]

export default function TheatreGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' as const
      } 
    }
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* En-tête */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-8 leading-none">
            Scènes de Vie
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          
          <p className="text-xl font-playfair font-light text-muted-foreground max-w-2xl mx-auto">
            Instants capturés de nos créations théâtrales
          </p>
        </motion.div>

        {/* Grille masonry épurée */}
        <motion.div
          variants={containerVariants}
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="break-inside-avoid cursor-pointer group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden bg-muted/10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Overlay épuré */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
                
                {/* Caption au hover améliorée */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-base md:text-lg font-playfair text-foreground font-medium drop-shadow-sm">
                    {image.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lightbox épuré */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-7xl max-h-full w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={1800}
                className="w-full h-auto max-h-[95vh] object-contain"
                sizes="95vw"
              />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
                <p className="text-xl font-playfair text-foreground text-center font-medium drop-shadow-sm">
                  {selectedImage.caption}
                </p>
              </div>
              
              {/* Bouton fermer épuré */}
              <button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}