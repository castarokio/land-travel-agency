import Link from "next/link";
import { ReactNode } from "react";
import { requireAdminSession } from "@/lib/admin/auth";
import { adminNavItems } from "@/lib/admin/panel-data";
import { LogoutButton } from "./LogoutButton";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-neutral-200 bg-white p-6 lg:block">
        <Link href="/admin" className="block rounded-2xl bg-neutral-950 p-5 text-white">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Land Travel
          </span>
          <span className="mt-2 block text-2xl font-black tracking-tight">Admin panel</span>
          <span className="mt-2 block text-xs font-semibold leading-5 text-white/60">
            Manage website content, leads, media, portal users, and settings.
          </span>
        </Link>

        <nav className="mt-8 space-y-1 text-sm font-bold" aria-label="Admin navigation">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 px-4 py-4 backdrop-blur md:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Signed in as
              </p>
              <p className="text-sm font-black text-neutral-900">{session.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50 sm:inline-flex"
              >
                View site
              </Link>
              <LogoutButton />
            </div>
          </div>
          <nav className="mx-auto mt-4 flex max-w-7xl gap-2 overflow-x-auto lg:hidden" aria-label="Admin mobile navigation">
            {adminNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-600"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <div className="mx-auto max-w-7xl p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
