import Link from "next/link";
import { motion } from "framer-motion";
import { dimmed } from "@/lib/anim";
import type { Service } from "@/types";

type Props = {
  services: Service[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
  onNavigate: () => void;
};

export default function ServiceLinks({ services, activeIndex, onHover, onNavigate }: Props) {
  return (
    <ul className="mt-2 border-t border-primary/15 lg:mt-16" onMouseLeave={() => onHover(null)}>
      {services.map((service, index) => (
        <motion.li
          key={service.slug}
          variants={dimmed}
          initial={false}
          animate={activeIndex !== null && activeIndex !== index ? "dim" : "clear"}
        >
          <Link
            href={`/services/${service.slug}`}
            onClick={onNavigate}
            onMouseEnter={() => onHover(index)}
            onFocus={() => onHover(index)}
            onBlur={() => onHover(null)}
            className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-primary/15 py-3 uppercase md:text-xl lg:grid-cols-[4rem_1fr_auto] lg:text-[2vw] lg:leading-tight"
          >
            <span className="text-sm opacity-60 lg:text-base">{service.id}</span>
            <span>{service.title}</span>
            <span className="text-xs tracking-[0.2em] opacity-60 lg:text-sm">{service.category}</span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
