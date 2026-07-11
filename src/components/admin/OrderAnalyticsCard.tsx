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
      <div className="bg-[#111111] text-white p-3 rounded-lg border border-black/10 shadow-lg font-sans text-xs">
        <p className="font-semibold text-[10px] text-muted-foreground mb-1">Jour {label}</p>
        <p className="font-bold text-sm text-white">{payload[0].value} Inscriptions</p>
        {payload[1] && (
          <p className="text-[10px] text-[#A5A5A5] mt-0.5">Mois Dernier: {payload[1].value}</p>
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
    <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none font-sans flex flex-col h-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-[#111111]">Analyse des Inscriptions</h3>
            <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#DFF5E9] text-[#159768]">
              <ArrowUp size={8} strokeWidth={3} />
              <span>+15%</span>
            </div>
            <span className="text-[10px] text-muted-foreground">/Mois</span>
          </div>
          <p className="text-xs text-[#666666]">Excellente croissance de l'intérêt étudiant 📈</p>
        </div>

        {/* Filters and Legend */}
        <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto justify-end">
          <div className="flex items-center gap-4 text-xs font-semibold mr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-[#111111]">Ce Mois</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A5A5A5]" />
              <span className="text-muted-foreground">Mois Dernier</span>
            </div>
          </div>

          <Select value={service} onValueChange={(val) => setService(val || "all")}>
            <SelectTrigger className="w-[120px] h-[34px] text-xs bg-white border border-[#E3E3E3] rounded-lg">
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
            <SelectTrigger className="w-[100px] h-[34px] text-xs bg-white border border-[#E3E3E3] rounded-lg">
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
      <div className="flex-1 w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F3" />
            <XAxis 
              dataKey="day" 
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
            <Line 
              type="monotone" 
              dataKey="actuel" 
              stroke="#111111" 
              strokeWidth={1.5} 
              dot={false}
              activeDot={{ r: 4, stroke: "#111111", strokeWidth: 1 }}
            />
            <Line 
              type="monotone" 
              dataKey="passe" 
              stroke="#A5A5A5" 
              strokeWidth={1.25} 
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 3, stroke: "#A5A5A5", strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
