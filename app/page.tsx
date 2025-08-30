import SectionScroller from "@/components/section-scroller"
import HeroPrincipal from "@/components/blocks/hero-principal"
import UniversSection from "@/components/blocks/univers-section"
import AboutRapideSection from "@/components/blocks/about-rapide-section"
import RepresentationsSection from "@/components/blocks/representations-section"
import RepresentationsGridSection from "@/components/blocks/representations-grid-section"

export const revalidate = 300  // ISR toutes les 300 sec

export default async function Home() {
  return (
    <SectionScroller>
      <section className="section">
        <HeroPrincipal />
      </section>
      <section className="section">
        <RepresentationsGridSection/>
      </section>
      <section className="section">
        <UniversSection />
      </section>
      <section className="section">
        <AboutRapideSection />
      </section>
      <section className="section">
        <RepresentationsSection/>
      </section>
    </SectionScroller>
  )
}