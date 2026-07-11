"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error ?? "Unable to sign in.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500">
          Admin username or email
        </span>
        <span className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <Mail className="h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-neutral-900 outline-none"
            autoComplete="username"
            required
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500">
          Password
        </span>
        <span className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <LockKeyhole className="h-4 w-4 text-neutral-400" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-neutral-900 outline-none"
            autoComplete="current-password"
            required
          />
        </span>
      </label>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-neutral-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="rounded-xl bg-neutral-50 px-4 py-3 text-xs font-semibold leading-5 text-neutral-500">
        Default bootstrap login: <strong className="text-neutral-800">admin</strong> /{" "}
        <strong className="text-neutral-800">landtravel-admin-2026</strong>. Change it with
        ADMIN_USERNAME and ADMIN_PASSWORD in Vercel.
      </p>
    </form>
  );
}
