import { tinaField } from "tinacms/dist/react";
import { Page } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { AboutHero } from "./about-hero";
import { TeamSection } from "./team-section";
import { RepresentationsSection } from "./representations-section";
import { AboutTriptych } from "./about-triptych";
import { RepresentationsGridSection } from "./representations-grid-section";
import { HeroPrincipal } from "./hero-principal";
import { UniversSection } from "./univers-section";
import { AboutRapideSection } from "./about-rapide-section";
import { AteliersList } from "./ateliers-list";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import { PartnersCarousel } from "./partners-carousel";
import AtelierDetail from "./atelier-detail";
import { EngagementsHero } from "./engagements-hero";
import { EngagementsGrid } from "./engagements-grid";
import { DonationSection } from "./donation-section";
import { TeamList } from "./team-list";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

// Temporarily use 'any' to allow newly added blocks before types are regenerated
const Block = (block: any) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    // Custom project blocks
    case "PageBlocksAboutHero":
      return <AboutHero data={block} />;
    case "PageBlocksTeamSection":
      return <TeamSection data={block} />;
    case "PageBlocksRepresentationsSection":
      return <RepresentationsSection data={block} />;
    case "PageBlocksAboutTriptych":
      return <AboutTriptych data={block} />;
    case "PageBlocksRepresentationsGridSection":
      return <RepresentationsGridSection data={block} />;
    case "PageBlocksHeroPrincipal":
      return <HeroPrincipal data={block} />;
    case "PageBlocksUniversSection":
      return <UniversSection data={block} />;
    case "PageBlocksAboutRapideSection":
      return <AboutRapideSection data={block} />;
    case "PageBlocksAteliersList":
      return <AteliersList data={block} />;
    case "PageBlocksContactHero":
      return <ContactHero data={block} />;
    case "PageBlocksContactInfo":
      return <ContactInfo data={block} />;
    case "PageBlocksContactForm":
      return <ContactForm data={block} />;
    case "PageBlocksPartnersCarousel":
      return <PartnersCarousel data={block} />;
    case "PageBlocksAtelierDetail":
      return <AtelierDetail data={block} />;
    case "PageBlocksEngagementsHero":
      return <EngagementsHero data={block} />;
    case "PageBlocksEngagementsGrid":
      return <EngagementsGrid data={block} />;
    case "PageBlocksDonationSection":
      return <DonationSection data={block} />;
    case "PageBlocksTeamList":
      return <TeamList data={block} />;
    default:
      return null;
  }
};
