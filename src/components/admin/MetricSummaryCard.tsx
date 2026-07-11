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
    <div className={cn("p-6 flex flex-col justify-center", className)}>
      <span className="text-[13px] text-[#666666] font-medium mb-2">{title}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-[28px] font-bold text-[#111111] leading-none tracking-[-0.025em]">
          {value}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "flex items-center gap-0.5 px-2 py-0.5 rounded-[6px] text-[10px] font-bold leading-none",
              isPositive 
                ? "bg-[#DFF5E9] text-[#159768]" 
                : "bg-[#FDE9E9] text-[#FC5F5E]"
            )}
          >
            {isPositive ? <ArrowUp size={10} strokeWidth={2.5} /> : <ArrowDown size={10} strokeWidth={2.5} />}
            <span>{change}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-semibold">/Mois</span>
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
    <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-0 shadow-none font-sans overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E9E9E9]">
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
