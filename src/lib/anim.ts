import type { Variants } from "framer-motion";

export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

const slow = { duration: 1, ease: easeInOutQuart };

/** Solid panel that drops down behind the open menu. */
export const menuPanel: Variants = {
  closed: { height: 0, transition: slow },
  open: { height: "100vh", transition: slow },
};

/** Menu content wrapper. */
export const menuContent: Variants = {
  initial: { height: 0 },
  enter: { height: "auto", transition: slow },
  exit: { height: 0, transition: slow },
};

/** Softens the menu rows that are not being hovered. */
export const dimmed: Variants = {
  clear: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
  dim: { filter: "blur(2px)", opacity: 0.5, transition: { duration: 0.3 } },
};

/** Text that rises out of an overflow-hidden line. */
export const slideUp: Variants = {
  initial: { y: "100%", opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { ...slow, delay: 0.3 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.7, ease: easeInOutQuart } },
};
