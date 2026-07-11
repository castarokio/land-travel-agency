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
  const radius = 30;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* SVG Ring */}
      <div className="relative w-[74px] h-[74px] flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-95" viewBox="0 0 80 80">
          {/* Base Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#E9E9E9"
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
            strokeDasharray-circumference={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-bold text-[#111111]">{percentage}%</span>
      </div>

      {/* Labels */}
      <div className="mt-3 text-center space-y-0.5">
        <p className="text-xs font-bold text-[#111111]">{label}</p>
        <p className="text-[10px] text-muted-foreground font-medium">{subLabel}</p>
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
    <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none font-sans h-full flex flex-col">
      <div className="flex items-baseline gap-2 mb-6">
        <h3 className="text-sm font-bold text-[#111111]">Performance Globale</h3>
        <span className="text-[10px] text-muted-foreground font-medium">vs le mois dernier</span>
      </div>

      <div className="flex-1 flex items-center justify-around gap-4 py-2">
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
          color="#ffd84d" 
        />
      </div>
    </Card>
  );
}
