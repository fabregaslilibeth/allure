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
  
  const slow = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const medium = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const reverse = useTransform(scrollYProgress, [0, 1], [0, 80]);

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
      src: "https://cdn.pixabay.com/photo/2023/05/30/17/20/woman-8029209_1280.jpg",
      y: 0,
      left: '17.5vw',
      top: '100vh',
      width: '25vw',
      height: '60vh',
      zIndex: 1
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_1280.jpg",
      y: slow,
      width: '25vw',
      height: '60vh',
      zIndex: 1,
      background: 'white'
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/09/02/13/02/boho-7427541_1280.jpg",
      y: fast,
      left: '55vw',
      top: '15vh',
      height: '40vh',
      width: '30vh',
      zIndex: 2,
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_1280.jpg",
      y: reverse,
      right: '5vw',
      top: '15vh',
      height: '40vh',
      width: '30vh',
      zIndex: 2,
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/04/22/04/32/blue-4145659_1280.jpg",
      y: medium,
      left: '15vw',
      top: '0vh',
      height: '25vh',
      width: '20vh',
      zIndex: 3,
    },
  ];

  return (
    <div ref={container} className="relative mt-[50vh] min-h-[200vh] w-full">
    <div className="sticky top-0 overflow-hidden h-[50vh]"></div>
      <div className="images flex w-full justify-center relative bg-red-500 z-10">
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
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10">{i}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
