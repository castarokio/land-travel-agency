import { Phone, UserRoundCheck } from "lucide-react";
import { adminLeads } from "@/lib/admin/panel-data";
import { AdminActionPanel } from "../AdminActionPanel";

const statusClasses: Record<string, string> = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  Qualified: "bg-emerald-50 text-emerald-700",
};

export default function AdminLeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
            Leads
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
            Inquiry pipeline
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Track requests from destination pages, program finder, WhatsApp calls to action, and
            public contact forms.
          </p>
        </div>
        <AdminActionPanel label="Lead pipeline" />
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {["New", "Contacted", "Qualified"].map((status) => (
          <article key={status} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wider text-neutral-400">{status}</p>
            <p className="mt-2 text-3xl font-black text-neutral-950">
              {adminLeads.filter((lead) => lead.status === status).length}
            </p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs font-black uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="px-5 py-4">Lead</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Request</th>
                <th className="px-5 py-4">Owner</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {adminLeads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-black text-neutral-950">{lead.name}</p>
                    <p className="mt-1 text-xs font-semibold text-neutral-500">{lead.id}</p>
                    <p className="mt-2 text-xs font-semibold text-neutral-500">{lead.email}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-neutral-700">{lead.service}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-neutral-700">{lead.request}</p>
                    <p className="mt-1 text-xs font-semibold text-neutral-400">{lead.source}</p>
                  </td>
                  <td className="px-5 py-4 text-neutral-600">{lead.owner}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClasses[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${lead.contact}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-black text-neutral-700"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </a>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs font-black text-white">
                        <UserRoundCheck className="h-3.5 w-3.5" />
                        Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
