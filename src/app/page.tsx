import FAQ from "@/components/FAQ";
import FeaturedServices from "@/components/FeaturedServices";
import Hero from "@/components/Hero";
import ParallaxGallery from "@/components/ParallaxGallery";
import PersonalizedServices from "@/components/PersonalizedServices";
import StoreFinder from "@/components/StoreFinder";
import { galleryImages } from "@/data/gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <ParallaxGallery images={galleryImages} title="Science with a Gentle Touch" />
      <PersonalizedServices />
      <StoreFinder />
      <FAQ />
    </>
  );
}
