import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Size = "small" | "medium" | "large";

const sizes: Record<Size, string> = {
  small: "px-4 py-2 text-xs",
  medium: "px-8 py-3.5 text-sm",
  large: "px-10 py-4 text-base",
};

type Props = {
  children: ReactNode;
  size?: Size;
  className?: string;
  /** Renders a link instead of a button. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  children,
  size = "medium",
  className,
  href,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary uppercase tracking-[0.15em] text-white shadow-md transition duration-300",
    "hover:-translate-y-0.5 hover:bg-[#4b2b5b] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-60",
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
