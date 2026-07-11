"use client";

import React, { useState } from "react";
import { Menu, X, Lock } from "lucide-react";
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
        return "Dashboard";
      case "students":
        return "Suivi des Candidatures";
      case "inquiries":
        return "Demandes Formulaires";
      case "universities":
        return "Catalogue Universités";
      case "packages":
        return "Formules de Voyage";
      default:
        return "Console Admin";
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-3 md:p-6 flex flex-col font-sans select-none justify-stretch">
      {/* Premium Safari/macOS Window Frame Mockup */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-300 shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col min-h-0">
        
        {/* Safari Browser Top Header Bar */}
        <div className="h-[48px] bg-[#ECECEC] border-b border-[#D4D4D4] flex items-center px-4 justify-between shrink-0">
          {/* Traffic Lights buttons */}
          <div className="flex items-center gap-2 w-24">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FC5F5E] border border-black/5 inline-block cursor-default" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FDBE2C] border border-black/5 inline-block cursor-default" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#28C840] border border-black/5 inline-block cursor-default" />
          </div>
          
          {/* URL Address Bar */}
          <div className="flex-1 max-w-xl mx-auto h-7 bg-white rounded-[6px] border border-[#CCCCCC] flex items-center justify-center text-[11px] text-slate-500 font-medium gap-1.5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
            <Lock size={10} className="text-[#159768]" strokeWidth={2.5} />
            <span className="tracking-wide">https://landtravel.com/admin</span>
          </div>
          
          {/* Spacer */}
          <div className="w-24" />
        </div>

        {/* Inner Content Split: Sidebar + Main Area */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* Desktop Sidebar (Rendered locally inside browser container) */}
          <div className="hidden lg:block w-[268px] shrink-0 border-r border-[#EBEFF2] bg-[#F8F9FA] h-full">
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={onTabChange}
              adminName={adminName}
              adminEmail={adminEmail}
              onLogout={onLogout}
            />
          </div>

          {/* Mobile Drawer (Only visible when toggled) */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden flex">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200" 
                onClick={() => setMobileMenuOpen(false)}
              />
              {/* Drawer Content */}
              <div className="relative z-50 w-[280px] h-full flex-shrink-0 animate-slide-right bg-[#F8F9FA] border-r border-[#EBEFF2]">
                <div className="absolute top-4 right-4 z-50">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#E9E9E9] flex items-center justify-center text-[#666666] hover:text-[#111111]"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
                <div className="h-full py-4">
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
            </div>
          )}

          {/* Right Main Body */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#F4F5F6] overflow-y-auto">
            {/* Topbar: Handles active tab title + Search */}
            <div className="flex items-center bg-white border-b border-[#EBEFF2] sticky top-0 z-20 shrink-0">
              {/* Mobile Menu Open Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden ml-6 p-2 rounded-lg border border-[#E9E9E9] text-[#666666] hover:text-[#111111] transition-colors bg-white"
              >
                <Menu size={18} strokeWidth={2} />
              </button>
              
              <div className="flex-1">
                <AdminTopbar
                  title={getTabTitle(activeTab)}
                  searchQuery={searchQuery}
                  onSearchChange={onSearchChange}
                />
              </div>
            </div>

            {/* Dashboard Content Container */}
            <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
