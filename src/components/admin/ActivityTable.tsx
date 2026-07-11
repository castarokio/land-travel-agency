/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Printer, ChevronDown, ChevronsUpDown } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";

interface ActivityTableProps {
  inquiries: any[];
  onSelectInquiry?: (inquiry: any) => void;
}

export default function ActivityTable({ inquiries, onSelectInquiry }: ActivityTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const handleSelectAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) {
      filteredInquiries.forEach(item => {
        next[item.id] = true;
      });
    }
    setSelectedRows(next);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const filteredInquiries = inquiries.filter(item => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
      case "nouveau":
        return "text-[#0052cc] bg-[#e6f0ff] border-blue-100";
      case "processed":
      case "traité":
      case "completed":
        return "text-[#159768] bg-[#DFF5E9] border-emerald-100";
      case "contacted":
      case "contacté":
        return "text-amber-700 bg-amber-50 border-amber-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-[#EBEFF2] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-sans">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-sm font-extrabold text-[#0F172A] mb-1">Dernières Inscriptions</h3>
          <p className="text-xs text-slate-400 font-bold">Suivi et historique récent des prospects</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-[120px] h-[32px] text-xs border border-[#EBEFF2] rounded-lg bg-white shadow-none text-slate-600 font-semibold focus:ring-0">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous Statuts</SelectItem>
              <SelectItem value="new">Nouveaux</SelectItem>
              <SelectItem value="contacted">Contactés</SelectItem>
              <SelectItem value="processed">Traités</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={(val) => setTimeFilter(val || "all")}>
            <SelectTrigger className="w-[120px] h-[32px] text-xs border border-[#EBEFF2] rounded-lg bg-white shadow-none text-slate-600 font-semibold focus:ring-0">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={handlePrint}
            title="Imprimer"
            className="w-[32px] h-[32px] border border-[#EBEFF2] rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-none bg-white"
          >
            <Printer size={15} strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-[#EBEFF2] rounded-xl">
        <Table>
          <TableHeader className="bg-[#F8F9FA]">
            <TableRow className="border-b border-[#EBEFF2] hover:bg-transparent">
              <TableHead className="w-[40px] px-4 py-3">
                <input 
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={filteredInquiries.length > 0 && filteredInquiries.every(item => selectedRows[item.id])}
                  className="rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 cursor-pointer"
                />
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3">ID Demande</TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3">Nom Candidat</TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3">Service Demandé</TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3">Date & Heure</TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3">Contact</TableHead>
              <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-xs text-slate-400 font-semibold">
                  Aucune demande trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="border-b border-[#EBEFF2] hover:bg-[#F8F9FA]/50 cursor-pointer transition-colors duration-100"
                  onClick={() => onSelectInquiry?.(item)}
                >
                  <TableCell className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox"
                      checked={!!selectedRows[item.id]}
                      onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      className="rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-500 px-4 py-3.5">
                    #{item.id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-[#0F172A] px-4 py-3.5">
                    {item.name || item.full_name || item.fullName || "Prospect Land Travel"}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-500 px-4 py-3.5 capitalize">
                    {item.service_type || item.serviceType || item.service_options || "contact"}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-400 px-4 py-3.5">
                    {new Date(item.created_at).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-500 px-4 py-3.5">
                    {item.phone || item.email}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusStyle(item.status)}`}>
                      {item.status || "new"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
