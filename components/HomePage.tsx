import { Hero } from "@/components/home/Hero";
import { HomeTextSplit } from "@/components/home/HomeTextSplit";
import { Services } from "@/components/home/Initiatives";
import { Newsletter } from "@/components/home/Newsletter";
import {
  Destinations,
  OmraSection,
  Proof,
  WhyChoose
} from "@/components/home/HomeSections";
import { TourismDestinations } from "@/components/home/TourismDestinations";
import { Testimonials } from "@/components/home/Testimonials";

export function HomePage() {
  return (
    <>
      <HomeTextSplit />
      <Hero />
      <Proof />
      <Services />
      <TourismDestinations />
      <OmraSection />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </>
  );
}
