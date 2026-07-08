# Land Travel Page Structure

This document maps each route, its purpose, and the main component stack used to build it.

## Global Layout

All pages are wrapped by `app/layout.tsx`.

Stack:
- `Header`
- `main` route content
- `Footer`
- `SiteInteractions`

Purpose:
- Provide shared navigation, footer links, and global hover/motion interactions.

Main navigation:
- Home: `/`
- Study Abroad: `/services/study-abroad`
- Tourism: `/services/tourism`
- Omra: `/services/omra`
- About: `/about`
- Contact: `/contact`

Recommended sitemap:

```text
/
├── /services
│   ├── /study-abroad
│   ├── /tourism
│   │   ├── /local
│   │   ├── /international
│   │   └── /destinations/[id]
│   └── /omra
├── /universities
├── /about
├── /contact
└── /portal
```

Legacy redirects:
- `/study-abroad` -> `/services/study-abroad`
- `/tourism` -> `/services/tourism`
- `/tourism/local` -> `/services/tourism/local`
- `/tourism/international` -> `/services/tourism/international`
- `/tourism/destination/[id]` -> `/services/tourism/destinations/[id]`
- `/omra` -> `/services/omra`

## `/` Home

Purpose:
- Main marketing page for Land Travel.
- Introduces the agency, core services, tourism destinations, study destinations, trust proof, testimonials, and newsletter capture.

Component stack:
- `HomeTextSplit`
  - Applies GSAP line-by-line text reveal animation across homepage headings and copy.
- `Hero`
  - Full-screen video hero using the jet takeoff video.
  - Contains agency label, main headline, short positioning copy, and the `Start your journey` CTA.
- `QuickServiceSelector`
  - Three premium service cards placed before logos and long-form sections.
  - Main card: `Study Abroad` linking to `/services/study-abroad`.
  - Secondary card: `Tourism` linking to `/services/tourism`.
  - Smaller card: `Omra` linking to `/services/omra`.
- `Proof`
  - Horizontal university logo ticker.
  - Builds trust by showing recognizable universities.
- `Services`
  - Accordion-style service journey.
  - Left side image changes with active service step.
  - Right side service rows explain admission, visa, accommodation, support, and departure.
- `TourismDestinations`
  - Normal destination card grid.
  - Links to individual tourism destination detail pages.
- `Destinations`
  - Study destination cards.
  - Links users toward the future universities page.
- `WhyChoose`
  - Agency trust/value section.
  - Includes illustration and stats.
- `Testimonials`
  - Client testimonial carousel with arrows, dots, and avatar switcher.
- `Newsletter`
  - Email capture block with basic validation message.

Removed from home:
- `OmraSection`
  - The large Omra promo card shown between tourism destinations and study destinations has been removed from the homepage.
  - The standalone Omra service page now lives at `/services/omra`.

## `/services`

Purpose:
- Full service journey page.
- Converts a broad project into clear steps: orientation, admission, visa, accommodation, support, departure, and study-abroad CTA.

Component stack:
- `ServicesTimeline`
  - Hero intro with back link.
  - Horizontal sticky scroll journey.
  - Progress nav with step buttons.
  - Orbit card display for active/previous/next step.
  - Bottom placeholder cards for tourism and Omra routes.

## `/services/study-abroad`

Purpose:
- Service route for the study abroad path.
- Long-term URL for admissions, documents, and visa guidance.

Component stack:
- `MotionPageShell`
  - Section label.
  - Title.
  - Short future-page description.
  - CTA back to `/services`.

Redirect:
- `/study-abroad` redirects to `/services/study-abroad`.

## `/services/tourism`

Purpose:
- Gateway page that splits users into local or international tourism.

Component stack:
- `MotionPageShell`
  - Section label and page title.
  - Short explanatory copy.
  - Two large route buttons:
    - `/services/tourism/local`
    - `/services/tourism/international`

Redirect:
- `/tourism` redirects to `/services/tourism`.

## `/services/tourism/local`

Purpose:
- Local tourism package page for regional trips and adventure circuits.

Component stack:
- `LocalTourismPageClient`
  - Hero image section with back link.
  - Local package grid.
  - Package cards with image, badge, duration, features, price, and inquiry action.
  - Inquiry form section.
  - Success state after form submission.

Redirect:
- `/tourism/local` redirects to `/services/tourism/local`.

## `/services/tourism/international`

Purpose:
- International tourism package page for organized destination packages.

Component stack:
- `InternationalTourismPageClient`
  - Hero image section with back link.
  - Category filter nav.
  - International package grid.
  - Package cards with image, category, duration, highlights, inclusions, price, and inquiry action.
  - Inquiry form section.
  - Success state after form submission.

Redirect:
- `/tourism/international` redirects to `/services/tourism/international`.

## `/services/tourism/destinations/[id]`

Purpose:
- Detailed destination page for homepage tourism cards.
- Supports routes for Maldives, Japan, Switzerland, and Tanzania.

Component stack:
- `DestinationDetailPageClient`
  - Destination hero and header metadata.
  - Intro content.
  - Places/sights section.
  - Itinerary and highlights content.
  - Included services / planning information.
  - Related destinations.
  - CTA back toward tourism inquiry flow.

Redirect:
- `/tourism/destination/[id]` redirects to `/services/tourism/destinations/[id]`.

## `/services/omra`

Purpose:
- Full Omra service page.
- Dedicated to pilgrimage packages, comparison, Ziyarat, and reservation inquiry.

Component stack:
- `OmraPageClient`
  - Spiritual hero with Masjid Nabawi background.
  - Package comparison cards.
  - Formula selector.
  - Ziyarat historical visits grid.
  - Inquiry form.
  - Success state after form submission.

Redirect:
- `/omra` redirects to `/services/omra`.

## `/universities`

Purpose:
- Placeholder route for future university listings.

Component stack:
- `MotionPageShell`
  - Title.
  - Description of future filters, program details, and application CTAs.
  - Button back to home.

## `/about`

Purpose:
- Placeholder company/about page.

Component stack:
- `MotionPageShell`
  - Title.
  - Agency description.
  - Button back to home.

## `/contact`

Purpose:
- Placeholder contact page.
- Intended for future full contact form, office map, booking, phone, and email options.

Component stack:
- `MotionPageShell`
  - Title.
  - Contact-page description.
  - Button back to home.

## `/login`

Purpose:
- Placeholder authentication route.
- Reserved for a future student/admin portal.

Component stack:
- `MotionPageShell`
  - Title.
  - Auth placeholder text.
  - Button back to home.

## `/signup`

Purpose:
- Placeholder signup route.
- Reserved for future consultation, inquiry, or student account registration.

Component stack:
- `MotionPageShell`
  - Title.
  - Signup placeholder text.
  - Button back to home.
