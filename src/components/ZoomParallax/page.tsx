"use client";

import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

export default function Index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    useEffect( () => {
        const lenis = new Lenis()
    
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
    
        requestAnimationFrame(raf)
    
    },[])

    return (
        <div ref={container} className='h-[200vh] relative'>
            <div className='sticky top-0 overflow-hidden h-screen'>
                <motion.div style={{scale}} className='w-full h-full top-0 absolute flex items-center justify-center'>
                    <div className='relative w-[25vw] h-[25vw]'>
                        <Image
                            src='https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg'
                            fill
                            alt="image"
                            placeholder='blur'
                            blurDataURL='https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}