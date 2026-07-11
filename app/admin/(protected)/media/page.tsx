import Image from "next/image";
import { Download, ImagePlus } from "lucide-react";
import { adminMediaAssets } from "@/lib/admin/panel-data";
import { AdminActionPanel } from "../AdminActionPanel";

export default function AdminMediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">Media</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
            Media library
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Review hero images, destination assets, package visuals, and uploaded media used across
            the public website.
          </p>
        </div>
        <AdminActionPanel label="Media library" />
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {adminMediaAssets.map((asset) => (
          <article key={asset.name} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-neutral-100">
              <Image src={asset.path} alt={asset.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                    {asset.category}
                  </p>
                  <h2 className="mt-2 text-base font-black text-neutral-950">{asset.name}</h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  {asset.status}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-neutral-500">{asset.kind}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs font-black text-white">
                  <ImagePlus className="h-3.5 w-3.5" />
                  Replace
                </button>
                <a
                  href={asset.path}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-black text-neutral-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  View
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
