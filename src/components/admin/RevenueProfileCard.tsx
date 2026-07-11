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
  { date: "01 Jan", revenue: 5000 },
  { date: "05 Jan", revenue: 8200 },
  { date: "10 Jan", revenue: 12500 },
  { date: "15 Jan", revenue: 16000 },
  { date: "20 Jan", revenue: 20500 },
  { date: "25 Jan", revenue: 22000 },
  { date: "30 Jan", revenue: 25843 }
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] text-white p-3 rounded-lg border border-black/10 shadow-lg font-sans text-xs">
        <p className="font-semibold text-[10px] text-muted-foreground mb-1">{label}</p>
        <p className="font-bold text-sm text-white">€{payload[0].value.toLocaleString()} CA</p>
      </div>
    );
  }
  return null;
};

export default function RevenueProfileCard() {
  return (
    <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none font-sans flex flex-col h-full">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-[#111111] mb-1">Profil de Revenu</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-bold text-[#111111] tracking-[-0.025em] leading-none">
            €25,843.45
          </span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#DFF5E9] text-[#159768] leading-none">
            <ArrowUp size={8} strokeWidth={3} />
            <span>+11%</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground font-medium mt-1">Vos performances financières sont excellentes 👌</p>
      </div>

      {/* Chart Block */}
      <div className="flex-1 w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052cc" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0052cc" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F3" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#AAAAAA", fontSize: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#AAAAAA", fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0052cc" 
              strokeWidth={1.5} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
