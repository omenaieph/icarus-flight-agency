import { Hero } from "@/components/features/home/Hero";
import { StatsSection } from "@/components/features/home/StatsSection";
import { DestinationGallery } from "@/components/features/home/DestinationGallery";
import { IcarusHomesSnippet } from "@/components/features/home/IcarusHomesSnippet";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { TestimonialsEditorial } from "@/components/features/home/TestimonialsEditorial";
import { OurExpertise } from "@/components/features/home/OurExpertise";
import { InnerCircle } from "@/components/features/home/InnerCircle";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <OurExpertise />
      <WavyDivider flip color="var(--color-pearl)" backgroundColor="white" />
      <DestinationGallery />
      <WavyDivider color="var(--color-pearl)" backgroundColor="white" />
      <IcarusHomesSnippet />
      <WavyDivider flip color="var(--color-pearl)" backgroundColor="white" />
      <TestimonialsEditorial />
      <InnerCircle />
    </main>
  );
}
