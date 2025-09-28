'use client';
import { useRef, useEffect } from "react";
import styles from './style.module.css';
import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

const word = "with framer-motion";

export default function Index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })

    
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

},[])

    const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -550]);

    const images = [
        {
            src: 'https://cdn.pixabay.com/photo/2019/04/22/04/32/blue-4145659_1280.jpg',
            y: 0,
            color: 'red'
        },
        {
            src: 'https://cdn.pixabay.com/photo/2019/04/22/04/32/blue-4145659_1280.jpg',
            y: lg,
            color: 'blue'
        },
        {
            src: 'https://cdn.pixabay.com/photo/2019/04/22/04/32/blue-4145659_1280.jpg',
            y: md,
            color: 'green'
        }
    ];

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.body}>
                <motion.h1 style={{y: sm}}>Parallax</motion.h1>
                <h1>Scroll</h1>
                <div className={styles.word}>
                    <p>
                        {
                            word.split("").map((letter, i) => {
                                const y = useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25])
                                return <motion.span style={{top: y}} key={`l_${i}`} >{letter}</motion.span>
                            })
                        }
                    </p>
                </div>
            </div>
            <div className={styles.images}>
                {
                    images.map( ({src, y, color}, i) => {
                        return <motion.div style={{y}} key={`i_${i}`} className={styles.imageContainer}>
                            {/* <Image 
                                src={src}
                                placeholder="blur"
                                alt="image"
                                fill
                            /> */}
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}