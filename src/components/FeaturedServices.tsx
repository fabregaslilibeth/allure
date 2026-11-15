"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { services } from "@/data/services";

// The clip runs on the tile's child: an IntersectionObserver never reports a
// fully clipped target, so the observed <li> itself must stay unclipped.
const reveal: Variants = {
  hidden: { clipPath: "inset(0% 50% 0% 50%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.6, ease: "easeOut" } },
};

const label: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
};

export default function FeaturedServices() {
  return (
    <section id="services" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] opacity-70">Our treatments</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Featured services</h2>
        </div>
        <p className="max-w-sm font-body text-base opacity-80 md:text-lg">
          Treatments matched to your skin and goals, delivered with a gentle touch.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {services.map((service, index) => (
          <motion.li
            key={service.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            // Staggered drop on desktop, as in the original layout.
            style={{ "--offset": `${index * 5}vh` } as CSSProperties}
            className="lg:mt-[var(--offset)]"
          >
            <Link href={`/services/${service.slug}`} className="group block">
              <motion.div variants={reveal} className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/30 transition-colors duration-500 group-hover:bg-primary/15" />
                <motion.p
                  variants={label}
                  className="absolute inset-0 flex items-center justify-center p-4 text-center text-lg leading-snug text-white md:text-2xl"
                >
                  {service.title}
                </motion.p>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
