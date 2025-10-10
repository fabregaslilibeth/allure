"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollParallax() {
  const container = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // When scrollYProgress is 0.1 (10% through the scroll), the container is 10% visible
      setIsVisible(latest >= 0.10);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);
  
  const medium = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const faster = useTransform(scrollYProgress, [0, 1], [0, -1600]);
  const fastest = useTransform(scrollYProgress, [0, 1], [0, -2300]);

  const images = [
    {
      src: "https://cdn.pixabay.com/photo/2023/05/30/17/20/woman-8029209_1280.jpg",
      y: medium,
      left: '10.5vw',
      bottom: '0vh',
      width: '25vw',
      height: '60vh',
      zIndex: 1,
      color: 'red',
      opacity: 0.4
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/11/14/23/17/yoga-8388879_1280.jpg",
      y: fast,
      left: '5.5vw',
      bottom: '-80vh',
      width: '25vw',
      height: '60vh',
      zIndex: 2,
      color: 'blue',
      opacity: 1
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/11/14/23/18/beauty-8388881_1280.jpg",
      y: faster,
      left: '15vw',
      bottom: '-40vh',
      height: '55vh',
      width: '40vh',
      zIndex: 3,
      color: 'purple',
      opacity: 1
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/10/20/18/37/branch-7535534_1280.jpg",
      y: medium,
      left: '75vw',
      bottom: '0vh',
      height: '60vh',
      width: '50vh',
      zIndex: 1,
      color: 'green',
      opacity: 0.5
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/03/27/13/40/ai-generated-8659157_640.jpg",
      y: fastest,
      left: '65vw',
      bottom: '-70vh',
      height: '40vh',
      width: '30vh',
      zIndex: 3,
      color: 'yellow',
      opacity: 1
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/09/22/03/51/beautiful-8267949_1280.jpg",
      y: fast,
      left: '80vw',
      bottom: '-80vh',
      height: '45vh',
      width: '45vh',
      zIndex: 2,
      color: 'pink',
      opacity: 1
    },
  ];

  return (
    <div ref={container} className={`relative min-h-[500vh] w-full transition-colors duration-500 ease-in-out ${isVisible ? 'bg-primary text-white' : 'text-primary'}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="images flex w-full justify-center relative h-full">
        {images.map(({ src, y, left, bottom, height, width, zIndex, color, opacity }, i) => {
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
                ...(bottom && {bottom}),
                ...(color && {backgroundColor: color})
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
                delay: i * 0.1 // Stagger the animations
              }}
              viewport={{ 
                once: true, 
                margin: "-100px" // Trigger when 100px before entering viewport
              }}
            >
              <Image
                src={src}
                placeholder="blur"
                alt="image"
                blurDataURL={src}
                fill
                style={{objectFit: 'cover'}}
              />
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 flex items-center justify-center text-white text-2xl font-bold">{i + 1}</div> */}
            </motion.div>
          );
        })}
        <div className="w-full md:w-1/2 mx-auto flex items-center justify-center z-10 text-center">
          <h1 className="text-9xl font-light">Science with a Gentle Touch</h1>
        </div>
        </div>
      </div>
    </div>
  );
}
