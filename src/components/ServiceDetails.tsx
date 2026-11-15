import type { ReactNode } from "react";
import { bookServiceHref } from "@/data/links";
import type { Service } from "@/types";
import Button from "./Button";

/** Benefits, the appointment itself, aftercare, precautions and sources. */
export default function ServiceDetails({ service }: { service: Service }) {
  if (process.env.BISECT !== "x") return <p>bisect-null</p>;
  return (
    <>
      <section className="border-t border-primary/10 px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Intro eyebrow="Benefits" title="What it can help with" />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit.title} className="border-t border-primary/15 pt-5">
                <h3 className="text-lg tracking-wider">{benefit.title}</h3>
                <p className="mt-2 font-body text-base leading-relaxed opacity-80">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white/40 px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Intro eyebrow="Your visit" title="What happens on the day" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.visit.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-body text-sm text-secondary">
                  {index + 1}
                </span>
                <h3 className="text-lg tracking-wider">{step.title}</h3>
                <p className="font-body text-base leading-relaxed opacity-80">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <ListCard title="Aftercare" items={service.aftercare} />
            <ListCard title="We'll postpone or adjust treatment if you" items={service.precautions} />
          </div>

          {service.note && (
            <aside className="mt-6 flex gap-4 rounded-2xl border border-primary/20 bg-tertiary/25 p-6 md:p-8">
              {/* BISECT <Info aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} /> */}
              <p className="font-body text-base leading-relaxed">{service.note}</p>
            </aside>
          )}

          <div className="mt-16 flex flex-col items-start gap-6 border-t border-primary/15 pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl">Ready to book {service.title}?</h2>
              <p className="mt-2 font-body text-base opacity-80">
                Not sure it&apos;s right for you? Book a skin consultation first.
              </p>
            </div>
            {false && (
              <Button href={bookServiceHref(service.slug)} className="shrink-0">
                Book this treatment
              </Button>
            )}
          </div>

          <div className="mt-12 font-body text-sm opacity-75">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Sources</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {service.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl">
              General information only. Results and recovery vary, and your practitioner will advise you at your
              consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Intro({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] opacity-70">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white/60 p-6 shadow-sm md:p-8">
      <h3 className="text-lg tracking-wider">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 font-body text-base leading-relaxed">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
