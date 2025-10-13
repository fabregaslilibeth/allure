"use client";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import RightParallax from "@/components/RightParallax/page";
import { assistant } from "@/fonts";
import ResultsParallax from "@/components/ResultsParallax/page";
import ProcedureAtAGlance from "@/components/ProcedureAtAGlance/page";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<any>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);

  const resultsImages = [
    "https://cdn.pixabay.com/photo/2023/05/30/17/20/woman-8029209_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/11/14/23/17/yoga-8388879_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/11/14/23/18/beauty-8388881_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/10/20/18/37/branch-7535534_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/27/13/40/ai-generated-8659157_640.jpg",
    "https://cdn.pixabay.com/photo/2023/09/22/03/51/beautiful-8267949_1280.jpg",
    
  ];

  useEffect(() => {
    const foundService = services.find((s) => s.href === slug);
    setService(foundService);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        // Reduced threshold for easier testing
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!service) {
    return;
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center">
            <div className="w-6 h-6 flex flex-col justify-center cursor-pointer">
              <div className="w-full h-0.5 bg-white mb-1"></div>
              <div className="w-full h-0.5 bg-white mb-1"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>
          </div>
          <div className="text-white text-2xl font-bold tracking-wider">
            EVER
          </div>
          <Link
            href="/appointment"
            className="text-white text-sm uppercase tracking-wider hover:underline"
          >
            Make an appointment
          </Link>
        </div>
      </div>
      <RightParallax service={service} />

      <div className="w-full py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="my-16">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">
              {service.features.title}
            </h2>
            {service.features.images.map((image: any, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p>
            {service.features.features.map((feature: any, index: number) => (
              <div key={index} className="relative mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light">
                  <span className={assistant.className}>
                    {feature.description}
                  </span>
                </p>
              </div>
            ))}
          </p>
        </div>
      </div>
      
      {/* Procedure at a Glance Section */}
      <ProcedureAtAGlance 
        data={{
          procedure_time: service.procedure_time,
          treatments: service.treatments,
          results: service.results,
          recovery_time: service.recovery_time,
        }}
      />
      
      <ResultsParallax
        images={resultsImages}
      />
    </div>
  );
}
