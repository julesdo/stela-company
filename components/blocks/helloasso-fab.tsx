"use client"

import { useState, useEffect } from "react"

export default function HelloAssoFab() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === "closeHaOverlay") setIsOpen(false)
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Bouton fixe */}
      <button
        id="openHaOverlay"
        onClick={() => setIsOpen(true)}
        aria-label="Faire un don à La Stela Company"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#FF6B6B",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 14px rgba(255,107,107,0.4)",
          cursor: "pointer",
          transition: "background-color 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = "#e05555"
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(255,107,107,0.5)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = "#FF6B6B"
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,107,107,0.4)"
        }}
      >
        <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Faire un don
      </button>

      {/* Overlay HelloAsso */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 1,
              width: "36px",
              height: "36px",
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <iframe
            id="haOverlay"
            allowTransparency={true}
            src="https://www.helloasso.com/associations/la-stela-company/formulaires/2/widget?view=overlay"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Faire un don – La Stela Company"
          />
        </div>
      )}
    </>
  )
}
