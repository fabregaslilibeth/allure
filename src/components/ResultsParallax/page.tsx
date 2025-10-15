"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ResultsParallaxProps {
  images: string[]; // Just pass an array of image URLs
  title?: string;
  bgColorWhenVisible?: string;
  textColorWhenVisible?: string;
  minHeight?: string;
}

export default function ResultsParallax({ 
  images, 
  title = "Results",
  bgColorWhenVisible = "bg-primary",
  textColorWhenVisible = "text-white",
  minHeight = "500vh"
}: ResultsParallaxProps) {
  const container = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest >= 0.10);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Define parallax speeds
  const medium = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const faster = useTransform(scrollYProgress, [0, 1], [0, -1600]);
  const fastest = useTransform(scrollYProgress, [0, 1], [0, -2300]);

  // Predefined layouts for up to 6 images
  const layoutConfigs = [
    { y: medium, left: '10.5vw', bottom: '0vh', width: '25vw', height: '60vh', zIndex: 1, opacity: 0.4 },
    { y: fast, left: '5.5vw', bottom: '-80vh', width: '25vw', height: '60vh', zIndex: 2, opacity: 1 },
    { y: faster, left: '15vw', bottom: '-40vh', height: '55vh', width: '40vh', zIndex: 3, opacity: 1 },
    { y: medium, left: '75vw', bottom: '0vh', height: '60vh', width: '50vh', zIndex: 1, opacity: 0.5 },
    { y: fastest, left: '65vw', bottom: '-70vh', height: '40vh', width: '30vh', zIndex: 3, opacity: 1 },
    { y: fast, left: '80vw', bottom: '-80vh', height: '45vh', width: '45vh', zIndex: 2, opacity: 1 },
  ];

  // Map images to layout configurations
  const enhancedImages = images.map((src, index) => ({
    src,
    ...layoutConfigs[index % layoutConfigs.length]
  }));

  return (
    <div ref={container} className={`relative w-full transition-colors duration-500 ease-in-out ${isVisible ? `${bgColorWhenVisible} ${textColorWhenVisible}` : 'text-primary'}`} style={{ minHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="images flex w-full justify-center relative h-full">
        {enhancedImages.map(({ src, y, left, bottom, height, width, zIndex, opacity }, i) => {
          return (
            <motion.div 
              key={`i_${i}`} 
              className="imageContainer absolute" 
              style={{
                y,
                width: width,
                height: height,
                zIndex: zIndex,
                transformOrigin: 'center',
                ...(left && {left}),
                ...(bottom && {bottom})
              }}
              initial={{ 
                opacity: 0, 
                scale: 0
              }}
              whileInView={{ 
                opacity: opacity, 
                scale: 1
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.1
              }}
              viewport={{ 
                once: true, 
                margin: "-100px"
              }}
            >
              <Image
                src={src}
                placeholder="blur"
                alt={`Result image ${i + 1}`}
                blurDataURL={src}
                fill
                style={{objectFit: 'cover'}}
              />
            </motion.div>
          );
        })}
        {title && (
          <div className="w-full md:w-1/2 mx-auto flex items-center justify-center z-10 text-center">
            <h1 className="text-9xl font-light">{title}</h1>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

