import { canonicalEntries } from "@/content/canonical-content";
import { AdminActionPanel } from "../AdminActionPanel";

function getItemCount(data: unknown) {
  if (Array.isArray(data)) return data.length;
  if (data && typeof data === "object") return Object.keys(data).length;
  return 1;
}

function getDescription(key: string) {
  if (key.includes("tourism")) return "Destination pages, tourism previews, and package content.";
  if (key.includes("study") || key.includes("universities")) return "Study abroad country and university content.";
  if (key.includes("omra")) return "Omra package cards, itinerary text, and page content.";
  if (key.includes("home")) return "Homepage proof, stats, previews, and conversion sections.";
  if (key.includes("services")) return "Service categories, timelines, and journey copy.";
  if (key.includes("faqs")) return "FAQ groups shown across public pages.";
  return "Global website configuration and navigation content.";
}

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
            Content
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
            Website content manager
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Review the content collections that power the homepage, services, study abroad,
            tourism, Omra, FAQs, and navigation.
          </p>
        </div>
        <AdminActionPanel label="Content changes" />
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {canonicalEntries.map((entry) => (
          <article key={entry.key} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                  {entry.type}
                </p>
                <h2 className="mt-2 text-lg font-black text-neutral-950">{entry.title}</h2>
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black text-neutral-700">
                {getItemCount(entry.data)} items
              </span>
            </div>
            <p className="mt-4 text-sm font-medium leading-6 text-neutral-500">
              {getDescription(entry.key)}
            </p>
            <div className="mt-5 rounded-xl bg-neutral-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                Admin controls
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-600">
                  Edit copy
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-600">
                  Reorder
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-600">
                  Publish
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
