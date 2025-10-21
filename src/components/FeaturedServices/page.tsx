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
    height: "35vh",
  },
  closed: {
    width: 0,
    height: "35vh",
  },
};

const categories = [
  {
    title: "Face",
    background: "https://cdn.pixabay.com/photo/2023/04/16/07/09/forms-7929260_1280.jpg",
  },
  {
    title: "Body",
    background: "https://cdn.pixabay.com/photo/2023/11/24/18/52/cat-8410502_1280.jpg",
  },
  {
    title: "Skin",
    background: "https://cdn.pixabay.com/photo/2023/01/07/10/02/leaves-7702922_1280.jpg",
  },
  {
    title: "For Men",
    background: "https://cdn.pixabay.com/photo/2023/05/14/09/39/circle-7992340_1280.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-[60vh] flex items-center overflow-hidden">
      <div className="w-full flex gap-4">
        {categories.slice(0, 5).map((category, index) => {
          return <Project category={category} key={index} index={index} />;
        })}
      </div>
    </main>
  );
}

interface Category {
  id: string;
  title: string;
  background: string;
}

const Project = ({ category, index }: { category: Category; index: number }) => {
  const [isActive, setIsActive] = useState(false);
  const { title, background } = category;
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

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
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before the element is fully in view
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
      className="min-w-[300px] flex flex-col justify-center items-center w-full overflow-hidden"
      style={{
        marginTop: 5 * index + "vh",
      }}
    >
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
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
              {title} zz
            </motion.p>
          </div>
      </motion.div>
    </div>
  );
};
