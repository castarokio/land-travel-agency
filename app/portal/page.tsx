"use client";

import { useState } from "react";
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
  Briefcase
} from "lucide-react";

interface DocumentItem {
  id: number;
  name: string;
  category: string;
  date: string;
  status: "approved" | "pending" | "action";
  requiredFor: string;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "info" | "alert" | "success";
  read: boolean;
}

export default function PortalPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Mock Counselor Messages
  const [messages, setMessages] = useState<Array<{ sender: "user" | "counselor"; text: string; time: string }>>([
    { sender: "counselor", text: "Bonjour ! J'ai passé en revue votre dossier d'admission pour l'UdeM. Tout semble parfait, il ne manque que votre justificatif financier pour qu'on soumette la demande de visa CAQ.", time: "Hier, 14:32" }
  ]);
  const [newMsg, setNewMsg] = useState("");

  // Mock Documents Status State
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 1, name: "Passeport (Page d'identité)", category: "Identité", date: "12 Juin 2026", status: "approved", requiredFor: "Admission & Visa" },
    { id: 2, name: "Lettre d'admission - UdeM", category: "Académique", date: "20 Juin 2026", status: "approved", requiredFor: "Visa & Inscription" },
    { id: 3, name: "Justificatif de ressources financières (Garant)", category: "Finances", date: "Non soumis", status: "action", requiredFor: "Demande de Visa CAQ" },
    { id: 4, name: "Formulaire de demande de Visa d'études", category: "Visa", date: "05 Juillet 2026", status: "pending", requiredFor: "Ambassade" },
    { id: 5, name: "Relevés de notes universitaires", category: "Académique", date: "15 Juin 2026", status: "approved", requiredFor: "Admission" }
  ]);

  // Mock Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: "Dossier financier requis", description: "Votre conseiller Sarah a demandé un justificatif de fonds pour le visa d'études canadien.", time: "Il y a 2 heures", type: "alert", read: false },
    { id: 2, title: "Admission confirmée !", description: "Félicitations, votre lettre d'admission de l'Université de Montréal a été validée par notre équipe.", time: "Hier", type: "success", read: true },
    { id: 3, title: "Mise à jour de votre demande", description: "Les frais d'ouverture de dossier pour la session d'Automne ont été réglés.", time: "Il y a 3 jours", type: "info", read: true }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Simulating document upload animation
  const handleMockUpload = (docId: number) => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadMessage("Sélection du fichier...");

    // Stage 1: Reading file
    setTimeout(() => {
      setUploadMessage("Scan antivirus & chiffrement SSL...");
      setUploadProgress(35);
    }, 600);

    // Stage 2: Transferring
    setTimeout(() => {
      setUploadMessage("Téléversement sur l'espace sécurisé Land Travel...");
      setUploadProgress(70);
    }, 1300);

    // Stage 3: Complete
    setTimeout(() => {
      setUploadProgress(100);
      setUploadMessage("Finalisation...");
      
      setTimeout(() => {
        // Update document state
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === docId 
              ? { ...doc, status: "pending", date: "Aujourd'hui, 23:28" }
              : doc
          )
        );

        // Update notification
        setNotifications(prev => [
          {
            id: Date.now(),
            title: "Document téléversé",
            description: "Justificatif de ressources financières a été soumis et est en cours d'analyse.",
            time: "À l'instant",
            type: "success",
            read: false
          },
          ...prev
        ]);

        setIsUploading(false);
        triggerToast("🎉 Votre document financier a été téléversé avec succès ! Statut mis à jour : En attente de vérification.");
      }, 500);
    }, 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const userMessage = { sender: "user" as const, text: newMsg, time: "À l'instant" };
    setMessages(prev => [...prev, userMessage]);
    setNewMsg("");

    // Simulate quick automatic counselor response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          sender: "counselor" as const, 
          text: "Merci pour votre message ! J'examine votre document dès que possible et je vous tiens informé par notification.", 
          time: "À l'instant" 
        }
      ]);
      
      // Update notification
      setNotifications(prev => [
        {
          id: Date.now(),
          title: "Nouveau message de Sarah",
          description: "Votre conseiller Sarah a répondu à votre chat.",
          time: "À l'instant",
          type: "info",
          read: false
        },
        ...prev
      ]);
    }, 1500);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast("Toutes les notifications ont été marquées comme lues.");
  };

  const getStatusBadge = (status: "approved" | "pending" | "action") => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approuvé
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            En attente
          </span>
        );
      case "action":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <AlertCircle className="w-3.5 h-3.5" />
            Action Requis
          </span>
        );
    }
  };

  // Calculate statistics
  const totalDocs = documents.length;
  const approvedDocs = documents.filter(d => d.status === "approved").length;
  const progressPercent = Math.round((approvedDocs / totalDocs) * 100);

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
              <span className="ml-auto text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md">1</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-semibold text-sm transition-all">
              <Briefcase className="w-4 h-4" />
              <span>Mes Programmes</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-semibold text-sm transition-all">
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
                  SC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <span className="font-bold text-neutral-800 text-xs block">Sarah Costanza</span>
                <span className="text-[10px] text-neutral-400 font-semibold block">Votre conseillère études</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal mb-3">
              Sarah est en ligne. Besoin d&apos;aide sur votre dossier ?
            </p>
            <a 
              href="#chat-box" 
              className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
            >
              Envoyer un message
            </a>
          </div>

          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-bold text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </Link>
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
                Études à l&apos;étranger
              </span>
            </div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              Bonjour, Alexandre ! 👋
            </h1>
          </div>

          {/* Quick User Actions */}
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange text-white font-black flex items-center justify-center shadow-md shadow-orange/15">
                AL
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-neutral-800 text-sm block">Alexandre Laroche</span>
                <span className="text-xs text-neutral-400 block">Dossier #LT-4289</span>
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
            
            {/* Progress Circular Graphic */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="26" className="stroke-neutral-100 fill-none" strokeWidth="4" />
                <motion.circle 
                  cx="32" 
                  cy="32" 
                  r="26" 
                  className="stroke-primary fill-none" 
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
              Session d&apos;Automne 2026
            </span>
            <span className="text-xs text-neutral-500 block mt-1">
              Université de Montréal (UdeM)
            </span>
            <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
              En cours d&apos;analyse visa
            </span>
          </div>

          {/* Next Deadline Card */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            <span className="text-xs text-neutral-400 font-bold block mb-1">PROCHAINE DEADLINE</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <span className="text-base font-black text-neutral-900">15 Juillet 2026</span>
            </div>
            <span className="text-xs text-red-500 font-semibold block mt-1.5">
              ⚠️ Date limite dépôt CAQ (7 jours)
            </span>
          </div>

          {/* Remaining action items */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            <span className="text-xs text-neutral-400 font-bold block mb-1">ACTIONS REQUISES</span>
            <span className="text-2xl font-black text-neutral-950 flex items-center gap-1.5">
              {documents.filter(d => d.status === "action").length}
              {documents.filter(d => d.status === "action").length > 0 && (
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              )}
            </span>
            <span className="text-xs text-neutral-500 block mt-1">
              {documents.filter(d => d.status === "action").length > 0 
                ? "Dossier financier en attente d'upload" 
                : "Aucune action requise !"}
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
                <p className="text-xs text-neutral-500">Mettez à jour vos pièces justificatives demandées par l&apos;ambassade.</p>
              </div>
              <span className="text-xs font-bold text-neutral-400">5 documents au total</span>
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
                            <span className="text-[10px] text-neutral-400 font-medium">Requis pour: {doc.requiredFor}</span>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-500 font-medium">{doc.category}</td>
                        <td className="p-4 text-neutral-500 font-medium">{doc.date}</td>
                        <td className="p-4">{getStatusBadge(doc.status)}</td>
                        <td className="p-4 text-right">
                          {doc.status === "action" ? (
                            <button
                              onClick={() => handleMockUpload(doc.id)}
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

            {/* MOCK UPLOADING SIMULATOR */}
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
                      <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping" />
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
                <span className="font-bold text-primary text-xs block mb-1">Directives pour les documents financiers</span>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Veuillez téléverser un relevé de compte bancaire des 3 derniers mois montrant un solde supérieur à 15 000 CAD (ou l&apos;équivalent en DZD/EUR) ou une attestation de prise en charge par votre garant dument signée. Format accepté: PDF uniquement, max 10 Mo.
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

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-3.5 rounded-2xl border transition-all text-xs flex items-start gap-3 ${
                      notif.read 
                        ? "bg-white border-neutral-100 text-neutral-600" 
                        : "bg-primary/5 border-primary/10 text-neutral-800"
                    }`}
                  >
                    <span className="mt-0.5">
                      {notif.type === "alert" && <AlertCircle className="w-4 h-4 text-amber-600" />}
                      {notif.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {notif.type === "info" && <Clock className="w-4 h-4 text-primary" />}
                    </span>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-neutral-900">{notif.title}</span>
                        <span className="text-[9px] text-neutral-400 font-medium">{notif.time}</span>
                      </div>
                      <p className="text-neutral-500 leading-normal text-[11px]">{notif.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COUNSELOR QUICK MESSENGER */}
            <div id="chat-box" className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col h-[340px]">
              {/* Chat Header */}
              <div className="p-4 bg-neutral-950 text-white flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-black text-xs">
                    SC
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-white">Sarah Costanza</span>
                  <span className="text-[9px] text-neutral-400 font-bold block uppercase tracking-wider">Conseillère d&apos;études</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 text-xs">
                {messages.map((m, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div 
                      className={`p-3 rounded-2xl leading-relaxed ${
                        m.sender === "user" 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-white text-neutral-800 border border-neutral-200/50 rounded-tl-none"
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
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
