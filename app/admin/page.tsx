/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  Trash2, 
  Edit, 
  Plus, 
  Upload, 
  Check, 
  X,
  MessageSquare,
  FileText,
  Loader2,
  Calendar,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Admin UI Components
import AdminShell from "@/components/admin/AdminShell";
import MetricSummaryCard from "@/components/admin/MetricSummaryCard";
import PerformanceCard from "@/components/admin/PerformanceCard";
import OrderAnalyticsCard from "@/components/admin/OrderAnalyticsCard";
import RevenueProfileCard from "@/components/admin/RevenueProfileCard";
import ActivityTable from "@/components/admin/ActivityTable";

type TabId = "overview" | "students" | "inquiries" | "universities" | "packages";

export default function AdminPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Data lists
  const [students, setStudents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  // Selected student details
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDocs, setStudentDocs] = useState<any[]>([]);
  const [studentApp, setStudentApp] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Chat auto-scroll reference
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add Catalog States
  const [newUni, setNewUni] = useState({ id: "", name: "", country: "", city: "", tuition_range: "", language: "", rank: "", logo_url: "" });
  const [newPkg, setNewPkg] = useState({ id: "", title: "", type: "local", base_price: "", duration: "", image_url: "" });

  // Edit Catalog States
  const [editingUni, setEditingUni] = useState<any>(null);
  const [editingPkg, setEditingPkg] = useState<any>(null);

  // Upload progress states
  const [uploadingImage, setUploadingImage] = useState(false);

  const supabase = createClient();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    // 1. Fetch inquiries
    const { data: inqs } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(inqs || []);

    // 2. Fetch clients/students
    const { data: clients } = await supabase
      .from("profiles")
      .select(`
        id, email, name, role, created_at,
        client_profiles (
          dossier_number,
          selected_service,
          assigned_advisor_id
        )
      `)
      .eq("role", "client")
      .order("created_at", { ascending: false });
    setStudents(clients || []);

    // 3. Fetch universities
    const { data: unis } = await supabase
      .from("universities")
      .select("*")
      .order("name", { ascending: true });
    setUniversities(unis || []);

    // 4. Fetch packages
    const { data: pkgs } = await supabase
      .from("travel_packages")
      .select("*")
      .order("title", { ascending: true });
    setPackages(pkgs || []);
  };

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        window.location.href = "/login";
        return;
      }
      setUser(session.user);

      // Verify admin/advisor role
      const { data: prof } = await supabase
        .from("profiles")
        .select("id, name, role, email")
        .eq("id", session.user.id)
        .single();

      if (!prof || (prof.role !== "admin" && prof.role !== "advisor")) {
        window.location.href = "/portal";
        return;
      }
      setProfile(prof);

      await loadData();
      setLoading(false);
    };

    checkAuthAndLoad();
  }, [supabase]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle active student selection & load their dossier + chat
  const handleSelectStudent = async (student: any) => {
    setSelectedStudent(student);
    setChatMessages([]);
    setNewMsg("");

    // Load active application
    const { data: apps } = await supabase
      .from("applications")
      .select("*")
      .eq("client_id", student.id)
      .order("created_at", { ascending: false });
    
    const activeApp = apps?.[0] || null;
    setStudentApp(activeApp);

    if (activeApp) {
      // Load documents
      const { data: docs } = await supabase
        .from("documents")
        .select("*")
        .eq("application_id", activeApp.id)
        .order("created_at", { ascending: true });
      setStudentDocs(docs || []);
    } else {
      setStudentDocs([]);
    }

    // Load chat messages
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("*")
      .or(`sender_id.eq.${student.id},recipient_id.eq.${student.id}`)
      .order("created_at", { ascending: true });
    setChatMessages(msgs || []);
  };

  // Chat subscription for active student
  useEffect(() => {
    if (!selectedStudent) return;

    const channel = supabase
      .channel(`chat_admin_${selectedStudent.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages"
        },
        (payload) => {
          const newMsg = payload.new;
          if (newMsg.sender_id === selectedStudent.id || newMsg.recipient_id === selectedStudent.id) {
            setChatMessages(prev => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedStudent, supabase]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !user || !selectedStudent) return;

    const msgText = newMsg;
    setNewMsg("");

    const { error } = await supabase.from("chat_messages").insert({
      sender_id: user.id,
      recipient_id: selectedStudent.id,
      message_text: msgText,
      is_read: false,
    });

    if (error) {
      triggerToast("❌ Impossible d'envoyer le message.");
    }
  };

  // Image Upload Helper to Supabase Storage
  const handleUploadImage = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `catalog/${fileName}`;

      const { data, error } = await supabase.storage
        .from("assets")
        .upload(filePath, file);

      if (error) {
        triggerToast("❌ Échec de l'envoi de la photo: " + error.message);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (e) {
      triggerToast("❌ Erreur lors du chargement de la photo.");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Document verification status updates
  const handleUpdateDocStatus = async (docId: string, status: string) => {
    const { error } = await supabase
      .from("documents")
      .update({ status })
      .eq("id", docId);

    if (error) {
      triggerToast("❌ Impossible de mettre à jour le statut.");
      return;
    }

    setStudentDocs(prev => prev.map(d => d.id === docId ? { ...d, status } : d));
    triggerToast("✓ Statut du document mis à jour.");

    // Send automated in-app notification to client
    await supabase.from("notifications").insert({
      user_id: selectedStudent.id,
      title: "Mise à jour de document",
      description: `Le statut du document a été changé en : ${status === "approved" ? "Approuvé" : status === "action_required" ? "Action Requis" : "En cours"}`,
      is_read: false
    });
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (inqId: string, status: string) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", inqId);

    if (error) {
      triggerToast("❌ Impossible de mettre à jour le statut.");
      return;
    }

    setInquiries(prev => prev.map(i => i.id === inqId ? { ...i, status } : i));
    triggerToast("✓ Statut de la demande mis à jour.");
  };

  // University CRUD handlers
  const handleAddUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUni.id || !newUni.name || !newUni.country) return;

    const { error } = await supabase.from("universities").insert({
      id: newUni.id.toLowerCase().trim(),
      name: newUni.name,
      country: newUni.country,
      city: newUni.city,
      tuition_range: newUni.tuition_range,
      language: newUni.language,
      rank: newUni.rank ? parseInt(newUni.rank) : null,
      logo_url: newUni.logo_url || null,
      rating: 4.8
    });

    if (error) {
      triggerToast("❌ Échec d'ajout : " + error.message);
      return;
    }

    setNewUni({ id: "", name: "", country: "", city: "", tuition_range: "", language: "", rank: "", logo_url: "" });
    triggerToast("🎉 Université ajoutée au catalogue !");
    loadData();
  };

  const handleUpdateUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;

    const { error } = await supabase
      .from("universities")
      .update({
        name: editingUni.name,
        country: editingUni.country,
        city: editingUni.city,
        tuition_range: editingUni.tuition_range,
        language: editingUni.language,
        rank: editingUni.rank ? parseInt(editingUni.rank) : null,
        logo_url: editingUni.logo_url
      })
      .eq("id", editingUni.id);

    if (error) {
      triggerToast("❌ Échec de modification : " + error.message);
      return;
    }

    setEditingUni(null);
    triggerToast("🎉 Catalogue université mis à jour !");
    loadData();
  };

  const handleDeleteUniversity = async (id: string) => {
    if (!confirm("Voulez-vous vraiment retirer cette université du catalogue ?")) return;
    const { error } = await supabase.from("universities").delete().eq("id", id);
    if (error) {
      triggerToast("❌ Échec de suppression.");
      return;
    }
    triggerToast("Université supprimée.");
    loadData();
  };

  // Package CRUD handlers
  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.id || !newPkg.title) return;

    const { error } = await supabase.from("travel_packages").insert({
      id: newPkg.id.toLowerCase().trim(),
      title: newPkg.title,
      type: newPkg.type,
      base_price: newPkg.base_price ? parseFloat(newPkg.base_price) : null,
      duration: newPkg.duration,
      image_url: newPkg.image_url || null
    });

    if (error) {
      triggerToast("❌ Échec d'ajout : " + error.message);
      return;
    }

    setNewPkg({ id: "", title: "", type: "local", base_price: "", duration: "", image_url: "" });
    triggerToast("🎉 Formule de voyage ajoutée !");
    loadData();
  };

  const handleUpdatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    const { error } = await supabase
      .from("travel_packages")
      .update({
        title: editingPkg.title,
        type: editingPkg.type,
        base_price: editingPkg.base_price ? parseFloat(editingPkg.base_price) : null,
        duration: editingPkg.duration,
        image_url: editingPkg.image_url
      })
      .eq("id", editingPkg.id);

    if (error) {
      triggerToast("❌ Échec de modification : " + error.message);
      return;
    }

    setEditingPkg(null);
    triggerToast("🎉 Formule de voyage mise à jour !");
    loadData();
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette offre de voyage ?")) return;
    const { error } = await supabase.from("travel_packages").delete().eq("id", id);
    if (error) {
      triggerToast("❌ Échec de suppression.");
      return;
    }
    triggerToast("Formule de voyage supprimée.");
    loadData();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#0052cc] mx-auto" />
          <p className="text-sm font-semibold text-neutral-500">Chargement de la console d'administration...</p>
        </div>
      </div>
    );
  }

  // Filter inquiries based on global top-bar query
  const filteredInquiries = inquiries.filter(inq => {
    const term = searchQuery.toLowerCase();
    return (
      inq.name?.toLowerCase().includes(term) ||
      inq.phone?.toLowerCase().includes(term) ||
      inq.service_type?.toLowerCase().includes(term) ||
      inq.message?.toLowerCase().includes(term)
    );
  });

  return (
    <AdminShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      adminName={profile?.name || "Admin"}
      adminEmail={profile?.email || ""}
      onLogout={handleSignOut}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {/* Toast Notifier */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#111111] text-white px-5 py-4 rounded-xl shadow-lg flex items-center justify-between gap-4 z-50 fixed top-6 right-6 font-sans text-xs font-bold"
          >
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Metrics & Performance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MetricSummaryCard 
                totalClients={students.length} 
                totalRevenue="€25,843" 
                newLeadsCount={inquiries.filter(i => i.status === "new").length} 
              />
            </div>
            <div className="lg:col-span-1">
              <PerformanceCard conversionRate={82} responseRate={90} />
            </div>
          </div>

          {/* Analytics Graphs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OrderAnalyticsCard />
            </div>
            <div className="lg:col-span-1">
              <RevenueProfileCard />
            </div>
          </div>

          {/* Activity Data Table */}
          <ActivityTable 
            inquiries={inquiries} 
            onSelectInquiry={(inq) => {
              setActiveTab("inquiries");
              setSearchQuery(inq.name); // Prefills search query to filter down to selected inquiry
            }} 
          />
        </div>
      )}

      {/* CANDIDATURES / STUDENTS TAB */}
      {activeTab === "students" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
          {/* Left panel: student dossiers list */}
          <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none lg:col-span-4 flex flex-col h-[640px]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#111111] mb-1 font-sans">Portefeuilles Candidats</h3>
              <p className="text-[10px] text-muted-foreground">Sélectionnez un étudiant pour valider ses documents</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {students.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                const dNum = student.client_profiles?.[0]?.dossier_number || "LT-0000";
                return (
                  <button
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      isSelected 
                        ? "bg-[#0052cc]/5 border-[#0052cc]/20" 
                        : "bg-white border-[#E9E9E9] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <span className="font-bold text-[#111111] text-xs block">{student.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{student.email}</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#E9E9E9] text-[#111111] font-bold">
                        #{dNum}
                      </span>
                      <span className="text-[9px] text-[#0052cc] font-bold uppercase tracking-wider">
                        {student.client_profiles?.[0]?.selected_service || "contact"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Right panel: checklist dossier verification & real-time chat */}
          <div className="lg:col-span-8 space-y-6">
            {selectedStudent ? (
              <>
                {/* Documents Verification Card */}
                <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none">
                  <div className="border-b border-[#E9E9E9] pb-4 mb-6">
                    <span className="text-[9px] font-bold text-[#0052cc] uppercase tracking-widest block mb-1">
                      Dossier #{selectedStudent.client_profiles?.[0]?.dossier_number}
                    </span>
                    <h3 className="text-base font-bold text-[#111111]">
                      Candidature de {selectedStudent.name}
                    </h3>
                    {studentApp ? (
                      <p className="text-xs text-[#666666] mt-1">
                        <strong>Service Ciblé :</strong> {studentApp.title} ({studentApp.destination})
                      </p>
                    ) : (
                      <p className="text-xs text-[#FC5F5E] italic mt-1">Aucune formule de candidature initialisée.</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {studentDocs.length === 0 ? (
                      <p className="text-muted-foreground text-center italic text-xs py-6">Aucun document téléversé pour le moment.</p>
                    ) : (
                      studentDocs.map((doc) => {
                        const fileUrlPath = doc.file_url 
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dossiers/${doc.file_url}`
                          : null;

                        return (
                          <div key={doc.id} className="p-4 bg-[#FAFAFA] border border-[#E9E9E9] rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                            <div>
                              <span className="font-bold text-[#111111] block">{doc.name}</span>
                              <span className="text-[10px] text-muted-foreground block">Catégorie : {doc.category}</span>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                              {fileUrlPath ? (
                                <a 
                                  href={fileUrlPath} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-3 py-1.5 bg-white border border-[#E9E9E9] rounded-lg text-[#666666] hover:bg-[#FAFAFA] hover:text-[#111111] transition-colors font-bold flex items-center gap-1.5"
                                >
                                  <Eye size={12} />
                                  <span>Voir</span>
                                </a>
                              ) : (
                                <span className="text-[10px] text-muted-foreground italic mr-2">Non téléversé</span>
                              )}

                              {doc.status === "pending_verification" ? (
                                <div className="flex gap-1.5">
                                  <Button 
                                    onClick={() => handleUpdateDocStatus(doc.id, "approved")}
                                    className="h-8 bg-[#159768] hover:bg-[#0e8056] text-white text-[10px] font-bold rounded-lg px-3"
                                  >
                                    Approuver
                                  </Button>
                                  <Button 
                                    onClick={() => handleUpdateDocStatus(doc.id, "action_required")}
                                    className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg px-3"
                                  >
                                    Correction
                                  </Button>
                                </div>
                              ) : (
                                <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold border ${
                                  doc.status === "approved" 
                                    ? "bg-[#DFF5E9] text-[#159768] border-emerald-100" 
                                    : doc.status === "action_required" 
                                    ? "bg-[#FDE9E9] text-[#FC5F5E] border-red-100" 
                                    : "bg-[#F3F3F3] text-slate-500 border-[#E9E9E9]"
                                }`}>
                                  {doc.status === "approved" ? "Approuvé" : doc.status === "action_required" ? "Action Requis" : "En attente"}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </Card>

                {/* Real-time Messenger Card */}
                <Card className="rounded-[10px] border border-[#E9E9E9] bg-white overflow-hidden flex flex-col h-[400px]">
                  <div className="p-4 bg-[#111111] text-white flex items-center gap-3">
                    <Avatar className="h-[32px] w-[32px] border border-white/10">
                      <AvatarFallback className="bg-[#0052cc] text-white text-xs font-bold">
                        {selectedStudent.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-bold text-xs block text-white">{selectedStudent.name}</span>
                      <span className="text-[9px] text-[#A5A5A5] font-semibold uppercase tracking-wider">Chat Intégré Candidat</span>
                    </div>
                  </div>

                  {/* Messages list */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFAFA]">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground italic text-xs">
                        Aucun message échangé pour le moment.
                      </div>
                    ) : (
                      chatMessages.map((m) => {
                        const isSelf = m.sender_id === user?.id;
                        return (
                          <div 
                            key={m.id}
                            className={cn("flex flex-col max-w-[80%] font-sans", isSelf ? "ml-auto items-end" : "mr-auto items-start")}
                          >
                            <div 
                              className={cn(
                                "p-3 rounded-2xl leading-relaxed text-xs shadow-sm border",
                                isSelf 
                                  ? "bg-[#0052cc] text-white border-blue-600 rounded-tr-none" 
                                  : "bg-white text-neutral-800 border-[#E9E9E9] rounded-tl-none"
                              )}
                            >
                              <p>{m.message_text}</p>
                            </div>
                            <span className="text-[8px] text-muted-foreground mt-1 px-1">
                              {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        );
                      })
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E9E9E9] flex gap-2 bg-white">
                    <Input
                      type="text"
                      placeholder={`Répondre à ${selectedStudent.name}...`}
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      className="flex-1 bg-[#FAFAFA] rounded-lg px-3.5 py-2 border border-[#E9E9E9] text-xs outline-none focus:border-[#0052cc] focus:bg-white transition-all h-9"
                    />
                    <Button
                      type="submit"
                      disabled={!newMsg.trim()}
                      className="px-4 h-9 bg-[#0052cc] hover:bg-[#003e9f] text-white font-bold text-xs transition-colors rounded-lg disabled:opacity-50"
                    >
                      Envoyer
                    </Button>
                  </form>
                </Card>
              </>
            ) : (
              <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-12 shadow-none text-center text-muted-foreground italic text-xs">
                Sélectionnez un étudiant dans la liste de gauche pour consulter son dossier et discuter en temps réel.
              </Card>
            )}
          </div>
        </div>
      )}

      {/* PROSPECTS / FORM INQUIRIES TAB */}
      {activeTab === "inquiries" && (
        <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none font-sans">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#111111] mb-1 font-sans">Traitement des prospects</h3>
            <p className="text-xs text-muted-foreground">Consultez et traitez les demandes de contacts reçues depuis le site internet.</p>
          </div>

          <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E9E9E9] text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                  <th className="p-4">Candidat</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Formule Cible</th>
                  <th className="p-4">Message / Projet</th>
                  <th className="p-4">Préféré</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E9]">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground italic">Aucune demande trouvée.</td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#FAFAFA] transition-colors duration-100">
                      <td className="p-4 font-bold text-[#111111]">
                        <div className="flex flex-col">
                          <span>{inq.name}</span>
                          <span className="text-[10px] text-muted-foreground font-medium">{inq.phone} • {inq.email || "Pas d'email"}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-[#666666] capitalize">{inq.service_type}</td>
                      <td className="p-4 font-semibold text-slate-700">{inq.destination_or_package || "Non spécifié"}</td>
                      <td className="p-4 text-[#666666] leading-relaxed max-w-xs truncate" title={inq.message}>{inq.message || "-"}</td>
                      <td className="p-4 capitalize text-muted-foreground font-semibold">{inq.preferred_contact || "whatsapp"}</td>
                      <td className="p-4 text-right flex gap-1.5 justify-end">
                        {inq.status === "new" ? (
                          <>
                            <Button 
                              onClick={() => handleUpdateInquiryStatus(inq.id, "contacted")}
                              className="h-8 bg-[#0052cc] hover:bg-[#003e9f] text-white text-[10px] font-bold rounded-lg px-2.5"
                            >
                              Contacté
                            </Button>
                            <Button 
                              onClick={() => handleUpdateInquiryStatus(inq.id, "processed")}
                              className="h-8 bg-[#159768] hover:bg-[#0e8056] text-white text-[10px] font-bold rounded-lg px-2.5"
                            >
                              Marquer traité
                            </Button>
                          </>
                        ) : (
                          <span className="text-muted-foreground italic font-semibold capitalize pr-2">{inq.status}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* UNIVERSITIES CATALOG TAB */}
      {activeTab === "universities" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
          
          {/* Add University Form Panel */}
          <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none lg:col-span-4 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Ajouter une Université</h3>
              <p className="text-[10px] text-muted-foreground">Intégrez de nouveaux établissements au moteur de recherche</p>
            </div>

            <form onSubmit={handleAddUniversity} className="space-y-3 text-xs">
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">ID (Slug unique, sans espace) *</span>
                <Input required placeholder="ex: mcgill, sorbonne" value={newUni.id} onChange={e => setNewUni({...newUni, id: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
              </label>
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">Nom de l'Université *</span>
                <Input required placeholder="ex: Université de la Sorbonne" value={newUni.name} onChange={e => setNewUni({...newUni, name: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Pays *</span>
                  <Input required placeholder="ex: France" value={newUni.country} onChange={e => setNewUni({...newUni, country: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Ville</span>
                  <Input placeholder="ex: Paris" value={newUni.city} onChange={e => setNewUni({...newUni, city: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Frais Annuel</span>
                  <Input placeholder="ex: 3 500 €" value={newUni.tuition_range} onChange={e => setNewUni({...newUni, tuition_range: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Langue</span>
                  <Input placeholder="ex: Français" value={newUni.language} onChange={e => setNewUni({...newUni, language: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Rang Mondial</span>
                  <Input type="number" placeholder="ex: 120" value={newUni.rank} onChange={e => setNewUni({...newUni, rank: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
                
                {/* Image Upload Block */}
                <div className="block">
                  <span className="font-bold text-[#666666] block mb-1">Logo / Image</span>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="uni-logo-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadImage(file);
                          if (url) {
                            setNewUni({ ...newUni, logo_url: url });
                            triggerToast("✓ Image importée avec succès !");
                          }
                        }
                      }}
                    />
                    <label 
                      htmlFor="uni-logo-upload"
                      className="h-9 w-full rounded-lg border border-[#E9E9E9] bg-white flex items-center justify-center gap-1.5 text-muted-foreground hover:bg-[#FAFAFA] cursor-pointer text-xs transition-colors"
                    >
                      <Upload size={14} />
                      <span>{uploadingImage ? "Téléversement..." : newUni.logo_url ? "Modifiée ✓" : "Importer"}</span>
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-9 bg-[#0052cc] hover:bg-[#003e9f] text-white font-bold text-xs rounded-lg shadow-sm">
                Valider l'ajout
              </Button>
            </form>
          </Card>

          {/* Universities Grid Listing */}
          <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none lg:col-span-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Catalogue des Établissements ({universities.length})</h3>
              <p className="text-xs text-muted-foreground">Modifiez ou supprimez les universités proposées au niveau de la recherche.</p>
            </div>

            <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E9E9E9] text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                    <th className="p-4">Logo</th>
                    <th className="p-4">Université</th>
                    <th className="p-4">Pays / Ville</th>
                    <th className="p-4">Langue / Frais</th>
                    <th className="p-4">Rang</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E9]">
                  {universities.map((uni) => (
                    <tr key={uni.id} className="hover:bg-[#FAFAFA] transition-colors duration-100">
                      <td className="p-4">
                        {uni.logo_url ? (
                          <img src={uni.logo_url} alt="" className="w-8 h-8 rounded-md object-contain border border-[#E9E9E9]" />
                        ) : (
                          <div className="w-8 h-8 rounded-md bg-[#e6f0ff] text-[#0052cc] flex items-center justify-center font-bold text-xs">
                            {uni.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-[#111111]">{uni.name}</td>
                      <td className="p-4 text-[#666666]">{uni.country} ({uni.city || "-"})</td>
                      <td className="p-4 text-[#666666]">{uni.language} • {uni.tuition_range || "Non spécifié"}</td>
                      <td className="p-4 font-bold text-[#666666]">{uni.rank ? `#${uni.rank}` : "-"}</td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => setEditingUni(uni)}
                            className="p-1.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Modifier"
                          >
                            <Edit size={12} />
                          </button>
                          <button 
                            onClick={() => handleDeleteUniversity(uni.id)}
                            className="p-1.5 bg-[#FDE9E9] text-[#FC5F5E] hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PACKAGES CATALOG TAB */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
          
          {/* Add Package Form Panel */}
          <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none lg:col-span-4 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Créer une Offre</h3>
              <p className="text-[10px] text-muted-foreground">Renseignez les séjours et formules pour les voyages et l'Omra</p>
            </div>

            <form onSubmit={handleAddPackage} className="space-y-3 text-xs">
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">ID (Slug unique, sans espace) *</span>
                <Input required placeholder="ex: omra-prestige, tunisie-confort" value={newPkg.id} onChange={e => setNewPkg({...newPkg, id: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
              </label>
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">Titre de l'Offre *</span>
                <Input required placeholder="ex: Formule Prestige VIP Haram" value={newPkg.title} onChange={e => setNewPkg({...newPkg, title: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Catégorie *</span>
                  <select 
                    value={newPkg.type} 
                    onChange={e => setNewPkg({...newPkg, type: e.target.value})} 
                    className="w-full h-9 px-3 rounded-lg border border-[#E9E9E9] bg-white text-xs outline-none focus:border-[#0052cc]"
                  >
                    <option value="local">Voyage Local</option>
                    <option value="international">Voyage International</option>
                    <option value="omra">Voyage Omra</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Durée (jours/nuits)</span>
                  <Input placeholder="ex: 15 Jours / 14 Nuits" value={newPkg.duration} onChange={e => setNewPkg({...newPkg, duration: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Tarif de Base (DZD)</span>
                  <Input type="number" placeholder="ex: 280000" value={newPkg.base_price} onChange={e => setNewPkg({...newPkg, base_price: e.target.value})} className="h-9 text-xs border-[#E9E9E9]" />
                </label>
                
                {/* Photo Upload Block */}
                <div className="block">
                  <span className="font-bold text-[#666666] block mb-1">Photo descriptive</span>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="pkg-image-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadImage(file);
                          if (url) {
                            setNewPkg({ ...newPkg, image_url: url });
                            triggerToast("✓ Photo importée avec succès !");
                          }
                        }
                      }}
                    />
                    <label 
                      htmlFor="pkg-image-upload"
                      className="h-9 w-full rounded-lg border border-[#E9E9E9] bg-white flex items-center justify-center gap-1.5 text-muted-foreground hover:bg-[#FAFAFA] cursor-pointer text-xs transition-colors"
                    >
                      <Upload size={14} />
                      <span>{uploadingImage ? "Envoi..." : newPkg.image_url ? "Photo ✓" : "Importer"}</span>
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-9 bg-[#0052cc] hover:bg-[#003e9f] text-white font-bold text-xs rounded-lg shadow-sm">
                Valider l'ajout
              </Button>
            </form>
          </Card>

          {/* Packages Grid Listing */}
          <Card className="rounded-[10px] border border-[#E9E9E9] bg-white p-6 shadow-none lg:col-span-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Formules & Offres Actives ({packages.length})</h3>
              <p className="text-xs text-muted-foreground">Consultez, modifiez et gérez la liste des offres disponibles.</p>
            </div>

            <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E9E9E9] text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                    <th className="p-4">Visuel</th>
                    <th className="p-4">Titre de la Formule</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Durée</th>
                    <th className="p-4">Prix de base</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E9]">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-[#FAFAFA] transition-colors duration-100">
                      <td className="p-4">
                        {pkg.image_url ? (
                          <img src={pkg.image_url} alt="" className="w-12 h-8 rounded-md object-cover border border-[#E9E9E9]" />
                        ) : (
                          <div className="w-12 h-8 rounded-md bg-[#e6f0ff] text-[#0052cc] flex items-center justify-center font-bold text-[10px]">
                            Voyage
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-[#111111]">{pkg.title}</td>
                      <td className="p-4 text-[#666666] capitalize">{pkg.type}</td>
                      <td className="p-4 text-[#666666]">{pkg.duration || "N/A"}</td>
                      <td className="p-4 font-bold text-[#666666]">
                        {pkg.base_price ? `${parseFloat(pkg.base_price).toLocaleString("fr-FR")} DZD` : "Sur devis"}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => setEditingPkg(pkg)}
                            className="p-1.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Modifier"
                          >
                            <Edit size={12} />
                          </button>
                          <button 
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-1.5 bg-[#FDE9E9] text-[#FC5F5E] hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ============================================================== */}
      {/* EDIT MODAL: UNIVERSITY */}
      {/* ============================================================== */}
      <Dialog open={!!editingUni} onOpenChange={(open) => !open && setEditingUni(null)}>
        <DialogContent className="sm:max-w-[425px] font-sans">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold text-[#111111]">Modifier l'Université</DialogTitle>
          </DialogHeader>
          {editingUni && (
            <form onSubmit={handleUpdateUniversity} className="space-y-4 text-xs pt-2">
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">Nom de l'Université *</span>
                <Input required value={editingUni.name} onChange={e => setEditingUni({...editingUni, name: e.target.value})} className="h-9 text-xs" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Pays *</span>
                  <Input required value={editingUni.country} onChange={e => setEditingUni({...editingUni, country: e.target.value})} className="h-9 text-xs" />
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Ville</span>
                  <Input value={editingUni.city || ""} onChange={e => setEditingUni({...editingUni, city: e.target.value})} className="h-9 text-xs" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Frais Annuel</span>
                  <Input value={editingUni.tuition_range || ""} onChange={e => setEditingUni({...editingUni, tuition_range: e.target.value})} className="h-9 text-xs" />
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Langue</span>
                  <Input value={editingUni.language || ""} onChange={e => setEditingUni({...editingUni, language: e.target.value})} className="h-9 text-xs" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Rang Mondial</span>
                  <Input type="number" value={editingUni.rank || ""} onChange={e => setEditingUni({...editingUni, rank: e.target.value})} className="h-9 text-xs" />
                </label>
                
                <div className="block">
                  <span className="font-bold text-[#666666] block mb-1">Changer le Logo</span>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="edit-uni-logo"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadImage(file);
                          if (url) {
                            setEditingUni({ ...editingUni, logo_url: url });
                            triggerToast("✓ Logo téléversé !");
                          }
                        }
                      }}
                    />
                    <label 
                      htmlFor="edit-uni-logo"
                      className="h-9 w-full rounded-lg border border-[#E9E9E9] bg-white flex items-center justify-center gap-1.5 text-muted-foreground hover:bg-[#FAFAFA] cursor-pointer text-xs transition-colors"
                    >
                      <Upload size={14} />
                      <span>{uploadingImage ? "Envoi..." : editingUni.logo_url ? "Modifié ✓" : "Remplacer"}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingUni(null)} className="h-9 rounded-lg text-xs">
                  Annuler
                </Button>
                <Button type="submit" className="h-9 bg-[#0052cc] hover:bg-[#003e9f] text-white font-bold rounded-lg text-xs">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ============================================================== */}
      {/* EDIT MODAL: TRAVEL PACKAGE */}
      {/* ============================================================== */}
      <Dialog open={!!editingPkg} onOpenChange={(open) => !open && setEditingPkg(null)}>
        <DialogContent className="sm:max-w-[425px] font-sans">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold text-[#111111]">Modifier l'Offre de Voyage</DialogTitle>
          </DialogHeader>
          {editingPkg && (
            <form onSubmit={handleUpdatePackage} className="space-y-4 text-xs pt-2">
              <label className="block">
                <span className="font-bold text-[#666666] block mb-1">Titre de la Formule *</span>
                <Input required value={editingPkg.title} onChange={e => setEditingPkg({...editingPkg, title: e.target.value})} className="h-9 text-xs" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Catégorie *</span>
                  <select 
                    value={editingPkg.type} 
                    onChange={e => setEditingPkg({...editingPkg, type: e.target.value})} 
                    className="w-full h-9 px-3 rounded-lg border border-[#E9E9E9] bg-white text-xs outline-none focus:border-[#0052cc]"
                  >
                    <option value="local">Voyage Local</option>
                    <option value="international">Voyage International</option>
                    <option value="omra">Voyage Omra</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Durée (jours/nuits)</span>
                  <Input value={editingPkg.duration || ""} onChange={e => setEditingPkg({...editingPkg, duration: e.target.value})} className="h-9 text-xs" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="font-bold text-[#666666] block mb-1">Tarif de Base (DZD)</span>
                  <Input type="number" value={editingPkg.base_price || ""} onChange={e => setEditingPkg({...editingPkg, base_price: e.target.value})} className="h-9 text-xs" />
                </label>
                
                <div className="block">
                  <span className="font-bold text-[#666666] block mb-1">Changer la Photo</span>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="edit-pkg-image"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleUploadImage(file);
                          if (url) {
                            setEditingPkg({ ...editingPkg, image_url: url });
                            triggerToast("✓ Photo téléversée !");
                          }
                        }
                      }}
                    />
                    <label 
                      htmlFor="edit-pkg-image"
                      className="h-9 w-full rounded-lg border border-[#E9E9E9] bg-white flex items-center justify-center gap-1.5 text-muted-foreground hover:bg-[#FAFAFA] cursor-pointer text-xs transition-colors"
                    >
                      <Upload size={14} />
                      <span>{uploadingImage ? "Envoi..." : editingPkg.image_url ? "Modifiée ✓" : "Remplacer"}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingPkg(null)} className="h-9 rounded-lg text-xs">
                  Annuler
                </Button>
                <Button type="submit" className="h-9 bg-[#0052cc] hover:bg-[#003e9f] text-white font-bold rounded-lg text-xs">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
