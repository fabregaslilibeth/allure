import Image from "next/image";
import { motion } from "framer-motion";
import type { Service } from "@/types";

/** Preview of the hovered service (desktop only). */
export default function NavImage({ service, visible }: { service: Service; visible: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="relative hidden aspect-[10/7] w-full max-w-[500px] overflow-hidden lg:block"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
    >
      <Image src={service.image} alt="" fill sizes="500px" className="object-cover" />
    </motion.div>
  );
}
