"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  LogOut, 
  Bell, 
  FileText, 
  Calendar, 
  MessageSquare, 
  HelpCircle, 
  TrendingUp,
  X,
  FileCheck,
  Briefcase,
  Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface DocumentItem {
  id: string;
  name: string;
  category: string;
  uploaded_at: string | null;
  status: "missing" | "action_required" | "pending_verification" | "approved";
  required_for: string;
  file_url?: string;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  is_read: boolean;
}

interface ChatMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  message_text: string;
  created_at: string;
}

function getInitialChecklist(serviceType: string) {
  if (serviceType === "study") {
    return [
      { name: "Passeport (Page d'identité)", category: "Identité", status: "missing", requiredFor: "Admission & Visa" },
      { name: "Lettre d'admission - UdeM", category: "Académique", status: "missing", requiredFor: "Visa & Inscription" },
      { name: "Justificatif de ressources financières (Garant)", category: "Finances", status: "action_required", requiredFor: "Demande de Visa CAQ" },
      { name: "Formulaire de de Visa d'études", category: "Visa", status: "missing", requiredFor: "Ambassade" },
      { name: "Relevés de notes universitaires", category: "Académique", status: "missing", requiredFor: "Admission" }
    ];
  } else if (serviceType === "omra") {
    return [
      { name: "Passeport en cours de validité (> 6 mois)", category: "Identité", status: "action_required", requiredFor: "Visa Omra" },
      { name: "Attestation de vaccination méningite", category: "Médical", status: "missing", requiredFor: "Autorités" },
      { name: "Photo d'identité fond blanc", category: "Identité", status: "action_required", requiredFor: "Formulaire Visa" }
    ];
  } else {
    return [
      { name: "Copie de Passeport", category: "Identité", status: "action_required", requiredFor: "Réservation vol & hôtel" },
      { name: "Formulaire d'inclusions signé", category: "Contrat", status: "missing", requiredFor: "Validation dossier" },
      { name: "Justificatif d'acompte (30%)", category: "Finances", status: "action_required", requiredFor: "Réservation définitive" }
    ];
  }
}

