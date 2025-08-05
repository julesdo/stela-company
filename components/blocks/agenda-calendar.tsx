"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

// Données d'exemple pour le calendrier
const calendarEvents = {
  "2024-02-15": [{ title: "Corps en Mouvement", type: "danse", time: "20h30" }],
  "2024-02-22": [{ title: "Fragments de Mémoire", type: "theatre", time: "19h00" }],
  "2024-03-05": [{ title: "Atelier Voix & Mouvement", type: "atelier", time: "14h00" }],
  "2024-03-12": [{ title: "Soirée Multilingue", type: "langue", time: "18h30" }],
}

export default function AgendaCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' as const
      } 
    }
  }

  // Générer le calendrier du mois
  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Jours vides au début
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const formatDateKey = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    return new Date(year, month, day).toISOString().split('T')[0]
  }

  const hasEvents = (day: number) => {
    const dateKey = formatDateKey(day) as keyof typeof calendarEvents
    return calendarEvents[dateKey] && calendarEvents[dateKey].length > 0
  }

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'danse': return 'bg-primary'
      case 'theatre': return 'bg-secondary'
      case 'atelier': return 'bg-accent'
      case 'langue': return 'bg-chart-5'
      default: return 'bg-muted'
    }
  }

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
    setSelectedDate(null)
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:pr-20 bg-muted/20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* En-tête de section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-4">
            Calendrier
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground font-playfair max-w-2xl mx-auto">
            Planifiez vos soirées culturelles
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-background border border-border/50 overflow-hidden"
        >
          {/* En-tête du calendrier */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <motion.button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <h3 className="text-2xl font-corinthia text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <motion.button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 border-b border-border/50">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center font-playfair text-sm text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7">
            {generateCalendar().map((day, index) => (
              <motion.div
                key={index}
                className={`
                  aspect-square p-2 border-r border-b border-border/20 relative
                  ${day ? 'hover:bg-muted/30 cursor-pointer' : ''}
                  ${selectedDate === (day ? formatDateKey(day) : '') ? 'bg-primary/10' : ''}
                `}
                onClick={() => day && setSelectedDate(formatDateKey(day))}
                whileHover={day ? { scale: 1.02 } : {}}
                transition={{ duration: 0.2 }}
              >
                {day && (
                  <>
                    <span className="font-playfair text-sm">
                      {day}
                    </span>
                    
                    {/* Indicateurs d'événements */}
                    {hasEvents(day) && (
                      <div className="absolute bottom-1 left-1 right-1 flex gap-1 justify-center">
                        {calendarEvents[formatDateKey(day) as keyof typeof calendarEvents].map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Détails de l'événement sélectionné */}
        {selectedDate && calendarEvents[selectedDate as keyof typeof calendarEvents] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-background border border-border/50"
          >
            <h4 className="text-2xl font-corinthia text-foreground mb-4">
              {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h4>
            <div className="space-y-3">
              {calendarEvents[selectedDate as keyof typeof calendarEvents].map((event: any, index: any) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                  <span className="font-playfair">{event.title}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground font-playfair">{event.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Légende */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {[
            { type: 'danse', label: 'Danse', color: 'bg-primary' },
            { type: 'theatre', label: 'Théâtre', color: 'bg-secondary' },
            { type: 'atelier', label: 'Ateliers', color: 'bg-accent' },
            { type: 'langue', label: 'Langues', color: 'bg-chart-5' },
          ].map(({ type, label, color }) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm font-playfair text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}