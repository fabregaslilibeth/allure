"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

export default function ScrollParallax() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

},[])

  const images = [
    {
      src: "https://cdn.pixabay.com/photo/2023/04/10/19/42/sea-7914544_640.jpg",
      y: 0,
      width: '25vw',
      height: '60vh',
      zIndex: 1
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_1280.jpg",
      y: lg,
      left: '55vw',
      top: '15vh',
      height: '40vh',
      width: '30vh',
      zIndex: 2,
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/04/22/04/32/blue-4145659_1280.jpg",
      y: md,
      left: '27.5vw',
      top: '40vh',
      height: '25vh',
      width: '20vh',
      zIndex: 3,
    },
  ];

  return (
    <div ref={container} className="container mt-[50vh] min-h-[200vh]">
    <div className="sticky top-0 overflow-hidden h-[50vh]"></div>
      <div className="body ml-[10vw]">
         <h1 className="m-0 mt-[10px] text-6xl" >Scroll</h1>
      </div>
      <div className="images flex w-full justify-center relative">
        {images.map(({ src, y, left, top, height, width, zIndex }, i) => {
          return (
            <motion.div key={`i_${i}`} className="imageContainer absolute" 
             style={{ y, width: width, height: height, zIndex: zIndex, ...(left && {left}), ...(top && {top})}}
            >
              <Image
                src={src}
                placeholder="blur"
                alt="image"
                blurDataURL={src}
                fill
                style={{objectFit: 'cover'}}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
