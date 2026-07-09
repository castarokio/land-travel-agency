"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Connexion au serveur...",
    "Vérification des identifiants...",
    "Récupération de vos dossiers...",
    "Bienvenue ! Redirection...",
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    
    // Simulate multi-step secure login animation
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
    <MotionPageShell className="login-shell max-w-md mx-auto my-12">
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl p-8 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-yellow/5 blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4"
          >
            <ShieldCheck className="w-6 h-6" />
          </motion.div>
          
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 mb-2">
            Espace Client
          </h1>
          <p className="text-sm text-neutral-500">
            Connectez-vous pour suivre vos demandes de visa, études ou voyages.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.form
              key="form"
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 relative z-10"
            >
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
                    placeholder="etudiant@exemple.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm outline-none bg-neutral-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Mot de passe
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
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
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Se connecter</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="text-center pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-500">
                  Nouveau chez Land Travel ?{" "}
                  <Link href="/signup" className="font-bold text-primary hover:underline">
                    Créer un compte
                  </Link>
                </p>
              </div>

              {/* Demo Helper */}
              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-center">
                <p className="text-xs text-neutral-400">
                  💡 Mode démo : saisissez n&apos;importe quelle adresse email et mot de passe pour tester le portail.
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
