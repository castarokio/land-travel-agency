import { adminSettings } from "@/lib/admin/panel-data";
import { AdminActionPanel } from "../AdminActionPanel";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
            Settings
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
            Admin settings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Configure operational settings for authentication, lead handling, publishing, and
            analytics integrations.
          </p>
        </div>
        <AdminActionPanel label="Settings" />
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        {adminSettings.map((setting) => {
          const Icon = setting.icon;

          return (
            <article key={setting.label} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-xl bg-neutral-100 p-3 text-neutral-700">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-black text-neutral-950">{setting.label}</h2>
              <p className="mt-2 text-sm font-black text-neutral-700">{setting.value}</p>
              <p className="mt-2 text-sm font-medium leading-6 text-neutral-500">{setting.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-black text-amber-950">Production credential note</h2>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-amber-900">
          The bootstrap credentials are useful for first access. For production, set
          ADMIN_USERNAME, ADMIN_PASSWORD or ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET in Vercel
          so credentials are not controlled by source code defaults.
        </p>
      </section>
    </div>
  );
}
