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
  LogOut
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

  const navItems = [
    {
      id: "overview" as TabId,
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "students" as TabId,
      label: "Students Portal",
      icon: Users
    },
    {
      id: "inquiries" as TabId,
      label: "Inquiries Panel",
      icon: Mail
    }
  ];

  return (
    <aside className="w-[268px] bg-[#FAFAFA] border-r border-[#E9E9E9] flex flex-col h-screen fixed left-0 top-0 z-30 font-sans">
      {/* Brand Header */}
      <div className="h-[70px] border-b border-[#E9E9E9] flex items-center px-6 gap-3">
        <div className="w-[42px] h-[42px] bg-[#0052cc] rounded-[10px] flex items-center justify-center text-white font-bold text-xl shadow-sm">
          LT
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#111111] leading-none">Land Travel</h1>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Console Admin</span>
        </div>
      </div>

      {/* Admin Profile Card */}
      <div className="px-4 py-6 border-b border-[#E9E9E9]">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-black/[0.03] shadow-[0_2px_7px_rgba(0,0,0,0.06)]">
          <Avatar className="h-[36px] w-[36px] border border-[#E9E9E9]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#0052cc] text-white text-xs font-bold">
              {adminName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#111111]">{adminName}</p>
            <p className="text-[10px] text-muted-foreground">Super Admin</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Account settings">
            <Settings size={16} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 h-[44px] rounded-lg text-sm transition-all duration-150 text-left",
              activeTab === item.id 
                ? "bg-[#E9E9E9] text-[#111111] font-semibold" 
                : "text-[#666666] hover:bg-[#F0F0F0] hover:text-[#111111]"
            )}
          >
            <item.icon size={20} strokeWidth={1.7} className={activeTab === item.id ? "text-[#0052cc]" : ""} />
            <span>{item.label}</span>
          </button>
        ))}

        {/* Catalogs Group */}
        <div className="pt-4">
          <div 
            onClick={() => toggleMenu("catalogs")}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
          >
            <span>Offres & Catalogues</span>
            <ChevronDown 
              size={14} 
              className={cn("transition-transform duration-200", expandedMenus.catalogs && "rotate-180")} 
            />
          </div>
          
          {expandedMenus.catalogs && (
            <div className="mt-1 space-y-1 pl-2">
              <button
                onClick={() => onTabChange("universities")}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-[40px] rounded-lg text-sm transition-all duration-150 text-left",
                  activeTab === "universities" 
                    ? "bg-[#E9E9E9] text-[#111111] font-semibold" 
                    : "text-[#666666] hover:bg-[#F0F0F0] hover:text-[#111111]"
                )}
              >
                <GraduationCap size={18} strokeWidth={1.7} className={activeTab === "universities" ? "text-[#0052cc]" : ""} />
                <span>Universités</span>
              </button>
              <button
                onClick={() => onTabChange("packages")}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-[40px] rounded-lg text-sm transition-all duration-150 text-left",
                  activeTab === "packages" 
                    ? "bg-[#E9E9E9] text-[#111111] font-semibold" 
                    : "text-[#666666] hover:bg-[#F0F0F0] hover:text-[#111111]"
                )}
              >
                <Compass size={18} strokeWidth={1.7} className={activeTab === "packages" ? "text-[#0052cc]" : ""} />
                <span>Voyages & Packages</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-[#E9E9E9]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 h-[44px] rounded-lg text-sm text-[#FC5F5E] hover:bg-[#FDE9E9] transition-colors text-left"
        >
          <LogOut size={20} strokeWidth={1.7} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
