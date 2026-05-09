import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { PillarSplit } from "@/components/sections/PillarSplit";
import { FeaturedItems } from "@/components/sections/FeaturedItems";
import { Story } from "@/components/sections/Story";
import { CateringCallout } from "@/components/sections/CateringCallout";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <PillarSplit />
      <FeaturedItems />
      <Story />
      <CateringCallout />
      <Testimonials />
      <InstagramGrid />
      <Visit />
    </>
  );
}
