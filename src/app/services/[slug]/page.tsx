import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ParallaxGallery from "@/components/ParallaxGallery";
import ProcedureAtAGlance from "@/components/ProcedureAtAGlance";
import ServiceDetails from "@/components/ServiceDetails";
import ServiceHero from "@/components/ServiceHero";
import { galleryImages } from "@/data/gallery";
import { getService, services } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  return service ? { title: service.title, description: service.tagline } : {};
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  // Client components get their own plain objects, never ones shared with a
  // server component's props. In dev, React 19 re-sends server component props
  // as debug info, and a shared reference left the HTML render hanging
  // (Next 15.5 / React 19.1). Picking fields also keeps the client payload small.
  const { id, slug, title, category, tagline, byline, image } = service;

  return (
    <>
      <ServiceHero service={{ id, slug, title, category, tagline, byline, image }} />
      <ProcedureAtAGlance glance={{ ...service.glance }} />
      <ServiceDetails service={service} />
      {/* Stock imagery, so not labelled as treatment results. */}
      <ParallaxGallery images={galleryImages} title="In good hands" />
    </>
  );
}
