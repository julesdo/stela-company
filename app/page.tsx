
  import HeroSection from "@/components/blocks/hero-section"
  import SectionScroller from "@/components/section-scroller"
  import client from "@/tina/__generated__/client"
  import AboutSection from "@/components/blocks/about-section"
  import HorizontalGallery from "@/components/blocks/performance-section"
  import CalendarSectionAnimated from "@/components/blocks/calendar-section"
  import CoursesSection from "@/components/blocks/courses-section"
import ArtisticNavbar from "@/components/blocks/artistic-navbar"
import HeroParallaxSection from "@/components/blocks/hero-test"
import EndSection from "@/components/blocks/end-section"
import TeamSection from "@/components/blocks/team-section"
import InstagramEmbedSection from "@/components/blocks/instagram-section"

  export const revalidate = 300  // ISR toutes les 300 sec :contentReference[oaicite:3]{index=3}

  export default async function Home() {
    const data = await client.queries.page({
      relativePath: `home.mdx`,
    })

    return (
      <>
      <ArtisticNavbar />
        <SectionScroller>
          <section className="section">
            <HeroSection />
          </section>
          <section className="section">
            <AboutSection />
          </section>
          <section className="section">
            <HorizontalGallery />
          </section>
          <section className="section">
            <CalendarSectionAnimated />
          </section>
          <section className="section">
            <CoursesSection />
          </section>
          <section className="section">
            <HeroParallaxSection />
          </section>
          <section className="section">
            <EndSection />
          </section>
          <section className="section">
            <TeamSection />
          </section>
          <section className="section">
            <InstagramEmbedSection />
          </section>
          {/* <section className="section">
            <ClientPage {...data} />
          </section> */}
        </SectionScroller>
        </>
    )
  }
