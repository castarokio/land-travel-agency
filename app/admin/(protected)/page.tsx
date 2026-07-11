import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { requireAdminSession } from "@/lib/admin/auth";
import {
  adminLeads,
  adminMediaAssets,
  adminPortalProfiles,
  adminSettings,
  adminStats,
} from "@/lib/admin/panel-data";

export default async function AdminDashboardPage() {
  await requireAdminSession();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-neutral-950 p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/40">
              Control center
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              Manage every important surface of the Land Travel website.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/60">
              This protected panel gives admins one place to review content, lead requests, portal
              users, media assets, and operational settings.
            </p>
          </div>
          <Link
            href="/admin/content"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-neutral-950"
          >
            Manage content <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-xl bg-neutral-100 p-3 text-neutral-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-3xl font-black text-neutral-950">{stat.value}</span>
              </div>
              <h2 className="mt-5 text-sm font-black text-neutral-950">{stat.label}</h2>
              <p className="mt-1 text-xs font-semibold leading-5 text-neutral-500">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-neutral-950">Latest leads</h2>
              <p className="text-sm font-medium text-neutral-500">Recent requests from public pages.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-black text-neutral-950 underline">
              Open pipeline
            </Link>
          </div>
          <div className="mt-5 divide-y divide-neutral-100">
            {adminLeads.map((lead) => (
              <div key={lead.id} className="grid gap-3 py-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-black text-neutral-950">{lead.name}</p>
                  <p className="mt-1 text-sm font-medium text-neutral-500">{lead.request}</p>
                </div>
                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-black text-neutral-950">Admin access</h2>
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-neutral-500">
              Username/password login is active with an HTTP-only session cookie. Set
              ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in production.
            </p>
          </article>

          <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-neutral-950">Operational status</h2>
            <div className="mt-4 space-y-3">
              {adminSettings.slice(0, 3).map((setting) => (
                <div key={setting.label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="text-sm font-black text-neutral-900">{setting.label}</p>
                    <p className="text-xs font-medium text-neutral-500">{setting.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-neutral-950">Portal users</h2>
          <div className="mt-4 space-y-3">
            {adminPortalProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4">
                <div>
                  <p className="text-sm font-black text-neutral-950">{profile.name}</p>
                  <p className="text-xs font-semibold text-neutral-500">{profile.service}</p>
                </div>
                <span className="text-xs font-black text-neutral-700">{profile.progress}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-neutral-950">Media coverage</h2>
          <div className="mt-4 space-y-3">
            {adminMediaAssets.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4">
                <div>
                  <p className="text-sm font-black text-neutral-950">{asset.name}</p>
                  <p className="text-xs font-semibold text-neutral-500">{asset.category}</p>
                </div>
                <Clock3 className="h-4 w-4 text-neutral-400" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
