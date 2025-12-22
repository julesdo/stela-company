"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { usePathname } from "next/navigation"
import { Section, sectionBlockSchemaField } from "../layout/section"
import { PageBlocksContactForm } from "@/tina/__generated__/types"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

// Traductions
const translations: Record<Locale, {
  name: string;
  email: string;
  subject: string;
  requestType: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  general: string;
  workshop: string;
  representation: string;
  collaboration: string;
  media: string;
  sending: string;
  send: string;
  success: string;
  error: string;
}> = {
  fr: {
    name: 'Nom complet *',
    email: 'Email *',
    subject: 'Sujet *',
    requestType: 'Type de demande',
    message: 'Message *',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'votre@email.com',
    subjectPlaceholder: 'Objet de votre message',
    messagePlaceholder: 'Décrivez votre projet, votre question ou votre demande...',
    general: 'Demande générale',
    workshop: 'Atelier / Cours',
    representation: 'Représentation',
    collaboration: 'Collaboration',
    media: 'Presse / Médias',
    sending: 'Envoi en cours...',
    send: 'Envoyer le message',
    success: 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    error: 'Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement.',
  },
  de: {
    name: 'Vollständiger Name *',
    email: 'E-Mail *',
    subject: 'Betreff *',
    requestType: 'Art der Anfrage',
    message: 'Nachricht *',
    namePlaceholder: 'Ihr Name',
    emailPlaceholder: 'ihre@email.com',
    subjectPlaceholder: 'Betreff Ihrer Nachricht',
    messagePlaceholder: 'Beschreiben Sie Ihr Projekt, Ihre Frage oder Ihre Anfrage...',
    general: 'Allgemeine Anfrage',
    workshop: 'Workshop / Kurs',
    representation: 'Aufführung',
    collaboration: 'Zusammenarbeit',
    media: 'Presse / Medien',
    sending: 'Wird gesendet...',
    send: 'Nachricht senden',
    success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir werden Ihnen so schnell wie möglich antworten.',
    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
  },
  en: {
    name: 'Full Name *',
    email: 'Email *',
    subject: 'Subject *',
    requestType: 'Request Type',
    message: 'Message *',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    subjectPlaceholder: 'Subject of your message',
    messagePlaceholder: 'Describe your project, your question or your request...',
    general: 'General Request',
    workshop: 'Workshop / Course',
    representation: 'Performance',
    collaboration: 'Collaboration',
    media: 'Press / Media',
    sending: 'Sending...',
    send: 'Send Message',
    success: 'Thank you! Your message has been sent successfully. We will get back to you as soon as possible.',
    error: 'An error occurred. Please try again or contact us directly.',
  },
  sr: {
    name: 'Пуно име *',
    email: 'Е-пошта *',
    subject: 'Предмет *',
    requestType: 'Тип захтева',
    message: 'Порука *',
    namePlaceholder: 'Ваше име',
    emailPlaceholder: 'vasa@email.com',
    subjectPlaceholder: 'Предмет ваше поруке',
    messagePlaceholder: 'Опишите ваш пројекат, ваше питање или ваш захтев...',
    general: 'Општи захтев',
    workshop: 'Радионица / Курс',
    representation: 'Извођење',
    collaboration: 'Сарадња',
    media: 'Штампа / Медији',
    sending: 'Слање...',
    send: 'Пошаљи поруку',
    success: 'Хвала вам! Ваша порука је успешно послата. Обратићемо вам се у најкраћем року.',
    error: 'Дошло је до грешке. Молимо покушајте поново или нас контактирајте директно.',
  },
}

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
  const pathname = usePathname()
  
  // Détecter la locale actuelle
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  const isValidLocale = firstSegment && locales.includes(firstSegment as Locale)
  const currentLocale: Locale = isValidLocale ? (firstSegment as Locale) : defaultLocale
  
  const t = translations[currentLocale]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  }

  return (
    <Section data={data as any} className="py-32 px-6 md:px-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* En-tête */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-corinthia text-foreground mb-6 leading-none"
            data-tina-field={tinaField(data, 'heading')}
          >
            {data.heading}
          </h2>
          <p 
            className="text-lg md:text-xl font-playfair font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            data-tina-field={tinaField(data, 'description')}
          >
            {data.description}
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Ligne 1: Nom et Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-none bg-white text-foreground placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-none bg-white text-foreground placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder={t.emailPlaceholder}
                />
              </div>
            </div>

            {/* Ligne 2: Sujet et Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-none bg-white text-foreground placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder={t.subjectPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t.requestType}
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-none bg-white text-foreground focus:outline-none focus:border-black transition-colors duration-300"
                >
                  <option value="general">{t.general}</option>
                  <option value="atelier">{t.workshop}</option>
                  <option value="representation">{t.representation}</option>
                  <option value="collaboration">{t.collaboration}</option>
                  <option value="media">{t.media}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-none bg-white text-foreground placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300 resize-none"
                placeholder={t.messagePlaceholder}
              />
            </div>

            {/* Bouton d'envoi */}
            <div className="flex justify-center pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-black text-white font-medium uppercase tracking-wider hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? t.sending : t.send}
              </motion.button>
            </div>

            {/* Message de statut */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <p className="text-green-600 font-medium">
                  {t.success}
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <p className="text-red-600 font-medium">
                  {t.error}
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export const contactFormBlockSchema: Template = {
  name: "contactForm",
  label: "Contact Form",
  ui: {
    previewSrc: "/blocks/contact-form.png",
    defaultItem: {
      heading: "Écrivez-nous",
      description: "Partagez-nous vos idées, vos questions ou vos projets. Chaque message est une opportunité de créer ensemble."
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: "string", label: "Heading", name: "heading" },
    { type: "string", label: "Description", name: "description", ui: { component: "textarea" } },
  ],
}

export default ContactForm
