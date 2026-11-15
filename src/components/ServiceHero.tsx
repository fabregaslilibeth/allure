"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { bookServiceHref } from "@/data/links";
import type { ServiceSummary } from "@/types";
import Button from "./Button";

const BACKGROUND_VIDEO = "https://cdn.pixabay.com/video/2025/01/13/252435_large.mp4";

/**
 * Opens as video (left) + photo (right). On scroll the photo widens to
 * full-bleed and fades back while the service copy slides in over it.
 */
export default function ServiceHero({ service }: { service: ServiceSummary }) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const imageWidth = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.65, 0.3]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  const contentX = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6], [0, 0.3, 1]);

  return (
    <section ref={container} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
          <video autoPlay loop muted playsInline aria-hidden className="h-full w-full object-cover">
            <source src={BACKGROUND_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-primary/25 to-primary/35" />
          <div className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-center px-6 md:px-12">
            <p aria-hidden className="break-words text-4xl leading-tight text-white/20 md:text-9xl">
              {service.title}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-0 z-10 overflow-hidden"
          style={{ width: imageWidth, opacity: imageOpacity }}
        >
          <Image src={service.image} alt={service.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20 flex items-center"
          style={{ x: contentX, opacity: contentOpacity }}
        >
          <p className="absolute left-16 top-1/2 hidden -translate-y-1/2 -rotate-90 text-sm uppercase tracking-[0.3em] opacity-70 md:block">
            {service.category}
          </p>

          <div className="max-w-3xl px-6 md:pl-24 md:pr-16">
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <span className="text-lg">{service.id}</span>
              <span className="border border-primary px-3 py-1.5 text-xs uppercase tracking-widest">
                {service.category}
              </span>
            </div>
            <h1 className="mb-6 text-3xl leading-none sm:text-6xl md:mb-8 md:text-8xl">{service.title}</h1>
            <p className="mb-6 max-w-md text-lg md:text-xl">{service.tagline}</p>
            {service.byline && (
              <p className="max-w-md font-body text-base leading-relaxed opacity-90 md:text-lg">{service.byline}</p>
            )}
            <Button href={bookServiceHref(service.slug)} className="mt-8">
              Book this treatment
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
