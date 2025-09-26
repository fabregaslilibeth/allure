"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "./style.css";
import { services } from "@/data/services";

const anim = {
  initial: { width: 0, height: 0 },
  open: {
    width: "auto",
    height: '35vh',
  },
  closed: { 
    width: 0, 
    height: '35vh',
  },
};

export default function Home() {
  return (
    <main className="min-h-[60vh] flex items-center">
      <div className="w-full flex gap-4">
        {services.slice(0, 5).map((service, index) => {
          return <Project service={service} key={index} index={index}/>;
        })}
      </div>
    </main>
  );
}

interface Service {
  id: string;
  title: string;
  background: string;
}

const Project = ({ service, index }: { service: Service, index: number }) => {
  const [isActive, setIsActive] = useState(false);
  const { title, background } = service;
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

},[])

  useEffect(() => {
    const currentRef = projectRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before the element is fully in view
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={projectRef}
      className="flex justify-center items-center w-full"
      style={{
        marginTop: 5 * index + "vh"
      }}
    >
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative border border-[#CFE3D6] shadow-lg"
      >
         <img src={background} alt={title} className="w-full h-full object-cover" style={{ objectFit: "cover" }}></img>
         <div className="absolute inset-0 bg-[#7a6047] opacity-20"></div>
          <div className="absolute inset-0 flex justify-center items-center px-4">
            <motion.p 
              className="text-white text-2xl font-bold text-center"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {title}
            </motion.p>
          </div>
      </motion.div>
    </div>
  );
};
