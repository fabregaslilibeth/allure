"use client";
import { useParams } from 'next/navigation';
import { services } from '@/data/services';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import RightParallax from '@/components/RightParallax/page';

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<any>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const optionsRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isOptionsInView = useInView(optionsRef, { once: true, margin: "-100px" });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };
  
  useEffect(() => {
    const foundService = services.find(s => s.href === slug);
    console.log('Looking for service with slug:', slug);
    console.log('Found service:', foundService);
    setService(foundService);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) { // Reduced threshold for easier testing
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">Service not found</h1>
          <p className="mb-4">Looking for: {slug}</p>
          <Link href="/" className="text-white hover:underline">
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
      <RightParallax service={service} />

      {/* Full Width Content Section - appears when image is full width */}
      {(isFullWidth || true) && ( // Temporarily always show for testing
        <motion.div 
          className="w-full bg-white py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-8">
            {/* Features Section */}
            <motion.div 
              ref={featuresRef}
              className="mb-16"
              variants={staggerContainer}
              initial="hidden"
              animate={isFeaturesInView ? "visible" : "hidden"}
            >
              <motion.h2 
                variants={fadeUpVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-bold text-primary mb-8 text-center"
              >
                {service.features.title}
              </motion.h2>
              
              <motion.div 
                className="grid md:grid-cols-3 gap-8 mb-12"
                variants={staggerContainer}
              >
                {service.features.images.map((img: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    variants={imageVariants}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {service.features.features.map((feature: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Options Section */}
            <motion.div
              ref={optionsRef}
              variants={staggerContainer}
              initial="hidden"
              animate={isOptionsInView ? "visible" : "hidden"}
            >
              <motion.h2 
                variants={fadeUpVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-bold text-primary mb-8 text-center"
              >
                Service Options
              </motion.h2>
              
              <motion.div 
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {service.options.map((option: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-6 text-center"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div
                      variants={imageVariants}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Image
                        src={option.image}
                        alt={option.title}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {option.description}
                    </p>
                    <div className="text-2xl font-bold text-primary">
                      {option.price}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
