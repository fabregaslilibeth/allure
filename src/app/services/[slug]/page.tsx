"use client";
import { useParams } from 'next/navigation';
import { services } from '@/data/services';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    const foundService = services.find(s => s.href === slug);
    setService(foundService);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Service Not Found</h1>
          <Link href="/" className="text-secondary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
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

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Content Section */}
        <motion.div 
          className="flex-1 flex flex-col justify-center px-8 py-20 relative"
          style={{ 
            backgroundColor: '#8B7355' // Warm brown color
          }}
        >
          {/* Service Label */}
          <div className="mb-8">
            <div className="inline-block border border-white px-4 py-2 mb-4">
              <span className="text-white text-sm font-medium tracking-wider">
                {service.id} {service.brand}
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <div className="text-white text-sm font-medium tracking-wider transform -rotate-90 mb-4">
              SCROLL
            </div>
            <div className="w-px h-16 bg-white"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl font-bold text-white mb-6 font-serif">
            {service.title}
          </h1>

          {/* Tagline */}
          <p className="text-2xl font-bold text-white mb-8">
            {service.tagline}
          </p>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed max-w-lg">
            {service.byline}
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden"
        >
          <img
            src='https://cdn.prod.website-files.com/688b9a3280bb7d0fefe64b93/68e37804ba6a7d6ceacb28e6_img(4)-min.jpeg'
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Full Width Content Section - appears when image is full width */}
      {isFullWidth && (
        <motion.div 
          className="w-full bg-white py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-8">
            {/* Features Section */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-primary mb-8 text-center">
                {service.features.title}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {service.features.images.map((img, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {service.features.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Options Section */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8 text-center">
                Service Options
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {service.options.map((option, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {option.description}
                    </p>
                    <div className="text-2xl font-bold text-primary">
                      {option.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
