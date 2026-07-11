"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

type TabId = "overview" | "students" | "inquiries" | "universities" | "packages";

interface AdminShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  adminName: string;
  adminEmail: string;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  children: React.ReactNode;
}

export default function AdminShell({
  activeTab,
  onTabChange,
  adminName,
  adminEmail,
  onLogout,
  searchQuery,
  onSearchChange,
  children
}: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTabTitle = (tab: TabId) => {
    switch (tab) {
      case "overview":
        return "Dashboard d'Activité";
      case "students":
        return "Suivi des Candidats & Dossiers";
      case "inquiries":
        return "Demandes de Contact & Prospects";
      case "universities":
        return "Gestion des Universités";
      case "packages":
        return "Gestion des Offres & Packages";
      default:
        return "Console Admin";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex text-[#111111] font-sans">
      {/* Desktop Sidebar (Fixed left, hidden on tablet/mobile) */}
      <div className="hidden lg:block">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          adminName={adminName}
          adminEmail={adminEmail}
          onLogout={onLogout}
        />
      </div>

      {/* Mobile Off-Canvas Sidebar (Drawer) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200" 
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer Content */}
          <div className="relative z-50 w-[280px] h-full flex-shrink-0 animate-slide-right">
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-white border border-[#E9E9E9] flex items-center justify-center text-[#666666] hover:text-[#111111]"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                onTabChange(tab);
                setMobileMenuOpen(false);
              }}
              adminName={adminName}
              adminEmail={adminEmail}
              onLogout={onLogout}
            />
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 flex flex-col lg:pl-[268px] min-w-0">
        {/* Topbar Wrapper */}
        <div className="flex items-center bg-white border-b border-[#E9E9E9] sticky top-0 z-20">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden ml-6 p-2 rounded-lg border border-[#E9E9E9] text-[#666666] hover:text-[#111111] transition-colors"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
          
          <div className="flex-1">
            <AdminTopbar
              title={getTabTitle(activeTab)}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
