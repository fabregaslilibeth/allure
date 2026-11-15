# Allure

Marketing site for Allure, a skin and aesthetics studio. Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion and Lenis.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-checks and lints as part of the build
npm run lint
```

## Where things live

- `src/app` — routes: home (`page.tsx`), `services/[slug]` (statically generated from the services data), `appointment` (booking form) and `api/appointments` (receives bookings).
- `src/components` — page sections. `Header/` holds the fixed header and its full-screen menu.
- `src/data` — all copy and content: services, FAQ, nav links, gallery images.
- `src/lib` — fonts, shared motion variants, `cn` helper.
- `src/types.ts` — content types.

Smooth scrolling comes from one Lenis instance in `components/SmoothScroll.tsx`. Don't create more; use `useLenis()` from `lenis/react` to reach it.

## Bookings

`/appointment` collects a treatment, date, time and contact details. `?service=<slug>` preselects a treatment (service pages link this way). Validation in `src/lib/booking.ts` is shared by the form and `POST /api/appointments`.

The API only validates and acknowledges a request. To actually receive bookings, set `BOOKING_WEBHOOK_URL` in `.env.local` and each request is POSTed there as JSON (for example to a booking system, a form inbox or an email automation).

## Placeholders to replace

- Booking hours (`timeSlots`) and the 14-day window live in `src/data/booking.ts` and are placeholders.
- Gallery and service-hero media are Pixabay URLs. The service-page gallery is stock imagery, so it is deliberately not labelled "Results".

## Content accuracy

Treatment facts in `src/data/services.ts` (session length, number of sessions, recovery, precautions) follow the sources listed on each service and shown on its page (AAD, FDA, Biologique Recherche, Mayo Clinic Care Network, Altru Health). If you change a figure, update or add the source. Prices are intentionally absent until the clinic has real ones.
