import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/#services" },
  { title: "About", href: "/#about" },
  { title: "Locations", href: "/#find-us" },
  { title: "FAQ", href: "/#faq" },
  { title: "Appointments", href: "/appointment" },
];

export const appointmentHref = "/appointment";

/** Booking link with the treatment preselected. */
export const bookServiceHref = (slug: string) => `${appointmentHref}?service=${slug}`;