export default function PortalPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const initPortal = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setLoadingData(false);
        return;
      }
      setUser(session.user);

      // Fetch user profile + assigned advisor name
      const { data: prof } = await supabase
        .from("profiles")
        .select(`
          id, email, name, role,
          client_profiles (
            dossier_number,
            selected_service,
            assigned_advisor_id
          )
        `)
        .eq("id", session.user.id)
        .single();
      
      let advisorName = "Non assigné";
      if (prof?.client_profiles?.[0]?.assigned_advisor_id) {
        const { data: adv } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", prof.client_profiles[0].assigned_advisor_id)
          .single();
        advisorName = adv?.name || "Non assigné";
      }

      const fullProfile = {
        ...prof,
        client_profiles: prof?.client_profiles?.[0] || null,
        advisorName
      };
      setProfile(fullProfile);

      // Fetch active application
      const { data: apps } = await supabase
        .from("applications")
        .select("*")
        .eq("client_id", session.user.id)
        .order("created_at", { ascending: false });

      let activeApp = apps?.[0];

      if (!activeApp && fullProfile?.client_profiles) {
        // Automatically bootstrap first application if empty
        const sType = fullProfile.client_profiles.selected_service;
        const defaultTitle = sType === "study" ? "Session d'Automne 2026" : sType === "omra" ? "Formule Omra 2026" : "Voyage Touristique";
        const defaultDest = sType === "study" ? "Université de Montréal (UdeM)" : sType === "omra" ? "Makkah & Madinah" : "Maldives Prestige";
        
        const { data: newApp } = await supabase
          .from("applications")
          .insert({
            client_id: session.user.id,
            service_type: sType,
            title: defaultTitle,
            destination: defaultDest,
            status: "pending_documents",
            next_deadline_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            next_deadline_label: sType === "study" ? "Date limite CAQ" : sType === "omra" ? "Dépôt Passeport" : "Acompte",
          })
          .select()
          .single();
        activeApp = newApp;
      }
      setApplication(activeApp);

      if (activeApp) {
        // Fetch or bootstrap documents checklist
        const { data: docs } = await supabase
          .from("documents")
          .select("*")
          .eq("application_id", activeApp.id)
          .order("created_at", { ascending: true });

        if (!docs || docs.length === 0) {
          const checklist = getInitialChecklist(activeApp.service_type);
          const toInsert = checklist.map(item => ({
            application_id: activeApp.id,
            name: item.name,
            category: item.category,
            status: item.status,
            required_for: item.requiredFor
          }));
          
          const { data: inserted } = await supabase
            .from("documents")
            .insert(toInsert)
            .select();
          setDocuments(inserted || []);
        } else {
          setDocuments(docs);
        }
      }

      // Fetch user notifications
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      setNotifications(notifs || []);

      // Fetch user chat messages
      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("*")
        .or(`sender_id.eq.${session.user.id},recipient_id.eq.${session.user.id}`)
        .order("created_at", { ascending: true });
      setMessages(msgs || []);
      
      setLoadingData(false);
    };

    initPortal();
  }, [supabase]);

  // Real-time Chat Subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`room_${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages"
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          if (newMsg.sender_id === user.id || newMsg.recipient_id === user.id) {
            setMessages(prev => {
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
  }, [user, supabase]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleFileUpload = (docId: string) => {
    if (isUploading || !user || !application) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.jpeg,.png";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        triggerToast("❌ Le fichier dépasse la limite autorisée de 10 Mo.");
        return;
      }

      setIsUploading(true);
      setUploadProgress(10);
      setUploadMessage("Lecture du fichier...");

      try {
        const fileExt = file.name.split(".").pop();
        const filePath = `${user.id}/${docId}_${Date.now()}.${fileExt}`;

        setUploadMessage("Téléversement sur Supabase Storage...");
        setUploadProgress(40);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("dossiers")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        setUploadProgress(80);
        setUploadMessage("Enregistrement en base de données...");

        const fileUrl = uploadData.path;
        const { error: dbError } = await supabase
          .from("documents")
          .update({
            file_url: fileUrl,
            status: "pending_verification",
            uploaded_at: new Date().toISOString(),
          })
          .eq("id", docId);

        if (dbError) throw dbError;

        // Refresh documents
        const { data: updatedDocs } = await supabase
          .from("documents")
          .select("*")
          .eq("application_id", application.id)
          .order("created_at", { ascending: true });
        setDocuments(updatedDocs || []);

        // Create notification
        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "Document téléversé",
          description: "Un justificatif a été soumis et est en attente de vérification.",
          is_read: false,
        });

        // Refresh notifications
        const { data: updatedNotifs } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setNotifications(updatedNotifs || []);

        setUploadProgress(100);
        triggerToast("🎉 Document téléversé avec succès ! Statut en cours de vérification.");
      } catch (err: any) {
        console.error(err);
        triggerToast("❌ Échec du téléversement : " + err.message);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    };
    input.click();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !user || !profile) return;

    const advisorId = profile.client_profiles?.assigned_advisor_id;
    const recipientId = advisorId || "00000000-0000-0000-0000-000000000000"; // default admin UUID

    const messageText = newMsg;
    setNewMsg("");

    const { error } = await supabase.from("chat_messages").insert({
      sender_id: user.id,
      recipient_id: recipientId,
      message_text: messageText,
      is_read: false,
    });

    if (error) {
      triggerToast("❌ Impossible d'envoyer le message : " + error.message);
    }
  };

  const markAllRead = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id);

    if (error) {
      triggerToast("❌ Impossible de mettre à jour les notifications.");
      return;
    }

    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    triggerToast("Toutes les notifications ont été marquées comme lues.");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getStatusBadge = (status: DocumentItem["status"]) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approuvé
          </span>
        );
      case "pending_verification":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            En vérification
          </span>
        );
      case "action_required":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <AlertCircle className="w-3.5 h-3.5" />
            Action Requis
          </span>
        );
      case "missing":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-500 border border-slate-100">
            <X className="w-3.5 h-3.5" />
            Non soumis
          </span>
        );
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-semibold text-neutral-500">Chargement de votre portail sécurisé...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalDocs = documents.length;
  const approvedDocs = documents.filter(d => d.status === "approved").length;
  const progressPercent = totalDocs > 0 ? Math.round((approvedDocs / totalDocs) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-100 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-neutral-100 flex items-center gap-3">
            <Image
              src="/assets/landtravel-logo.png"
              alt=""
              width={1254}
              height={1254}
              className="h-10 w-10 object-contain"
              priority
            />
            <div>
              <span className="font-black text-neutral-900 tracking-tight block">LAND TRAVEL</span>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Portail Client</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary font-bold text-sm transition-all">
              <TrendingUp className="w-4 h-4" />
              <span>Tableau de bord</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-semibold text-sm transition-all">
              <FileText className="w-4 h-4" />
              <span>Mon Dossier</span>
              {documents.some(d => d.status === "action_required") && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md">
                  {documents.filter(d => d.status === "action_required").length}
                </span>
              )}
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-semibold text-sm transition-all">
              <Briefcase className="w-4 h-4" />
              <span>Mes Programmes</span>
            </a>
            <a href="#chat-box" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-semibold text-sm transition-all">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </a>
          </nav>
        </div>

        {/* Advisor Profile Card & Log Out */}
        <div className="p-4 border-t border-neutral-100 space-y-4">
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                  {profile?.advisorName?.slice(0, 2).toUpperCase() || "LT"}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <span className="font-bold text-neutral-800 text-xs block">{profile?.advisorName || "Land Travel Advisor"}</span>
                <span className="text-[10px] text-neutral-400 font-semibold block">Votre conseiller</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal mb-3">
              Besoin d&apos;aide sur la constitution de vos pièces ? Discutez en direct.
            </p>
            <a 
              href="#chat-box" 
              className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
            >
              Envoyer un message
            </a>
          </div>

          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-bold text-sm transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-6xl mx-auto w-full">
        
        {/* TOP BAR / HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
              <span>Espace Candidat</span>
              <span>•</span>
              <span className="text-primary flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                {application?.service_type === "study" ? "Études à l'étranger" : application?.service_type === "omra" ? "Pèlerinage Omra" : "Tourisme"}
              </span>
            </div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              Bonjour, {profile?.name} ! 👋
            </h1>
          </div>

          {/* Quick User Actions */}
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.is_read) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0060ff] text-white font-black flex items-center justify-center shadow-md">
                {profile?.name?.slice(0, 2).toUpperCase() || "AL"}
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-neutral-800 text-sm block">{profile?.name}</span>
                <span className="text-xs text-neutral-400 block">Dossier #{profile?.client_profiles?.dossier_number || "Non généré"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-neutral-900 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 z-50 relative"
            >
              <span className="text-sm font-semibold">{toastMessage}</span>
              <button 
                onClick={() => setToastMessage(null)} 
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. KEY STATS OVERVIEW CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Progress Circular Card */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-400 font-bold block mb-1">COMPLÉTION DU DOSSIER</span>
              <span className="text-2xl font-black text-neutral-900">{progressPercent}%</span>
              <span className="text-xs text-neutral-500 block mt-1">
                {approvedDocs} sur {totalDocs} documents validés
              </span>
            </div>
            
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="26" className="stroke-neutral-100 fill-none" strokeWidth="4" />
                <motion.circle 
                  cx="32" 
                  cy="32" 
                  r="26" 
                  className="stroke-[#0060ff] fill-none" 
                  strokeWidth="4" 
                  strokeDasharray={2 * Math.PI * 26}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - progressPercent / 100) }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Active Application Card */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            <span className="text-xs text-neutral-400 font-bold block mb-1">PROJET ACTIF</span>
            <span className="text-base font-black text-neutral-900 block leading-tight">
              {application?.title || "Aucun projet actif"}
            </span>
            <span className="text-xs text-neutral-500 block mt-1">
              {application?.destination || "Aucune destination"}
            </span>
            <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary capitalize">
              {application?.status?.replace("_", " ")}
            </span>
          </div>

          {/* Next Deadline Card */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            <span className="text-xs text-neutral-400 font-bold block mb-1">PROCHAINE DEADLINE</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <span className="text-base font-black text-neutral-900">
                {application?.next_deadline_date ? new Date(application.next_deadline_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "Non planifiée"}
              </span>
            </div>
            {application?.next_deadline_label && (
              <span className="text-xs text-red-500 font-semibold block mt-1.5">
                ⚠️ {application.next_deadline_label}
              </span>
            )}
          </div>

          {/* Remaining action items */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            <span className="text-xs text-neutral-400 font-bold block mb-1">ACTIONS REQUISES</span>
            <span className="text-2xl font-black text-neutral-950 flex items-center gap-1.5">
              {documents.filter(d => d.status === "action_required").length}
              {documents.filter(d => d.status === "action_required").length > 0 && (
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              )}
            </span>
            <span className="text-xs text-neutral-500 block mt-1">
              {documents.filter(d => d.status === "action_required").length > 0 
                ? "Pièces justificatives en attente d'upload" 
                : "Votre dossier est à jour !"}
            </span>
          </div>
        </section>

        {/* 4. MAIN INTERACTIVE STATUS TRACKER AND NOTIFICATIONS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: SUBMISSION STATUS TRACKER */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-neutral-900 tracking-tight">Suivi des Soumissions</h2>
                <p className="text-xs text-neutral-500">Mettez à jour vos pièces justificatives demandées par nos conseillers.</p>
              </div>
              <span className="text-xs font-bold text-neutral-400">{documents.length} documents requis</span>
            </div>

            {/* Document List Table */}
            <div className="overflow-hidden border border-neutral-100 rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      <th className="p-4">Document</th>
                      <th className="p-4">Catégorie</th>
                      <th className="p-4">Mise à jour</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-xs">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="p-4 font-bold text-neutral-800">
                          <div className="flex flex-col">
                            <span>{doc.name}</span>
                            <span className="text-[10px] text-neutral-400 font-medium">Requis pour: {doc.required_for}</span>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-500 font-medium">{doc.category}</td>
                        <td className="p-4 text-neutral-500 font-medium">
                          {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Non soumis"}
                        </td>
                        <td className="p-4">{getStatusBadge(doc.status)}</td>
                        <td className="p-4 text-right">
                          {doc.status === "action_required" || doc.status === "missing" ? (
                            <button
                              onClick={() => handleFileUpload(doc.id)}
                              disabled={isUploading}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Uploader</span>
                            </button>
                          ) : doc.status === "approved" ? (
                            <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                              ✓ Reçu
                            </span>
                          ) : (
                            <span className="text-neutral-400 font-medium italic">En cours</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* REAL UPLOADING SIMULATOR */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-neutral-700 uppercase tracking-wider flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                      {uploadMessage}
                    </span>
                    <span className="text-xs font-bold text-primary">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      style={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Document Guidelines box */}
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-primary text-xs block mb-1">Directives de téléversement sécurisé</span>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Formats acceptés : PDF, PNG, JPEG. Taille maximale par fichier : 10 Mo. Vos documents sont chiffrés et transmis de manière sécurisée uniquement à votre conseiller.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: NOTIFICATIONS AND COUNSELOR CHAT */}
          <div className="space-y-8">
            
            {/* NOTIFICATIONS LIST */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <div>
                  <h3 className="text-base font-black text-neutral-900 tracking-tight">Notifications</h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Mises à jour récentes</span>
                </div>
                <button 
                  onClick={markAllRead}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Tout lire
                </button>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-neutral-400 text-center py-6 italic text-xs">Aucune notification.</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-3.5 rounded-2xl border transition-all text-xs flex items-start gap-3 ${
                        notif.is_read 
                          ? "bg-white border-neutral-100 text-neutral-600" 
                          : "bg-primary/5 border-primary/10 text-neutral-800"
                      }`}
                    >
                      <span className="mt-0.5">
                        <Clock className="w-4 h-4 text-primary" />
                      </span>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-neutral-900">{notif.title}</span>
                          <span className="text-[9px] text-neutral-400 font-medium">
                            {new Date(notif.created_at).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-neutral-500 leading-normal text-[11px]">{notif.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COUNSELOR REALTIME MESSENGER */}
            <div id="chat-box" className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col h-[340px]">
              {/* Chat Header */}
              <div className="p-4 bg-neutral-950 text-white flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-black text-xs">
                    {profile?.advisorName?.slice(0, 2).toUpperCase() || "LT"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-white">{profile?.advisorName || "Conseiller Land Travel"}</span>
                  <span className="text-[9px] text-neutral-400 font-bold block uppercase tracking-wider">Votre messagerie d&apos;aide</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 text-xs">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-neutral-400 italic">
                    Aucun message. Commencez la discussion ci-dessous.
                  </div>
                ) : (
                  messages.map((m) => (
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
                            : "bg-white text-neutral-800 border border-neutral-200/50 rounded-tl-none"
                        }`}
                      >
                        <p>{m.message_text}</p>
                      </div>
                      <span className="text-[9px] text-neutral-400 mt-1 px-1">
                        {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-100 flex gap-2 bg-white">
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1 bg-neutral-50 rounded-xl px-3.5 py-2 border border-neutral-200 text-xs outline-none focus:border-primary focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMsg.trim()}
                  className="px-3 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  Envoyer
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
