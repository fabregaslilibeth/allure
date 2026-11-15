import type { Service, Source } from "@/types";

// Treatment facts (timings, sessions, recovery, precautions) follow the sources
// listed on each service. Keep claims hedged ("usually", "often") as they are
// there: results and recovery vary from person to person.

const AAD_MICRONEEDLING: Source = {
  label: "American Academy of Dermatology: Microneedling",
  href: "https://www.aad.org/public/cosmetic/scars-stretch-marks/microneedling-fade-scars",
};

const AAD_PEELS: Source = {
  label: "American Academy of Dermatology: Chemical peels FAQs",
  href: "https://www.aad.org/public/cosmetic/younger-looking/chemical-peels-faqs",
};

const FDA_EXOSOMES: Source = {
  label: "U.S. FDA: Public safety notification on exosome products",
  href: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/public-safety-notification-exosome-products",
};

const MICRONEEDLING_AFTERCARE = [
  "Skip make-up for the first 24 hours so the tiny channels in your skin can close.",
  "Use only a gentle cleanser and moisturiser for a few days, and pause retinoids and exfoliating acids.",
  "Wear broad-spectrum sunscreen every day and keep out of direct sun while your skin is sensitive.",
  "Avoid workouts, saunas and swimming for a day or two.",
];

const MICRONEEDLING_PRECAUTIONS = [
  "Have active acne, a cold sore or any skin infection in the area.",
  "Are taking, or have recently taken, isotretinoin.",
  "Tend to form keloid or raised scars.",
  "Are pregnant.",
];

