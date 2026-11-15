"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useLenis } from "lenis/react";
import { bookingWindowDays, timeSlots } from "@/data/booking";
import {
  bookableOptions,
  bookingFields,
  daysFromToday,
  emptyBooking,
  formatBookingDate,
  isPastSlot,
  toIsoDate,
  validateBooking,
  type BookingErrors,
  type BookingField,
  type BookingRequest,
} from "@/lib/booking";
import { cn } from "@/lib/cn";
import Button from "./Button";

type Status = "idle" | "submitting" | "sent" | "failed";

const chip =
  "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-primary/15 bg-white/70 transition-colors hover:border-primary/40 " +
  "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-secondary " +
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary " +
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-35 peer-disabled:hover:border-primary/15";

export default function BookingForm({ initialService }: { initialService: string }) {
  const [values, setValues] = useState<BookingRequest>({ ...emptyBooking, service: initialService });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const days = useBookingDays();
  const lenis = useLenis();
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTo = (target: HTMLElement | null) => {
    if (target) lenis?.scrollTo(target, { offset: -120 });
  };

  const update = (field: BookingField, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      // A new date can make the chosen time unavailable (earlier today).
      if (field === "date" && next.time && isPastSlot(value, next.time)) next.time = "";
      return next;
    });
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (status === "failed") setStatus("idle");
  };

  const showErrors = (found: BookingErrors) => {
    setErrors(found);
    const first = bookingFields.find((field) => found[field]);
    if (first) scrollTo(document.querySelector<HTMLElement>(`[data-field="${first}"]`));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateBooking(values);
    if (!result.ok) return showErrors(result.errors);

    setStatus("submitting");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, company: honeypot }),
      });
      if (response.status === 422) {
        const body = (await response.json()) as { errors?: BookingErrors };
        setStatus("idle");
        return showErrors(body.errors ?? {});
      }
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      scrollTo(topRef.current);
    } catch {
      setStatus("failed");
    }
  }

  const reset = () => {
    setValues({ ...emptyBooking });
    setErrors({});
    setStatus("idle");
    scrollTo(topRef.current);
  };

  const selected = bookableOptions.find((option) => option.slug === values.service);

  return (
    <div ref={topRef} className="rounded-2xl border border-primary/10 bg-white/60 p-5 shadow-sm sm:p-8 md:p-10">
      {status === "sent" ? (
        <Confirmation values={values} treatment={selected?.title ?? values.service} onReset={reset} />
      ) : (
        <form noValidate onSubmit={onSubmit}>
          <Step number={1} title="Choose a treatment" field="service" error={errors.service}>
            <fieldset aria-describedby={errors.service ? "booking-service-error" : undefined}>
              <legend className="sr-only">Treatment</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {bookableOptions.map((option) => (
                  <label key={option.slug} className="relative block">
                    <input
                      type="radio"
                      name="service"
                      value={option.slug}
                      checked={values.service === option.slug}
                      onChange={() => update("service", option.slug)}
                      className="peer sr-only"
                    />
                    <span className={cn(chip, "h-full flex-row justify-start gap-4 p-3 text-left")}>
                      {option.image ? (
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                          <Image src={option.image} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                      ) : (
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-tertiary/40 text-xl">
                          ?
                        </span>
                      )}
                      <span className="flex flex-col gap-1">
                        <span className="text-sm leading-snug">{option.title}</span>
                        <span className="font-body text-xs opacity-70">{option.hint}</span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Step>

          <Step number={2} title="Pick a date and time" field="date" error={errors.date ?? errors.time}>
            <fieldset aria-describedby={errors.date ? "booking-date-error" : undefined}>
              <legend className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Date</legend>
              <div className="grid min-h-[4.5rem] grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((day, index) => {
                  const iso = toIsoDate(day);
                  return (
                    <label key={iso} className="relative block">
                      <input
                        type="radio"
                        name="date"
                        value={iso}
                        checked={values.date === iso}
                        onChange={() => update("date", iso)}
                        className="peer sr-only"
                      />
                      <span className={cn(chip, "gap-0.5 px-1 py-2.5")}>
                        <span className="font-body text-[0.7rem] uppercase tracking-wider opacity-75">
                          {index === 0 ? "Today" : formatBookingDate(iso, { day: undefined, month: undefined })}
                        </span>
                        <span className="text-xl leading-none">{day.getDate()}</span>
                        <span className="font-body text-[0.7rem] uppercase tracking-wider opacity-75">
                          {formatBookingDate(iso, { weekday: undefined, day: undefined })}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset data-field="time" className="mt-6" aria-describedby={errors.time ? "booking-date-error" : undefined}>
              <legend className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Time</legend>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const unavailable = !values.date || isPastSlot(values.date, time);
                  return (
                    <label key={time} className="relative block">
                      <input
                        type="radio"
                        name="time"
                        value={time}
                        checked={values.time === time}
                        disabled={unavailable}
                        onChange={() => update("time", time)}
                        className="peer sr-only"
                      />
                      <span className={cn(chip, "py-3 font-body text-sm tabular-nums")}>{time}</span>
                    </label>
                  );
                })}
              </div>
              {!values.date && <p className="mt-3 font-body text-sm opacity-60">Choose a date to see times.</p>}
            </fieldset>
          </Step>

          <Step number={3} title="Your details">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField field="name" label="Full name" autoComplete="name" values={values} errors={errors} onChange={update} />
              <TextField field="email" label="Email" type="email" autoComplete="email" values={values} errors={errors} onChange={update} />
              <TextField field="phone" label="Phone" type="tel" autoComplete="tel" optional values={values} errors={errors} onChange={update} />
              <TextField field="notes" label="Anything we should know?" optional multiline values={values} errors={errors} onChange={update} />
            </div>
            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />
          </Step>

          <div className="flex flex-col gap-5 border-t border-primary/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-body text-sm leading-relaxed opacity-80" aria-live="polite">
              {selected && values.date && values.time ? (
                <>
                  <span className="font-semibold">{selected.title}</span> · {formatBookingDate(values.date)} ·{" "}
                  {values.time}
                </>
              ) : (
                "We'll only use your details to arrange this appointment."
              )}
            </p>
            <Button type="submit" disabled={status === "submitting"} className="shrink-0">
              {status === "submitting" ? "Sending…" : "Request appointment"}
            </Button>
          </div>

          {status === "failed" && (
            <p role="alert" className="mt-4 font-body text-sm text-red-700">
              We couldn&apos;t send your request. Please check your connection and try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

/** Dates are built after mount so the server render never disagrees with the visitor's clock. */
function useBookingDays() {
  const [days, setDays] = useState<Date[]>([]);
  useEffect(() => {
    setDays(Array.from({ length: bookingWindowDays }, (_, i) => daysFromToday(i)));
  }, []);
  return days;
}

type StepProps = {
  number: number;
  title: string;
  /** Field this step scrolls to on error; its message renders below the step. */
  field?: BookingField;
  error?: string;
  children: ReactNode;
};

function Step({ number, title, field, error, children }: StepProps) {
  return (
    <section data-field={field} className="relative border-b border-primary/10 pb-8 pt-8 first:pt-0">
      <h2 className="mb-5 flex items-center gap-3 text-lg md:text-xl">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary font-body text-sm text-secondary">
          {number}
        </span>
        {title}
      </h2>
      {children}
      {error && (
        <p id={`booking-${field}-error`} className="mt-3 font-body text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}

type TextFieldProps = {
  field: BookingField;
  label: string;
  values: BookingRequest;
  errors: BookingErrors;
  onChange: (field: BookingField, value: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  optional?: boolean;
  multiline?: boolean;
};

function TextField({ field, label, values, errors, onChange, type = "text", autoComplete, optional, multiline }: TextFieldProps) {
  const id = `booking-${field}`;
  const error = errors[field];
  const control = cn(
    "w-full rounded-xl border bg-white px-4 py-3 font-body text-base outline-none transition",
    "focus:border-primary focus:ring-2 focus:ring-primary/20",
    error ? "border-red-600" : "border-primary/20",
  );
  const shared = {
    id,
    name: field,
    value: values[field],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: control,
  };

  return (
    <div data-field={field} className={cn("flex flex-col gap-2", multiline && "sm:col-span-2")}>
      <label htmlFor={id} className="font-body text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
        {label}
        {optional && <span className="font-normal normal-case tracking-normal opacity-70"> (optional)</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} maxLength={1000} onChange={(e) => onChange(field, e.target.value)} />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          required={!optional}
          onChange={(e) => onChange(field, e.target.value)}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="font-body text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type ConfirmationProps = { values: BookingRequest; treatment: string; onReset: () => void };

function Confirmation({ values, treatment, onReset }: ConfirmationProps) {
  const firstName = values.name.split(/\s+/)[0];
  const rows = [
    ["Treatment", treatment],
    ["Date", formatBookingDate(values.date, { weekday: "long", month: "long" })],
    ["Time", values.time],
  ];

  return (
    <div role="status" className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary text-secondary">
        <CircleCheck aria-hidden className="size-8" strokeWidth={1.5} />
      </span>
      <div>
        <h2 className="text-3xl md:text-4xl">Request received</h2>
        <p className="mx-auto mt-4 max-w-md font-body text-lg leading-relaxed opacity-80">
          Thank you, {firstName}. We&apos;ll email <span className="font-semibold">{values.email}</span> to confirm
          your appointment.
        </p>
      </div>
      <dl className="grid w-full max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-primary/10 py-5 text-left">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-body text-xs font-semibold uppercase tracking-[0.2em] opacity-60">{label}</dt>
            <dd className="font-body text-base">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/">Back to home</Button>
        <button type="button" onClick={onReset} className="cursor-pointer font-body text-sm underline underline-offset-4">
          Book another treatment
        </button>
      </div>
    </div>
  );
}
