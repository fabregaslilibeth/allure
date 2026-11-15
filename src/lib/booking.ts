import { consultationOption, timeSlots } from "@/data/booking";
import { services } from "@/data/services";

export type BookingRequest = {
  service: string;
  date: string; // YYYY-MM-DD, local to the visitor
  time: string; // one of timeSlots
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type BookingField = keyof BookingRequest;
export type BookingErrors = Partial<Record<BookingField, string>>;

export type BookableOption = { slug: string; title: string; hint: string; image?: string };

export const bookableOptions: BookableOption[] = [
  ...services.map(({ slug, title, category, image }) => ({ slug, title, hint: category, image })),
  consultationOption,
];

export const emptyBooking: BookingRequest = {
  service: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

/** Field order, used to find the first invalid field. */
export const bookingFields = Object.keys(emptyBooking) as BookingField[];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NOTES = 1000;

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateBooking(
  input: unknown,
): { ok: true; data: BookingRequest } | { ok: false; errors: BookingErrors } {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const text = (field: BookingField) => (typeof raw[field] === "string" ? (raw[field] as string).trim() : "");

  const data = Object.fromEntries(bookingFields.map((field) => [field, text(field)])) as BookingRequest;
  const errors: BookingErrors = {};

  if (!bookableOptions.some((option) => option.slug === data.service)) errors.service = "Choose a treatment.";
  if (!ISO_DATE.test(data.date) || Number.isNaN(Date.parse(data.date))) errors.date = "Choose a date.";
  else if (data.date < toIsoDate(daysFromToday(-1))) errors.date = "Choose a date from today onwards.";
  if (!timeSlots.includes(data.time)) errors.time = "Choose a time.";
  if (data.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone && !PHONE.test(data.phone)) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (data.notes.length > MAX_NOTES) errors.notes = `Keep notes under ${MAX_NOTES.toLocaleString("en-GB")} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/** Local midnight `offset` days from today. */
export function daysFromToday(offset: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

export function toIsoDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "Tue 18 Nov" for a YYYY-MM-DD string, read as a local date. */
export function formatBookingDate(iso: string, options: Intl.DateTimeFormatOptions = {}) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...options,
  });
}

/** True when the slot has already started (only possible for today). */
export function isPastSlot(iso: string, time: string, now = new Date()) {
  if (iso !== toIsoDate(now)) return false;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes <= now.getHours() * 60 + now.getMinutes();
}
