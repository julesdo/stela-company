"use client"

import Link from "next/link"

export default function HelloAssoFab() {
  return (
    <Link
      href="https://www.helloasso.com/associations/la-stela-company"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#e05555] text-white text-[11px] tracking-[0.15em] uppercase font-medium px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      aria-label="Faire un don à La Stela Company"
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      Faire un don
    </Link>
  )
}
