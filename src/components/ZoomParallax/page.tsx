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

    const width = useTransform(scrollYProgress, [0, 1], ['20vw', '100vw']);
    const height = useTransform(scrollYProgress, [0, 1], ['50vw', '100vh']);
    const rectangleY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);

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
                {/* Background Image */}
                <motion.div className='w-full h-full top-0 absolute flex items-center justify-center'>
                    <motion.div 
                        className='relative'
                        style={{width, height}}
                    >
                        <Image
                            src='/images/allure-2.avif'
                            fill
                            alt="image"
                            placeholder='blur'
                            blurDataURL='https://cdn.pixabay.com/photo/2025/08/20/11/11/ai-generated-9785435_1280.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </motion.div>
                </motion.div>
                
                {/* Overlay Rectangle */}
                <motion.div className='absolute inset-0 flex items-center justify-center text-primary' style={{ y: rectangleY }}>
                    <div className='relative w-[80%] h-[70%] max-w-2xl'>
                        {/* Transparent top section for eyes */}
                        <div className='absolute top-0 left-0 right-0 h-[45%] bg-transparent border-12 border-secondary rounded-t-lg'>
                            {/* This section is transparent to show the eyes */}
                        </div>
                        
                        {/* Solid bottom section with content */}
                        <div className='absolute bottom-0 left-0 right-0 h-[55%] bg-secondary border border-secondary rounded-b-lg flex flex-col items-center justify-center p-8 space-y-4'>
                            <h2 className='text-sm font-light tracking-wider'>EVERHOUSE</h2>
                            <h1 className='text-2xl md:text-3xl font-light text-center leading-tight'>
                                YOUR MOMENT OF GLOW<br />
                                BEGINS HERE
                            </h1>
                            <p className='text-sm text-center max-w-md leading-relaxed'>
                                Let's make this about you. A quiet moment for thoughtful treatments designed to restore balance and highlight your natural charm. Because feeling good starts here.
                            </p>
                            <button className='bg-secondary text-[#8C8277] px-6 py-3 rounded-md font-medium hover:bg-[#D4CCC0] transition-colors'>
                                FIND US
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}