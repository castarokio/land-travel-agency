/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Mail, 
  GraduationCap, 
  Compass, 
  TrendingUp, 
  FileText, 
  Loader2, 
  LogOut, 
  MessageSquare, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Eye, 
  AlertCircle,
  Clock
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

type TabId = "overview" | "students" | "inquiries" | "universities" | "packages";

export default function AdminPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loading, setLoading] = useState(true);

  // Data lists
  const [students, setStudents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  // Selected details
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDocs, setStudentDocs] = useState<any[]>([]);
  const [studentApp, setStudentApp] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Forms states
  const [newUni, setNewUni] = useState({ id: "", name: "", country: "", city: "", tuition_range: "", language: "", rank: "" });
  const [newPkg, setNewPkg] = useState({ id: "", title: "", type: "local", base_price: "", duration: "" });

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
        .select("id, name, role")
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

  // Add university CRUD
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
      rating: 4.8
    });

    if (error) {
      triggerToast("❌ Échec d'ajout : " + error.message);
      return;
    }

    setNewUni({ id: "", name: "", country: "", city: "", tuition_range: "", language: "", rank: "" });
    triggerToast("🎉 Université ajoutée au catalogue !");
    loadData();
  };

  const handleDeleteUniversity = async (id: string) => {
    const { error } = await supabase.from("universities").delete().eq("id", id);
    if (error) {
      triggerToast("❌ Échec de suppression.");
      return;
    }
    triggerToast("Université supprimée.");
    loadData();
  };

  // Add package CRUD
  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.id || !newPkg.title) return;

    const { error } = await supabase.from("travel_packages").insert({
      id: newPkg.id.toLowerCase().trim(),
      title: newPkg.title,
      type: newPkg.type,
      base_price: newPkg.base_price ? parseFloat(newPkg.base_price) : null,
      duration: newPkg.duration
    });

    if (error) {
      triggerToast("❌ Échec d'ajout : " + error.message);
      return;
    }

    setNewPkg({ id: "", title: "", type: "local", base_price: "", duration: "" });
    triggerToast("🎉 Formule de voyage ajoutée !");
    loadData();
  };

  const handleDeletePackage = async (id: string) => {
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-semibold text-neutral-500">Chargement de la console d'administration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <span className="font-black text-white tracking-tight block">LAND TRAVEL</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Panel Admin</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${activeTab === "overview" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Vue d'ensemble</span>
            </button>
            <button 
              onClick={() => { setActiveTab("students"); setSelectedStudent(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${activeTab === "students" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Users className="w-4 h-4" />
              <span>Candidatures Étudiants</span>
            </button>
            <button 
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${activeTab === "inquiries" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Mail className="w-4 h-4" />
              <span>Demandes Formulaires</span>
              {inquiries.filter(i => i.status === "new").length > 0 && (
                <span className="ml-auto text-xs bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-md">
                  {inquiries.filter(i => i.status === "new").length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab("universities")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${activeTab === "universities" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Catalogue Universités</span>
            </button>
            <button 
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${activeTab === "packages" ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Compass className="w-4 h-4" />
              <span>Formules de Voyage</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 p-2 bg-slate-800/40 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
              {profile?.name?.slice(0, 2) || "AD"}
            </div>
            <div>
              <span className="font-bold text-xs text-white block">{profile?.name}</span>
              <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">{profile?.role}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* MAIN DYNAMIC CONTENT */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-6xl mx-auto w-full">
        
        {/* Toast Notifier */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-900 text-white px-5 py-4 rounded-xl shadow-lg flex items-center justify-between gap-4 z-50 fixed top-6 right-6"
            >
              <span className="text-xs font-bold">{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Console de Contrôle</h1>
              <p className="text-xs text-slate-500">Vue d'ensemble de l'activité, des prospects et des dossiers étudiants.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Prospects en Attente</span>
                <span className="text-3xl font-black text-slate-900">{inquiries.filter(i => i.status === "new").length}</span>
                <span className="text-xs text-slate-500 block mt-1">Formulaires reçus sur le site</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Candidatures Actives</span>
                <span className="text-3xl font-black text-slate-900">{students.length}</span>
                <span className="text-xs text-slate-500 block mt-1">Étudiants enregistrés dans le portail</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Universités Référencées</span>
                <span className="text-3xl font-black text-slate-900">{universities.length}</span>
                <span className="text-xs text-slate-500 block mt-1">Établissements dans le catalogue</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Packages de Voyage</span>
                <span className="text-3xl font-black text-slate-900">{packages.length}</span>
                <span className="text-xs text-slate-500 block mt-1">Formules local, intl & Omra</span>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 tracking-tight">Derniers prospects reçus</h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {inquiries.slice(0, 4).map(inq => (
                    <div key={inq.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 block">{inq.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{inq.phone} • {inq.service_type}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inq.status === "new" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"}`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 tracking-tight">Étudiants récents</h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {students.slice(0, 4).map(student => (
                    <div key={student.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 block">{student.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{student.email}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(student.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATURES / STUDENTS TAB */}
        {activeTab === "students" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Student List Sidebar Column */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-4 space-y-4 h-[640px] flex flex-col">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">Portefeuilles Étudiants</h2>
                <p className="text-[10px] text-slate-400">Cliquez pour valider leurs documents ou chatter.</p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {students.map((student) => {
                  const isSelected = selectedStudent?.id === student.id;
                  const dNum = student.client_profiles?.[0]?.dossier_number || "A-0000";

                  return (
                    <button
                      key={student.id}
                      onClick={() => handleSelectStudent(student)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        isSelected 
                          ? "bg-primary/5 border-primary/20" 
                          : "bg-white border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-bold text-slate-800 text-xs block">{student.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block">{student.email}</span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600 font-black">
                          #{dNum}
                        </span>
                        <span className="text-[9px] text-primary font-bold uppercase tracking-wider">
                          {student.client_profiles?.[0]?.selected_service}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Files Details + Chat Column */}
            <div className="lg:col-span-8 space-y-8">
              {selectedStudent ? (
                <>
                  {/* File Upload Checklist Management */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">
                        Dossier #{selectedStudent.client_profiles?.[0]?.dossier_number}
                      </span>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        Candidature de {selectedStudent.name}
                      </h2>
                      {studentApp ? (
                        <p className="text-xs text-slate-500">
                          <strong>Active :</strong> {studentApp.title} ({studentApp.destination})
                        </p>
                      ) : (
                        <p className="text-xs text-red-500 italic">Aucune candidature initialisée.</p>
                      )}
                    </div>

                    {/* Document Verification Checklist */}
                    <div className="space-y-3">
                      {studentDocs.length === 0 ? (
                        <p className="text-slate-400 text-center italic text-xs py-6">Aucun document requis ou généré.</p>
                      ) : (
                        studentDocs.map((doc) => {
                          const fileUrlPath = doc.file_url 
                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dossiers/${doc.file_url}`
                            : null;

                          return (
                            <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                              <div>
                                <span className="font-bold text-slate-800 block">{doc.name}</span>
                                <span className="text-[10px] text-slate-400 font-semibold block">Catégorie : {doc.category}</span>
                              </div>
                              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                {fileUrlPath ? (
                                  <a 
                                    href={fileUrlPath} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-1.5"
                                  >
                                    <Eye size={14} />
                                    <span>Voir</span>
                                  </a>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">Non téléversé</span>
                                )}

                                {doc.status === "pending_verification" ? (
                                  <div className="flex gap-1.5">
                                    <button 
                                      onClick={() => handleUpdateDocStatus(doc.id, "approved")}
                                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                                    >
                                      Approuver
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateDocStatus(doc.id, "action_required")}
                                      className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                                    >
                                      Demander correction
                                    </button>
                                  </div>
                                ) : (
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    doc.status === "approved" 
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                      : doc.status === "action_required" 
                                      ? "bg-amber-50 text-amber-700 border border-amber-100" 
                                      : "bg-slate-100 text-slate-500"
                                  }`}>
                                    {doc.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Realtime Counselor Chat */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
                    <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary flex items-center justify-center font-bold text-xs rounded-lg uppercase">
                        {selectedStudent.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-xs block text-white">{selectedStudent.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Messagerie Candidat</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-55 text-xs">
                      {chatMessages.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 italic">
                          Aucune conversation en cours.
                        </div>
                      ) : (
                        chatMessages.map((m) => (
                          <div 
                            key={m.id}
                            className={`flex flex-col max-w-[85%] ${
                              m.sender_id === user?.id ? "ml-auto items-end" : "mr-auto items-start"
                            }`}
                          >
                            <div 
                              className={`p-3 rounded-2xl leading-relaxed ${
                                m.sender_id === user?.id 
                                  ? "bg-primary text-white rounded-tr-none" 
                                  : "bg-white text-neutral-800 border border-slate-200 rounded-tl-none"
                              }`}
                            >
                              <p>{m.message_text}</p>
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 px-1">
                              {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                      <input
                        type="text"
                        placeholder={`Répondre à ${selectedStudent.name}...`}
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        className="flex-1 bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200 text-xs outline-none focus:border-primary focus:bg-white transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!newMsg.trim()}
                        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Envoyer
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center text-slate-400 italic text-sm">
                  Sélectionnez un étudiant dans la liste pour gérer son dossier et discuter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROSPECTS / FORM INQUIRIES TAB */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Formulaires de Contact & Inscriptions</h2>
              <p className="text-xs text-slate-500">Gérez les prospects enregistrés via les CTA du site.</p>
            </div>

            <div className="overflow-hidden border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Prospect</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Package ciblé</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Canal</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">Aucune demande reçue.</td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">
                          <div className="flex flex-col">
                            <span>{inq.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{inq.phone} • {inq.email || "Pas d'email"}</span>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-500">{inq.service_type}</td>
                        <td className="p-4 font-semibold text-slate-600">{inq.destination_or_package || "Non spécifié"}</td>
                        <td className="p-4 text-slate-500 leading-normal max-w-xs">{inq.message || "-"}</td>
                        <td className="p-4 capitalize text-slate-400 font-semibold">{inq.preferred_contact}</td>
                        <td className="p-4 text-right flex gap-1.5 justify-end">
                          {inq.status === "new" ? (
                            <>
                              <button 
                                onClick={() => handleUpdateInquiryStatus(inq.id, "contacted")}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Traité
                              </button>
                              <button 
                                onClick={() => handleUpdateInquiryStatus(inq.id, "archived")}
                                className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Archiver
                              </button>
                            </>
                          ) : (
                            <span className="text-slate-400 italic font-semibold capitalize">{inq.status}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* UNIVERSITIES CATALOG TAB */}
        {activeTab === "universities" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Universities CRUD form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-4 space-y-4">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">Ajouter une Université</h2>
                <p className="text-[10px] text-slate-400">Renseignez les détails pour le moteur de recherche.</p>
              </div>

              <form onSubmit={handleAddUniversity} className="space-y-3 text-xs">
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">ID (Slug unique, sans espace) *</span>
                  <input required placeholder="ex: sorbonne, mcgill" value={newUni.id} onChange={e => setNewUni({...newUni, id: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">Nom Complet *</span>
                  <input required placeholder="ex: Université de la Sorbonne" value={newUni.name} onChange={e => setNewUni({...newUni, name: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Pays *</span>
                    <input required placeholder="ex: France" value={newUni.country} onChange={e => setNewUni({...newUni, country: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                  </label>
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Ville</span>
                    <input placeholder="ex: Paris" value={newUni.city} onChange={e => setNewUni({...newUni, city: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Frais Annuel</span>
                    <input placeholder="ex: 3 000 €" value={newUni.tuition_range} onChange={e => setNewUni({...newUni, tuition_range: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                  </label>
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Langue</span>
                    <input placeholder="ex: Français" value={newUni.language} onChange={e => setNewUni({...newUni, language: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                  </label>
                </div>
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">Classement (Global Rank)</span>
                  <input type="number" placeholder="ex: 120" value={newUni.rank} onChange={e => setNewUni({...newUni, rank: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>

                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-sm hover:shadow-md cursor-pointer text-xs">
                  Valider l'ajout
                </button>
              </form>
            </div>

            {/* Universities List Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Catalogue Actuel ({universities.length})</h2>
                <p className="text-xs text-slate-500">Voici la liste des universités affichées aux étudiants.</p>
              </div>

              <div className="overflow-hidden border border-slate-100 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4">Université</th>
                      <th className="p-4">Pays / Ville</th>
                      <th className="p-4">Langue / Frais</th>
                      <th className="p-4">Rang Mondial</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {universities.map((uni) => (
                      <tr key={uni.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{uni.name}</td>
                        <td className="p-4 text-slate-500">{uni.country} ({uni.city || "-"})</td>
                        <td className="p-4 text-slate-500">{uni.language} • {uni.tuition_range || "N/A"}</td>
                        <td className="p-4 font-bold text-slate-600">{uni.rank ? `#${uni.rank}` : "-"}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeleteUniversity(uni.id)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PACKAGES CATALOG TAB */}
        {activeTab === "packages" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Packages CRUD Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-4 space-y-4">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">Ajouter une Formule</h2>
                <p className="text-[10px] text-slate-400">Renseignez les détails pour le module tourisme/Omra.</p>
              </div>

              <form onSubmit={handleAddPackage} className="space-y-3 text-xs">
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">ID (Slug unique, sans espace) *</span>
                  <input required placeholder="ex: omra-prestige, tunisie-confort" value={newPkg.id} onChange={e => setNewPkg({...newPkg, id: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">Titre de la Formule *</span>
                  <input required placeholder="ex: Formule Prestige VIP Haram" value={newPkg.title} onChange={e => setNewPkg({...newPkg, title: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Type *</span>
                    <select value={newPkg.type} onChange={e => setNewPkg({...newPkg, type: e.target.value})} className="w-full p-2.5 border rounded-lg bg-white">
                      <option value="local">Tourisme Local</option>
                      <option value="international">Tourisme International</option>
                      <option value="omra">Omra</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-bold text-slate-500 block mb-1">Durée (jours/nuits)</span>
                    <input placeholder="ex: 15 Jours / 14 Nuits" value={newPkg.duration} onChange={e => setNewPkg({...newPkg, duration: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                  </label>
                </div>
                <label className="block">
                  <span className="font-bold text-slate-500 block mb-1">Tarif de Base (DZD / €)</span>
                  <input type="number" placeholder="ex: 290000" value={newPkg.base_price} onChange={e => setNewPkg({...newPkg, base_price: e.target.value})} className="w-full p-2.5 border rounded-lg" />
                </label>

                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-sm hover:shadow-md cursor-pointer text-xs">
                  Valider l'ajout
                </button>
              </form>
            </div>

            {/* Packages List Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Formules Référencées ({packages.length})</h2>
                <p className="text-xs text-slate-500">Liste complète des séjours actifs.</p>
              </div>

              <div className="overflow-hidden border border-slate-100 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4">Formule</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Durée</th>
                      <th className="p-4">Prix de base</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{pkg.title}</td>
                        <td className="p-4 text-slate-500 capitalize">{pkg.type}</td>
                        <td className="p-4 text-slate-500">{pkg.duration || "N/A"}</td>
                        <td className="p-4 font-bold text-slate-600">
                          {pkg.base_price ? `${parseFloat(pkg.base_price).toLocaleString("fr-FR")} DZD` : "Sur devis"}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
