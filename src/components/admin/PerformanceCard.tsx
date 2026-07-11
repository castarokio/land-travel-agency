"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

interface ProgressRingProps {
  percentage: number;
  label: string;
  subLabel: string;
  color: string;
}

function ProgressRing({ percentage, label, subLabel, color }: ProgressRingProps) {
  const radius = 28;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* SVG Ring */}
      <div className="relative w-[78px] h-[78px] flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          {/* Base Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {/* Active Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-extrabold text-[#0F172A]">{percentage}%</span>
      </div>

      {/* Labels */}
      <div className="mt-3 text-center space-y-0.5">
        <p className="text-xs font-bold text-[#0F172A]">{label}</p>
        <p className="text-[10px] text-slate-400 font-bold">{subLabel}</p>
      </div>
    </div>
  );
}

interface PerformanceCardProps {
  conversionRate: number;
  responseRate: number;
}

export default function PerformanceCard({
  conversionRate = 82,
  responseRate = 90
}: PerformanceCardProps) {
  return (
    <Card className="rounded-2xl border border-[#EBEFF2] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans h-full flex flex-col justify-between">
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Globale</h3>
        <span className="text-[10px] text-slate-400 font-medium">vs le mois dernier</span>
      </div>

      <div className="flex-grow flex items-center justify-around gap-4 py-2">
        <ProgressRing 
          percentage={conversionRate} 
          label="Dossiers Validés" 
          subLabel="Candidats acceptés" 
          color="#0052cc" 
        />
        <ProgressRing 
          percentage={responseRate} 
          label="Réponse Leads" 
          subLabel="Traités sous 24h" 
          color="#f5a400" 
        />
      </div>
    </Card>
  );
}
