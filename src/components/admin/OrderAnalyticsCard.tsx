/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ArrowUp } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data representing inquiry volume throughout the month
const data = [
  { day: "01", actuel: 80, passe: 50 },
  { day: "03", actuel: 110, passe: 70 },
  { day: "06", actuel: 95, passe: 85 },
  { day: "09", actuel: 130, passe: 60 },
  { day: "12", actuel: 120, passe: 90 },
  { day: "15", actuel: 145, passe: 75 },
  { day: "18", actuel: 160, passe: 110 },
  { day: "21", actuel: 210, passe: 100 },
  { day: "24", actuel: 190, passe: 125 },
  { day: "27", actuel: 175, passe: 130 },
  { day: "30", actuel: 230, passe: 140 }
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
        <p className="font-semibold text-[10px] text-slate-400 mb-1">Jour {label}</p>
        <p className="font-bold text-xs text-white">{payload[0].value} Inscriptions</p>
        {payload[1] && (
          <p className="text-[10px] text-slate-400 mt-0.5">Mois Dernier: {payload[1].value}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function OrderAnalyticsCard() {
  const [service, setService] = useState("all");
  const [period, setPeriod] = useState("monthly");

  return (
    <Card className="rounded-2xl border border-[#EBEFF2] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans flex flex-col h-full justify-between">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analyse des Inscriptions</h3>
            <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DFF5E9] text-[#159768]">
              <ArrowUp size={8} strokeWidth={3} />
              <span>+15%</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">/Mois</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Excellente croissance de l'intérêt étudiant 📈</p>
        </div>

        {/* Filters and Legend */}
        <div className="flex flex-wrap items-center gap-4 self-stretch sm:self-auto justify-end">
          <div className="flex items-center gap-3 text-[11px] font-bold mr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052cc]" />
              <span className="text-[#0F172A]">Ce Mois</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B0B0B0]" />
              <span className="text-slate-400">Mois Dernier</span>
            </div>
          </div>

          <Select value={service} onValueChange={(val) => setService(val || "all")}>
            <SelectTrigger className="w-[120px] h-[32px] text-xs bg-white border border-[#EBEFF2] rounded-lg shadow-none text-slate-600 font-semibold focus:ring-0">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous Services</SelectItem>
              <SelectItem value="study">Études</SelectItem>
              <SelectItem value="tourism">Tourisme</SelectItem>
              <SelectItem value="omra">Omra</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={(val) => setPeriod(val || "monthly")}>
            <SelectTrigger className="w-[90px] h-[32px] text-xs bg-white border border-[#EBEFF2] rounded-lg shadow-none text-slate-600 font-semibold focus:ring-0">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Quotidien</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart Block */}
      <div className="w-full h-[220px] min-h-[220px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="day" 
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
            <Line 
              type="monotone" 
              dataKey="actuel" 
              stroke="#0052cc" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, stroke: "#0052cc", strokeWidth: 1.5, fill: "#ffffff" }}
            />
            <Line 
              type="monotone" 
              dataKey="passe" 
              stroke="#B0B0B0" 
              strokeWidth={1.5} 
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 3, stroke: "#B0B0B0", strokeWidth: 1, fill: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
