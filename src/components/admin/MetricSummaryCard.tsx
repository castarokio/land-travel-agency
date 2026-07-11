"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface MetricItemProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  className?: string;
}

function MetricItem({ title, value, change, isPositive, className }: MetricItemProps) {
  return (
    <div className={cn("p-7 flex flex-col justify-center", className)}>
      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2.5">{title}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-[26px] font-extrabold text-[#0F172A] leading-none tracking-tight">
          {value}
        </span>
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold leading-none",
              isPositive 
                ? "bg-[#DFF5E9] text-[#159768]" 
                : "bg-[#FDE9E9] text-[#FC5F5E]"
            )}
          >
            {isPositive ? <ArrowUp size={8} strokeWidth={3} /> : <ArrowDown size={8} strokeWidth={3} />}
            <span>{change}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">/Mois</span>
        </div>
      </div>
    </div>
  );
}

interface MetricSummaryCardProps {
  totalClients: number;
  totalRevenue: string;
  newLeadsCount: number;
}

export default function MetricSummaryCard({
  totalClients,
  totalRevenue,
  newLeadsCount
}: MetricSummaryCardProps) {
  return (
    <Card className="rounded-2xl border border-[#EBEFF2] bg-white p-0 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F1F5F9]">
        <MetricItem 
          title="Total Candidats" 
          value={totalClients.toLocaleString()} 
          change="+17%" 
          isPositive={true} 
        />
        <MetricItem 
          title="Chiffre d'Affaire Estimé" 
          value={totalRevenue} 
          change="+11%" 
          isPositive={true} 
        />
        <MetricItem 
          title="Nouveaux Prospects" 
          value={newLeadsCount.toLocaleString()} 
          change="-15%" 
          isPositive={false} 
        />
      </div>
    </Card>
  );
}
