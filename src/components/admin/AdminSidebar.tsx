/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  GraduationCap, 
  Compass, 
  Settings, 
  ChevronDown,
  LogOut,
  Megaphone,
  LifeBuoy
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type TabId = "overview" | "students" | "inquiries" | "universities" | "packages";

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  adminName: string;
  adminEmail: string;
  onLogout: () => void;
}

export default function AdminSidebar({
  activeTab,
  onTabChange,
  adminName,
  adminEmail,
  onLogout
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    catalogs: true
  });

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full h-full flex flex-col font-sans bg-[#F8F9FA]">
      {/* Brand Header */}
      <div className="h-[76px] flex items-center px-6 gap-3">
        <div className="w-[38px] h-[38px] bg-[#0052cc] rounded-[10px] flex items-center justify-center text-white font-bold text-lg shadow-sm">
          LT
        </div>
        <div>
          <h1 className="text-base font-bold text-[#0F172A] leading-tight">Land Travel</h1>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Console Admin</span>
        </div>
      </div>

      {/* Admin Profile Card - Styled exactly like WeEats */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 bg-white p-3.5 rounded-[14px] border border-[#EBEFF2] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Avatar className="h-[38px] w-[38px] border border-[#EBEFF2]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#0052cc] text-white text-xs font-bold">
              {adminName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-[#0F172A]">{adminName}</p>
            <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1" title="Paramètres">
            <Settings size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-5 py-2 space-y-1">
        <button
          onClick={() => onTabChange("overview")}
          className={cn(
            "w-full flex items-center gap-3 px-4 h-[44px] rounded-xl text-sm transition-all duration-150 text-left mb-1",
            activeTab === "overview" 
              ? "bg-[#F1F5F9] text-[#0F172A] font-bold" 
              : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium"
          )}
        >
          <LayoutDashboard size={18} strokeWidth={2} className={activeTab === "overview" ? "text-[#0052cc]" : ""} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onTabChange("students")}
          className={cn(
            "w-full flex items-center gap-3 px-4 h-[44px] rounded-xl text-sm transition-all duration-150 text-left mb-1",
            activeTab === "students" 
              ? "bg-[#F1F5F9] text-[#0F172A] font-bold" 
              : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium"
          )}
        >
          <Users size={18} strokeWidth={2} className={activeTab === "students" ? "text-[#0052cc]" : ""} />
          <span>Étudiants & Dossiers</span>
        </button>

        <button
          onClick={() => onTabChange("inquiries")}
          className={cn(
            "w-full flex items-center gap-3 px-4 h-[44px] rounded-xl text-sm transition-all duration-150 text-left mb-1",
            activeTab === "inquiries" 
              ? "bg-[#F1F5F9] text-[#0F172A] font-bold" 
              : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium"
          )}
        >
          <Mail size={18} strokeWidth={2} className={activeTab === "inquiries" ? "text-[#0052cc]" : ""} />
          <span>Prospects / Messages</span>
        </button>

        {/* Catalogs Group */}
        <div className="pt-4">
          <div 
            onClick={() => toggleMenu("catalogs")}
            className="flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600"
          >
            <span>Catalogues Offres</span>
            <ChevronDown 
              size={12} 
              className={cn("transition-transform duration-200", expandedMenus.catalogs && "rotate-180")} 
            />
          </div>
          
          {expandedMenus.catalogs && (
            <div className="mt-1 space-y-1 pl-1">
              <button
                onClick={() => onTabChange("universities")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 h-[40px] rounded-xl text-sm transition-all duration-150 text-left",
                  activeTab === "universities" 
                    ? "bg-[#F1F5F9] text-[#0F172A] font-bold" 
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium"
                )}
              >
                <GraduationCap size={16} strokeWidth={2} className={activeTab === "universities" ? "text-[#0052cc]" : ""} />
                <span>Universités</span>
              </button>
              <button
                onClick={() => onTabChange("packages")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 h-[40px] rounded-xl text-sm transition-all duration-150 text-left",
                  activeTab === "packages" 
                    ? "bg-[#F1F5F9] text-[#0F172A] font-bold" 
                    : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium"
                )}
              >
                <Compass size={16} strokeWidth={2} className={activeTab === "packages" ? "text-[#0052cc]" : ""} />
                <span>Voyages & Packages</span>
              </button>
            </div>
          )}
        </div>

        {/* Mocking the "Others" section from reference */}
        <div className="pt-6">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Autres
          </div>
          <div className="mt-1 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 h-[40px] rounded-xl text-sm text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium text-left">
              <Megaphone size={16} strokeWidth={2} />
              <span>Marketing</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 h-[40px] rounded-xl text-sm text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] font-medium text-left">
              <LifeBuoy size={16} strokeWidth={2} />
              <span>Support Client</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Footer */}
      <div className="p-5 border-t border-[#EBEFF2]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 h-[44px] rounded-xl text-sm text-[#FC5F5E] hover:bg-[#FDE9E9] transition-colors text-left font-bold"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
