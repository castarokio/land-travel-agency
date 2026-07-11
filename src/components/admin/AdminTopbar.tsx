"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export default function AdminTopbar({
  title,
  searchQuery,
  onSearchChange,
  placeholder = "Rechercher..."
}: TopbarProps) {
  return (
    <header className="h-[70px] bg-white border-b border-[#E9E9E9] flex items-center justify-between px-8 sticky top-0 z-20 font-sans">
      <h2 className="text-xl font-bold text-[#111111]">{title}</h2>
      
      <div className="relative w-full max-w-[290px]">
        <Search className="absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-[#E9E9E9] bg-white pl-10 pr-4 text-xs outline-none transition-all duration-150 focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
        />
      </div>
    </header>
  );
}
