import Link from "next/link";
import { navLinks } from "@/data/links";
import { services } from "@/data/services";
import type { NavLink } from "@/types";

const treatmentLinks: NavLink[] = services.map((service) => ({
  title: service.title,
  href: `/services/${service.slug}`,
}));

export default function SiteFooter() {
  return (
    <footer className="border-t border-secondary/10 bg-primary px-4 pb-8 pt-20 text-secondary md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-4xl tracking-[0.3em] md:text-5xl">
            Allure
          </Link>
          <p className="mt-4 max-w-sm font-body text-base leading-relaxed opacity-80">
            Where beauty meets intention: personalised care in a serene sanctuary.
          </p>
        </div>
        <FooterColumn title="Explore" links={navLinks} />
        <FooterColumn title="Treatments" links={treatmentLinks} />
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-2 border-t border-secondary/20 pt-6 text-xs uppercase tracking-[0.2em] opacity-70 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Allure</p>
        <p>Privacy Policy · Terms &amp; Conditions</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] opacity-60">{title}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm transition-opacity hover:opacity-60">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
