"use client";

import { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { assistant } from '@/fonts/index';

interface RightParallaxProps {
    service: {
        id: string;
        title: string;
        brand: string;
        tagline: string;
        byline?: string;
        src: string;
    };
}

export default function RightParallax({service}: RightParallaxProps) {
    console.log('RightParallax received service:', service);
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const width = useTransform(scrollYProgress, [0, 1], ['50vw', '100vw']);
    const height = useTransform(scrollYProgress, [0, 1], ['100vh', '100vh']);
    const rectangleY = useTransform(scrollYProgress, [0, 1], ['-50%', '0vh']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.65, 0.3]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6], [0, 0.3, 1]);

    useEffect( () => {
        const lenis = new Lenis()
    
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
    
        requestAnimationFrame(raf)
    
    },[])

    return (
        <div ref={container} className='h-[200vh] relative'>
            <div className='sticky top-0 overflow-hidden h-screen'>
                {/* Background Image */}
                <motion.div className='w-full h-full top-0 absolute flex items-center justify-end'>
                    <motion.div 
                        className='relative overflow-hidden'
                        style={{width, height, opacity}}
                    >
                        <Image
                            src={`/images${service.src}`}
                            fill
                            alt={service.title}
                            quality={95}
                            priority
                            sizes="100vw"
                            style={{objectFit: 'cover', objectPosition: 'center'}}
                        />
                        {/* Subtle gradient overlay for depth */}
                        <div className='absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent' />
                    </motion.div>
                </motion.div>
                
                {/* Content Overlay */}
                <motion.div className='absolute inset-0 flex items-center text-primary' style={{ x: rectangleY, opacity: textOpacity }}>
                    {/* Vertical Side Text */}
                    <div className='absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center'>
                        <p className='text-sm font-light tracking-[0.3em] uppercase opacity-70'>{service.brand}</p>
                    </div>

                    {/* Main Content */}
                    <div className='pl-24 pr-16 max-w-3xl'>
                        {/* ID and Brand Tag */}
                        <div className='flex items-center gap-3 mb-8'>
                            <span className='text-lg font-light'>{service.id}</span>
                            <span className='text-xs font-light tracking-widest uppercase border border-primary px-3 py-1.5'>
                                {service.brand}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className='text-6xl md:text-8xl font-light leading-none mb-8'>
                            {service.title}
                        </h1>

                        {/* Tagline */}
                        <h2 className='text-lg md:text-xl font-light mb-6 max-w-md'>
                            {service.tagline}
                        </h2>

                        {/* Description */}
                        {service.byline && (
                            <p className='text-sm md:text-base font-light leading-relaxed max-w-md opacity-90'>
                                <span className={assistant.className}>{service.byline}</span>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}