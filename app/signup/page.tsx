"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sparkles, GraduationCap, Compass, Heart, Loader2 } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";

type ServiceId = "study" | "tourism" | "omra";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Création de votre compte...",
    "Initialisation de votre espace sécurisé...",
    "Génération de votre checklist personnalisée...",
    "Dossier prêt ! Redirection...",
  ];

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !selectedService) return;

    setIsLoading(true);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/portal");
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <MotionPageShell className="signup-shell max-w-lg mx-auto my-12">
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl p-8 relative overflow-hidden">
        
        {/* Decorative background glows */}
        <div className="absolute -left-20 -top-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-yellow/5 blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow/10 text-orange mb-4"
          >
            <Sparkles className="w-6 h-6 text-orange-500" />
          </motion.div>
          
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 mb-2">
            Créer un compte client
          </h1>
          <p className="text-sm text-neutral-500">
            Commencez votre voyage et suivez vos démarches avec nos experts.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.form
              key="form"
              onSubmit={handleSignup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Nom Complet
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm outline-none bg-neutral-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@exemple.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm outline-none bg-neutral-50/50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                  Quel est votre projet principal ?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "study", label: "Études", icon: GraduationCap, color: "border-primary text-primary bg-primary/5", defaultColor: "border-neutral-200 text-neutral-600 hover:border-primary/50" },
                    { id: "tourism", label: "Tourisme", icon: Compass, color: "border-orange text-orange bg-orange/5", defaultColor: "border-neutral-200 text-neutral-600 hover:border-orange/50" },
                    { id: "omra", label: "Omra", icon: Heart, color: "border-emerald-600 text-emerald-600 bg-emerald-50", defaultColor: "border-neutral-200 text-neutral-600 hover:border-emerald-600/50" }
                  ].map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id as ServiceId)}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected ? service.color : service.defaultColor
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">{service.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm outline-none bg-neutral-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!selectedService}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                    selectedService 
                      ? "bg-primary text-white hover:bg-primary-dark shadow-primary/20 hover:shadow-primary/30" 
                      : "bg-neutral-100 text-neutral-400 shadow-none cursor-not-allowed"
                  }`}
                >
                  <span>Créer mon dossier</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="text-center pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-500">
                  Déjà un compte ?{" "}
                  <Link href="/login" className="font-bold text-primary hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-bold text-neutral-700 h-5"
                >
                  {loadingMessages[loadingStep]}
                </motion.p>
              </AnimatePresence>
              <div className="w-48 h-1.5 bg-neutral-100 rounded-full overflow-hidden mt-6">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: loadingStep === 0 ? "25%" : loadingStep === 1 ? "50%" : loadingStep === 2 ? "75%" : "100%" 
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </MotionPageShell>
  );
}
