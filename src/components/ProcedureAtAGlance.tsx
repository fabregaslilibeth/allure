"use client";

import { motion, type Variants } from "framer-motion";
import { CircleCheck, Clock, Layers, Timer, type LucideIcon } from "lucide-react";
import type { ServiceGlance } from "@/types";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function ProcedureAtAGlance({ glance }: { glance: ServiceGlance }) {
  const items: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Clock, title: "Procedure time", text: glance.procedureTime },
    { icon: Layers, title: "Treatments", text: glance.treatments },
    { icon: CircleCheck, title: "Results", text: glance.results },
    { icon: Timer, title: "Recovery time", text: glance.recoveryTime },
  ];

  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="mb-14 text-center text-3xl tracking-wider md:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
        >
          Procedure at a glance
        </motion.h2>

        <motion.ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(({ icon: Icon, title, text }) => (
            <motion.li key={title} variants={item}>
              {/* Hover lift lives on this inner box so it doesn't fight the motion transform. */}
              <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white/60 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary text-secondary transition-colors duration-300 group-hover:bg-tertiary group-hover:text-primary">
                  <Icon aria-hidden className="size-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-lg tracking-wider">{title}</h3>
                <p className="font-body text-base leading-relaxed opacity-80">{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
