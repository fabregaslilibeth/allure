import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { visitExpectations } from "@/data/booking";
import { bookableOptions } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Make an appointment",
  description: "Request a treatment or skin consultation at Allure.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function AppointmentPage({ searchParams }: Props) {
  // Service pages link here with ?service=<slug> to preselect the treatment.
  const { service } = await searchParams;
  const initialService =
    typeof service === "string" && bookableOptions.some((option) => option.slug === service) ? service : "";

  return (
    <div className="px-4 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] opacity-70">Appointments</p>
          <h1 className="mt-3 text-4xl md:text-6xl">Make an appointment</h1>
          <p className="mt-5 font-body text-lg leading-relaxed opacity-80">
            Choose a treatment and a time that suits you. We&apos;ll confirm your visit by email.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <BookingForm initialService={initialService} />

          <aside className="flex flex-col gap-8 lg:order-first lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/allure-2.avif"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl">What to expect</h2>
              <ol className="mt-5 flex flex-col gap-5">
                {visitExpectations.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 font-body text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm tracking-wider">{item.title}</p>
                      <p className="mt-1 font-body text-base leading-relaxed opacity-80">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="font-body text-base opacity-80">
              Have a question first?{" "}
              <Link href="/#faq" className="underline underline-offset-4">
                Read the FAQ
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
