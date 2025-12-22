// components/blocks/donation-section.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const DonationSection = ({
  data,
}: {
  data: any
}) => {
  const title = data?.title as string | undefined
  const description = data?.description as string | undefined
  const buttonLabel = data?.buttonLabel as string | undefined
  const buttonUrl = data?.buttonUrl as string | undefined
  const iframeUrl = data?.iframeUrl as string | undefined

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <Section background={data?.background} className="py-20 md:py-28 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {title && (
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 md:mb-8"
            variants={fadeUp}
            data-tina-field={tinaField(data, "title")}
          >
            {title}
          </motion.h2>
        )}

        {description && (
          <motion.p
            className="text-lg md:text-xl text-black/70 leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto"
            variants={fadeUp}
            data-tina-field={tinaField(data, "description")}
          >
            {description}
          </motion.p>
        )}

        {iframeUrl ? (
          <motion.div
            variants={fadeUp}
            className="w-full"
            data-tina-field={tinaField(data, "iframeUrl")}
          >
            <div className="relative w-full">
              <iframe
                id="haWidget"
                src={iframeUrl}
                allowTransparency={true}
                scrolling="auto"
                className="w-full border-0"
                style={{ width: "100%", height: "750px", border: "none" }}
                title="Formulaire de don Hello Asso"
              />
            </div>
          </motion.div>
        ) : buttonUrl && buttonLabel ? (
          <motion.div variants={fadeUp} data-tina-field={tinaField(data, "buttonLabel")}>
            <Link
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black border border-black/20 hover:border-black transition-all duration-300 group"
            >
              {buttonLabel}
              <svg
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </Section>
  )
}

export const donationSectionBlockSchema: Template = {
  name: "donationSection",
  label: "Section Don",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      title: "Soutenir La Stela Company",
      description:
        "Votre soutien nous permet de continuer à créer, transmettre et développer nos projets artistiques et pédagogiques.",
      buttonLabel: "Faire un don",
      buttonUrl: "https://www.helloasso.com/associations/la-stela-company",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Titre",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      label: "Label du bouton",
      name: "buttonLabel",
    },
    {
      type: "string",
      label: "URL du formulaire de don (Hello Asso)",
      name: "buttonUrl",
      ui: {
        description:
          "URL complète vers votre formulaire Hello Asso. Si vous préférez intégrer le formulaire directement, utilisez le champ 'URL iframe' ci-dessous.",
      },
    },
    {
      type: "string",
      label: "URL iframe (optionnel)",
      name: "iframeUrl",
      ui: {
        description:
          "URL de l'iframe Hello Asso pour intégrer directement le formulaire. À obtenir depuis l'onglet 'Diffuser' de votre campagne Hello Asso.",
      },
    },
  ],
}

export default DonationSection

