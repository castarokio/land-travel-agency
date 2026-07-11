"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw, Save, Send } from "lucide-react";

type AdminActionPanelProps = {
  label?: string;
};

export function AdminActionPanel({ label = "Admin action" }: AdminActionPanelProps) {
  const [message, setMessage] = useState("Ready");
  const [isBusy, setIsBusy] = useState(false);

  function runAction(nextMessage: string) {
    setIsBusy(true);
    setMessage("Working...");
    window.setTimeout(() => {
      setMessage(nextMessage);
      setIsBusy(false);
    }, 650);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={isBusy}
        onClick={() => runAction(`${label} saved as draft.`)}
        className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
      >
        <Save className="h-3.5 w-3.5" />
        Save draft
      </button>
      <button
        type="button"
        disabled={isBusy}
        onClick={() => runAction(`${label} published.`)}
        className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs font-black text-white transition hover:bg-neutral-800 disabled:opacity-60"
      >
        <Send className="h-3.5 w-3.5" />
        Publish
      </button>
      <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
        {isBusy ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
        {message}
      </span>
    </div>
  );
}
