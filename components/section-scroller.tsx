"use client"

import React from "react"
import { useSectionTransitions } from "@/hooks/useSectionTransitions"

export default function SectionScroller({
  children,
}: {
  children: React.ReactNode
}) {
  // Ce hook utilise Lenis + GSAP, il doit être appelé en client
  const containerRef = useSectionTransitions()

  return <div ref={containerRef}>{children}</div>
}
