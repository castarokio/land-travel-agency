import { Hero } from "@/components/home/Hero";
import { HomeTextSplit } from "@/components/home/HomeTextSplit";
import { Services } from "@/components/home/Initiatives";
import { Newsletter } from "@/components/home/Newsletter";
import { QuickServiceSelector } from "@/components/home/QuickServiceSelector";
import {
  Destinations,
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
      <QuickServiceSelector />
      <Proof />
      <Services />
      <TourismDestinations />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </>
  );
}
