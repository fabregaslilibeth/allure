"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";
import { appointmentHref } from "@/data/links";
import { cn } from "@/lib/cn";
import Button from "./Button";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  return (
    <section id="faq" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[2fr_3fr] md:gap-20">
        <div id="contact" className="flex flex-col items-start gap-5 md:sticky md:top-28 md:self-start">
          <h2 className="text-3xl md:text-4xl">Frequently asked questions</h2>
          <p className="font-body text-base leading-relaxed opacity-80 md:text-lg">
            Didn&apos;t find the answer to your question? Send it with your appointment request and we&apos;ll be happy
            to help.
          </p>
          <Button href={appointmentHref}>Contact</Button>
        </div>

        <ul className="divide-y divide-primary/15 border-y border-primary/15">
          {faqs.map((item, index) => {
            const isOpen = openItems.includes(index);
            const panelId = `${baseId}-${index}`;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-base md:text-lg"
                  >
                    {item.question}
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.5}
                      className={cn("size-5 shrink-0 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-body text-base leading-relaxed opacity-80 md:text-lg">
                        {item.answer}
                        {item.link && (
                          <>
                            {" "}
                            <Link href={item.link.href} className="underline underline-offset-4">
                              {item.link.label}
                            </Link>
                            .
                          </>
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
