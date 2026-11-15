import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    question: "What type of payment is accepted?",
    answer: "We accept all kinds of payment, but we prefer cashless for smoother and faster transactions.",
  },
  {
    question: "Where is Allure located? What are the opening hours?",
    answer: "Each salon keeps its own hours. See them on our",
    link: { label: "locations", href: "/#find-us" },
  },
  {
    question: "Why do some people say treatments at Allure are more expensive?",
    answer:
      "We use professional-grade products and devices, and every treatment starts with a consultation. The price reflects that time and care. We'll always be honest about whether a treatment is likely to help you.",
  },
  {
    question: "Do the treatments hurt?",
    answer:
      "Most are well tolerated. Laser, microneedling and exosome treatments start with numbing cream, and you'll feel warmth, vibration or light scratching. A peel can sting or feel warm for a few minutes. Facials are relaxing.",
  },
  {
    question: "When will I see results?",
    answer:
      "It depends on the treatment. Facials and light peels can leave skin looking fresher within days. Microneedling and laser work by building new collagen, so results develop over weeks to months and usually need a course of sessions.",
  },
  {
    question: "Is there any downtime?",
    answer:
      "Facials have none. After microneedling expect redness for a day or two, after laser a few hours to a few days, and after a light peel 1–7 days of redness and flaking. Each treatment page lists what to expect.",
  },
  {
    question: "Do I need to avoid the sun afterwards?",
    answer:
      "Yes. Freshly treated skin is more sensitive to the sun, so wear broad-spectrum sunscreen every day and avoid direct sun while it heals. After a medium peel, this matters for months.",
  },
  {
    question: "It is my first time at Allure, what should I know?",
    answer:
      "Welcome! Please arrive 15 minutes early for your appointment. We'll conduct a brief consultation to understand your needs and preferences. Bring a valid ID and wear comfortable clothing.",
  },
  {
    question: "How can I shorten my treatment time?",
    answer:
      "You can book express treatments or combine services. We also offer quick consultation options and streamlined processes for returning clients.",
  },
  {
    question: "What determines how long a treatment takes?",
    answer:
      "Treatment duration depends on the service type, your specific needs, and desired results. We customize each treatment to ensure optimal outcomes within the appropriate timeframe.",
  },
];
