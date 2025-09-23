"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";


export default function FeaturedServices() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    useEffect( () => {
        const lenis = new Lenis()
    
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
    
        requestAnimationFrame(raf)
    }, [])
    
    return (
        <div ref={container} className="relative z-10 w-full flex justify-center py-20">
            <div className="flex flex-wrap justify-center gap-8">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                    style={{scale}} 
                        key={i}
                        // animate={isInView ? { scale: 1, opacity: 1 } : {}}
                     //   transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                        className="flex items-center justify-center bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg"
                    >
                        Content
                    </motion.div>
                ))}
            </div>
        </div>
    );
}