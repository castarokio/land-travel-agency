/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ArrowUp } from "lucide-react";

// Mock revenue data over a month period
const data = [
  { date: "Jan 01", revenue: 5000 },
  { date: "Jan 05", revenue: 8200 },
  { date: "Jan 10", revenue: 12500 },
  { date: "Jan 15", revenue: 16000 },
  { date: "Jan 20", revenue: 20500 },
  { date: "Jan 25", revenue: 22000 },
  { date: "Jan 30", revenue: 25843 }
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A] text-white p-3 rounded-xl border border-slate-700 shadow-xl font-sans text-xs">
        <p className="font-semibold text-[10px] text-slate-400 mb-1">{label}</p>
        <p className="font-bold text-xs text-white">€{payload[0].value.toLocaleString()} CA</p>
      </div>
    );
  }
  return null;
};

export default function RevenueProfileCard() {
  return (
    <Card className="rounded-2xl border border-[#EBEFF2] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans flex flex-col h-full justify-between">
      {/* Title & Info */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profil de Revenu</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight leading-none">
            €25,843.45
          </span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DFF5E9] text-[#159768] leading-none">
            <ArrowUp size={8} strokeWidth={3} />
            <span>+11%</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-1.5">Vos performances financières sont excellentes ⚡</p>
      </div>

      {/* Chart Block */}
      <div className="w-full h-[180px] min-h-[180px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052cc" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0052cc" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0052cc" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
