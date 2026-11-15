export interface NavLink {
  title: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional link rendered after the answer text. */
  link?: { label: string; href: string };
}

/** Facts shown in the "Procedure at a glance" band. */
export interface ServiceGlance {
  procedureTime: string;
  treatments: string;
  results: string;
  recoveryTime: string;
}

export interface ServiceFact {
  title: string;
  description: string;
}

export interface Source {
  label: string;
  href: string;
}

export interface Service {
  /** Display number, e.g. "001". */
  id: string;
  /** URL segment under /services. */
  slug: string;
  title: string;
  category: string;
  tagline: string;
  byline: string;
  /** Path under /public. */
  image: string;
  glance: ServiceGlance;
  /** What the treatment is used for. */
  benefits: ServiceFact[];
  /** Steps of an appointment, in order. */
  visit: ServiceFact[];
  aftercare: string[];
  /** Reasons to postpone or adjust treatment. */
  precautions: string[];
  /** Important caveat shown as a callout. */
  note?: string;
  /** Where the treatment facts come from. */
  sources: Source[];
}