export const services: Service[] = [
  {
    id: "001",
    slug: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    category: "Face",
    tagline: "Non-ablative fractional laser for smoother texture and a more even tone",
    byline:
      "The laser heats thousands of microscopic columns in the deeper layers of the skin while leaving the surface intact, prompting your skin to build new collagen as it repairs.",
    image: "/images/services/rejuvenation.jpg",
    glance: {
      procedureTime: "30–45 minutes, plus time for numbing cream to work",
      treatments: "Usually a series of 2–4 sessions, spaced about a month apart",
      results:
        "Gradual. Texture and tone keep improving for weeks after each session as new collagen forms.",
      recoveryTime: "Redness and mild swelling for a few hours to a few days",
    },
    benefits: [
      { title: "Fine lines", description: "Softens fine lines by stimulating new collagen beneath the surface." },
      { title: "Rough texture", description: "Smooths uneven, dull-looking skin over a course of sessions." },
      { title: "Sun damage", description: "Fades sun spots and evens out patchy pigmentation." },
      { title: "Mild acne scars", description: "Can gradually improve shallow scarring with repeated treatments." },
    ],
    visit: [
      { title: "Consultation", description: "We check your skin and medical history and agree the right settings." },
      { title: "Numbing", description: "A topical anaesthetic cream is applied and left to take effect." },
      { title: "Laser", description: "The handpiece passes over your skin. Most people describe a warm, prickling feeling." },
      { title: "Cool and protect", description: "Your skin is cooled and finished with sunscreen." },
    ],
    aftercare: [
      "Expect warmth like a mild sunburn for a few hours.",
      "Skin can look slightly bronzed and feel rough for several days as treated cells flake away. Let them shed on their own.",
      "Keep your routine gentle and pause retinoids and exfoliating acids until your skin settles.",
      "Wear broad-spectrum sunscreen every day and avoid direct sun.",
    ],
    precautions: [
      "Have a fresh tan or recent sunburn.",
      "Have a cold sore, infection or open wound in the area.",
      "Are taking, or have recently taken, isotretinoin.",
      "Are pregnant.",
    ],
    sources: [
      { label: "Altru Health System: Laser resurfacing", href: "https://www.altru.org/health-library/procedures/laser-resurfacing" },
      {
        label: "Mayo Clinic Care Network: Laser resurfacing",
        href: "https://www.mymlc.com/health-information/tests-and-procedures/l/laser-resurfacing2/",
      },
    ],
  },
  {
    id: "002",
    slug: "biologique-recherche-facials",
    title: "Biologique Recherche Facials",
    category: "Face",
    tagline: "Bespoke facials built on the Biologique Recherche method",
    byline:
      "Every facial starts by assessing your skin as it is today, what the French brand calls your Skin Instant©, before moving through its three stages: diagnosis, preparation with Lotion P50, and targeted treatment.",
    image: "/images/services/facials.png",
    glance: {
      procedureTime: "About 60–90 minutes, depending on the protocol",
      treatments: "A one-off treat, or repeated every few weeks as part of a plan",
      results: "Skin often looks fresher straight away, and changes build with regular care.",
      recoveryTime: "None. Any tingling or flushing from the exfoliating lotion usually settles quickly.",
    },
    benefits: [
      { title: "Personalised", description: "Products and techniques are chosen for how your skin looks and feels on the day." },
      { title: "Gentle exfoliation", description: "Lotion P50 exfoliates, rebalances oiliness and helps keep the skin's natural acidity." },
      { title: "Hydration and glow", description: "Serums and masks are layered to address dehydration and dullness." },
      { title: "Facial massage", description: "Manual techniques are part of the treatment stage." },
    ],
    visit: [
      { title: "Diagnosis", description: "We look at your skin and ask about your routine, lifestyle and goals." },
      { title: "Preparation", description: "Cleansing, then Lotion P50 to exfoliate and prepare the skin." },
      { title: "Treatment", description: "Targeted serums, masks and massage chosen for your skin's needs." },
      { title: "Home routine", description: "Advice on what to use at home until your next visit." },
    ],
    aftercare: [
      "Keep your routine simple for the rest of the day.",
      "Avoid strong sun straight after exfoliation and wear sunscreen.",
    ],
    precautions: [
      "Have scratched, broken or irritated skin.",
      "Are using prescription retinoic acid (tretinoin), as Lotion P50 isn't used alongside it.",
    ],
    sources: [
      { label: "Biologique Recherche: The methodology", href: "https://www.biologique-recherche.com/en-us/pages/methodology" },
      { label: "Biologique Recherche: Lotion P50", href: "https://www.biologique-recherche.com/en-us/products/lotion-p50" },
    ],
  },
  {
    id: "003",
    slug: "exosomes-treatment",
    title: "Exosomes Treatment",
    category: "Face",
    tagline: "Microneedling paired with a topical exosome serum",
    byline:
      "Exosomes are tiny vesicles that cells use to pass signals to each other. In skin care they're applied as a serum, usually straight after microneedling. Early research is promising, but the evidence is still limited.",
    image: "/images/services/exosomes.jpg",
    glance: {
      procedureTime: "About 60–75 minutes, including numbing",
      treatments: "Often booked as a short course, with sessions spaced like microneedling (4–6 weeks apart)",
      results:
        "Microneedling builds collagen over weeks to months. Any added benefit from exosomes is still being studied.",
      recoveryTime: "As for microneedling: redness for a day or two, with minimal downtime",
    },
    benefits: [
      {
        title: "Texture and fine lines",
        description: "Microneedling stimulates collagen; the exosome serum is added as the skin begins to recover.",
      },
      {
        title: "Acne scarring",
        description: "Microneedling is an established option for acne scars. Exosomes are used here as an add-on.",
      },
      {
        title: "Tone and radiance",
        description: "Often chosen to help skin look brighter and more even, though evidence for exosomes is early.",
      },
    ],
    visit: [
      { title: "Consultation", description: "We review your skin, history and expectations before booking a course." },
      { title: "Numbing", description: "A topical anaesthetic cream is applied for comfort." },
      { title: "Microneedling", description: "A sterile microneedling pen treats the area." },
      { title: "Exosome serum", description: "The serum is applied to the freshly treated skin, then the skin is calmed." },
    ],
    aftercare: MICRONEEDLING_AFTERCARE,
    precautions: MICRONEEDLING_PRECAUTIONS,
    note: "No exosome product is FDA-approved, and the FDA has warned about unapproved exosome products marketed to treat diseases. At Allure, exosomes are used only as a topical skin-care serum and are never injected.",
    sources: [FDA_EXOSOMES, AAD_MICRONEEDLING],
  },
  {
    id: "004",
    slug: "microneedling",
    title: "Micro Needling",
    category: "Face & body",
    tagline: "Collagen induction therapy for texture, scars and tone",
    byline:
      "A pen with fine, sterile needles makes controlled micro-injuries in the skin. As it heals, your skin produces new collagen and elastin.",
    image: "/images/services/microneedling.jpeg",
    glance: {
      procedureTime: "About 60 minutes, including 20–30 minutes of numbing",
      treatments: "Usually 3–6 sessions, 4–6 weeks apart, then a maintenance session about once a year",
      results: "Some improvement within a few weeks. Full results usually take several months.",
      recoveryTime: "Minimal: redness, or darkening on deeper skin tones, that usually settles within 2–3 days",
    },
    benefits: [
      { title: "Acne and surgical scars", description: "Softens the look of scars as new collagen fills in the skin." },
      { title: "Fine lines and wrinkles", description: "Refines the skin's surface over a course of sessions." },
      { title: "Enlarged pores", description: "Can help pores look smaller as the skin firms." },
      { title: "Stretch marks", description: "Can make stretch marks less noticeable." },
    ],
    visit: [
      { title: "Consultation", description: "We check your skin and take photos so you can track progress." },
      { title: "Numbing", description: "A topical anaesthetic cream is applied for 20–30 minutes." },
      { title: "Treatment", description: "The pen is passed over each area. You'll feel vibration and light scratching." },
      { title: "Calm and protect", description: "A soothing serum and sunscreen finish the session." },
    ],
    aftercare: MICRONEEDLING_AFTERCARE,
    precautions: MICRONEEDLING_PRECAUTIONS,
    sources: [AAD_MICRONEEDLING],
  },
  {
    id: "005",
    slug: "chemical-peels",
    title: "Chemical Peels",
    category: "Face",
    tagline: "Light to medium peels that renew the skin's surface",
    byline:
      "A chemical solution removes the outer layers of skin in a controlled way, revealing smoother, more even skin as it heals. We match the strength of the peel to your skin and goals.",
    image: "/images/services/chemical-peels.jpg",
    glance: {
      procedureTime: "About 30 minutes",
      treatments: "Light peels: a series of 3–5, every 2–5 weeks. Medium peels are repeated far less often.",
      results: "Light peels brighten the skin; texture and tone improve over the series.",
      recoveryTime: "Light peels: 1–7 days of redness and flaking. Medium peels: 7–14 days.",
    },
    benefits: [
      { title: "Uneven tone", description: "Fades sun spots, freckles and other uneven pigmentation." },
      { title: "Fine lines", description: "Smooths fine lines, especially around the eyes and mouth." },
      { title: "Rough texture", description: "Leaves the surface of the skin smoother and brighter." },
      { title: "Acne", description: "Some peels help treat acne and soften mild acne scarring." },
    ],
    visit: [
      { title: "Prepare", description: "Your skin is cleansed and sensitive areas such as the eyes and lips are protected." },
      { title: "Apply", description: "The peel is brushed on. Expect warmth or stinging for a few minutes." },
      { title: "Neutralise", description: "The solution is neutralised or removed at the right moment." },
      { title: "Soothe and protect", description: "A calming moisturiser and sunscreen finish the treatment." },
    ],
    aftercare: [
      "Let flaking skin shed on its own. Don't pick or peel it.",
      "Use a gentle cleanser and plain moisturiser, and pause retinoids and exfoliants until healed.",
      "Protect your skin from the sun every day. After a medium peel this matters for months.",
    ],
    precautions: [
      "Are taking, or have recently taken, isotretinoin.",
      "Get cold sores. Tell us, as a peel can trigger an outbreak.",
      "Have broken, sunburnt or irritated skin.",
      "Are pregnant, as some peel acids aren't recommended.",
    ],
    sources: [AAD_PEELS],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
