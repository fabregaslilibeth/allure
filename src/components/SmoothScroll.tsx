"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/** The site's single Lenis instance; `root` makes it drive window scrolling. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, anchors: { offset: -80 } }}>
      {children}
    </ReactLenis>
  );
}
