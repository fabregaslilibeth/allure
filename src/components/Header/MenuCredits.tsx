import { motion } from "framer-motion";
import { slideUp } from "@/lib/anim";

const credits = [
  { label: "Made by", value: "Studio Lumio" },
  { label: "Typography", value: "Google Fonts" },
  { label: "Images", value: "Freepik, Envato" },
  { label: "", value: "Privacy Policy · Terms & Conditions" },
];

export default function MenuCredits() {
  return (
    <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-primary/15 py-4 text-xs uppercase">
      {credits.map(({ label, value }) => (
        <p key={value} className="overflow-hidden">
          <motion.span className="block" variants={slideUp} initial="initial" animate="enter" exit="exit">
            {label && <span className="opacity-60">{label}: </span>}
            {value}
          </motion.span>
        </p>
      ))}
    </div>
  );
}
