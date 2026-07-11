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
    <div className="bg-white border border-[#E9E9E9] rounded-[10px] p-6 font-sans">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-sm font-bold text-[#111111] mb-1">Dernières Activités</h3>
          <p className="text-xs text-muted-foreground">Historique récent des demandes de contact et prospects</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-[120px] h-[34px] text-xs border border-[#E3E3E3] rounded-lg bg-white">
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
            <SelectTrigger className="w-[120px] h-[34px] text-xs border border-[#E3E3E3] rounded-lg bg-white">
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
            className="w-[34px] h-[34px] border border-[#E3E3E3] rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Printer size={16} strokeWidth={1.7} />
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
        <Table>
          <TableHeader className="bg-[#FAFAFA]">
            <TableRow className="border-b border-[#E9E9E9] hover:bg-transparent">
              <TableHead className="w-[40px] px-4 py-3">
                <input 
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={filteredInquiries.length > 0 && filteredInquiries.every(item => selectedRows[item.id])}
                  className="rounded border-[#DDDDDD] text-[#0052cc] focus:ring-[#0052cc]"
                />
              </TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3">ID Demande</TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3">Nom Candidat</TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3">Service Demandé</TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3">Date & Heure</TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3">Contact</TableHead>
              <TableHead className="text-xs font-semibold text-[#111111] px-4 py-3 text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-xs text-muted-foreground">
                  Aucune demande trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="border-b border-[#E9E9E9] hover:bg-[#FAFAFA] cursor-pointer transition-colors duration-100"
                  onClick={() => onSelectInquiry?.(item)}
                >
                  <TableCell className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox"
                      checked={!!selectedRows[item.id]}
                      onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      className="rounded border-[#DDDDDD] text-[#0052cc] focus:ring-[#0052cc]"
                    />
                  </TableCell>
                  <TableCell className="text-xs font-medium text-[#666666] px-4 py-3.5">
                    #{item.id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-[#111111] px-4 py-3.5">
                    {item.full_name || item.fullName}
                  </TableCell>
                  <TableCell className="text-xs text-[#666666] px-4 py-3.5 capitalize">
                    {item.service_type || item.serviceType || "contact"}
                  </TableCell>
                  <TableCell className="text-xs text-[#8B8B8B] px-4 py-3.5">
                    {new Date(item.created_at).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </TableCell>
                  <TableCell className="text-xs text-[#666666] px-4 py-3.5">
                    {item.phone || item.email}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <span className={`inline-block px-2.5 py-0.5 rounded-[6px] text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
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
