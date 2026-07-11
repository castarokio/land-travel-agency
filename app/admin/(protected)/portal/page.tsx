import { FileCheck2, MessageSquare, UserCog } from "lucide-react";
import { adminPortalProfiles } from "@/lib/admin/panel-data";
import { AdminActionPanel } from "../AdminActionPanel";

export default function AdminPortalPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
            Portal users
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
            Client portal manager
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Monitor client accounts, service progress, required documents, and counselor follow-up.
          </p>
        </div>
        <AdminActionPanel label="Portal user changes" />
      </div>

      <section className="grid gap-5">
        {adminPortalProfiles.map((profile) => (
          <article key={profile.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1fr_160px_1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400">{profile.id}</p>
                <h2 className="mt-2 text-lg font-black text-neutral-950">{profile.name}</h2>
                <p className="mt-1 text-sm font-semibold text-neutral-500">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400">Service</p>
                <p className="mt-2 text-sm font-black text-neutral-800">{profile.service}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-black text-neutral-500">
                  <span>Progress</span>
                  <span>{profile.progress}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-neutral-950" style={{ width: profile.progress }} />
                </div>
                <p className="mt-2 text-xs font-semibold text-neutral-500">{profile.nextAction}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-black text-neutral-700">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs font-black text-white">
                  <UserCog className="h-3.5 w-3.5" />
                  Manage
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <FileCheck2 className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-black text-neutral-950">Document workflow controls</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-neutral-500">
          The panel is structured for document approvals, counselor messages, deadline updates, and
          service progress. Persistent document uploads can be connected to the existing
          PortalProfile and MediaAsset database models.
        </p>
      </section>
    </div>
  );
}
