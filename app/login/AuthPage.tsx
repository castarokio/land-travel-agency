/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Compass, Eye, GraduationCap, Heart, Loader2, Mail, ShieldCheck, User } from "lucide-react";
import styles from "./login.module.css";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";
type ServiceId = "study" | "tourism" | "omra";

const services: Array<{ id: ServiceId; label: string; icon: typeof GraduationCap }> = [
  { id: "study", label: "Study", icon: GraduationCap },
  { id: "tourism", label: "Tourism", icon: Compass },
  { id: "omra", label: "Omra", icon: Heart },
];

export function AuthPage({ initialMode = "login", admin = false }: { initialMode?: AuthMode; admin?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(admin ? "" : "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceId>("study");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isSignup = !admin && mode === "signup";
  const loadingMessages = isSignup
    ? [
        "Creating your account...",
        "Preparing your secure portal...",
        "Building your first checklist...",
        "Your space is ready.",
      ]
    : admin
    ? [
        "Verifying admin credentials...",
        "Creating secure admin session...",
        "Loading control panel...",
        "Admin panel ready.",
      ]
    : [
        "Securing your session...",
        "Checking your profile...",
        "Opening your travel portal...",
        "Welcome back.",
      ];

  const handleModeChange = (nextMode: AuthMode) => {
    if (admin) return;
    setMode(nextMode);
    setIsLoading(false);
    setLoadingStep(0);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || (isSignup && (!name || !selectedService))) {
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              fullName: name,
              role: "client",
              selectedService,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        // If email confirmation is enabled, session will be null
        if (data.user && !data.session) {
          setIsLoading(false);
          setSuccessMsg("Inscription réussie ! Veuillez vérifier vos e-mails pour valider votre compte.");
          return;
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        if (admin) {
          // Check role to prevent client login to admin dashboard
          const { data: profile, error: roleError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user?.id)
            .single();

          if (roleError || !profile || (profile.role !== "admin" && profile.role !== "advisor")) {
            await supabase.auth.signOut();
            setErrorMsg("Accès refusé : vous ne disposez pas des droits d'administrateur.");
            setIsLoading(false);
            return;
          }
        }
      }

      // Succeeded! Run the loading animation
      const interval = window.setInterval(() => {
        setLoadingStep((step) => {
          if (step >= 3) {
            window.clearInterval(interval);
            window.setTimeout(() => router.push(admin ? "/admin" : "/portal"), 350);
            return step;
          }
          return step + 1;
        });
      }, 450);

    } catch (e: any) {
      setErrorMsg("Une erreur s'est produite lors de l'authentification.");
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <Link className={styles.backHome} href="/" aria-label="Back to home">
        <ArrowLeft size={20} />
        <span>Home</span>
      </Link>
      <section className={styles.frame} aria-label="Land Travel authentication">
        <div className={styles.formPanel}>
          <div className={styles.formInner}>
            <Link className={styles.brand} href="/" aria-label="Land Travel home">
              <span className={styles.brandMark}>
                <Image src="/assets/landtravel-logo.png" alt="" width={1254} height={1254} priority />
              </span>
              <span>Land Travel</span>
            </Link>

            <div className={styles.heading}>
              <h1>{admin ? "Admin Control Panel" : isSignup ? "Start Your Journey!" : "Welcome Back Traveler!"}</h1>
              <p>
                {admin
                  ? "Sign in with your admin email and password"
                  : isSignup
                    ? "Create your client portal in a few seconds"
                    : "We are happy to see you again"}
              </p>
            </div>

            {admin ? (
              <div className={styles.segmented} aria-label="Admin access mode">
                <button className={styles.segmentActive} type="button" aria-pressed="true">
                  <ShieldCheck size={16} aria-hidden="true" />
                  Admin access
                </button>
              </div>
            ) : (
              <div className={styles.segmented} aria-label="Authentication mode">
                <button
                  className={!isSignup ? styles.segmentActive : ""}
                  type="button"
                  onClick={() => handleModeChange("login")}
                  aria-pressed={!isSignup}
                >
                  Sign in
                </button>
                <button
                  className={isSignup ? styles.segmentActive : ""}
                  type="button"
                  onClick={() => handleModeChange("signup")}
                  aria-pressed={isSignup}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Error Message Box */}
            {errorMsg && (
              <div style={{
                color: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.16)",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "20px",
                textAlign: "left"
              }}>
                {errorMsg}
              </div>
            )}

            {/* Success Message Box */}
            {successMsg && (
              <div style={{
                color: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.16)",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "20px",
                textAlign: "left"
              }}>
                {successMsg}
              </div>
            )}

            <AnimatePresence mode="wait">
              {!isLoading ? (
                <motion.form
                  key={mode}
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  {isSignup ? (
                    <label className={styles.field}>
                      <span className={styles.srOnly}>Full name</span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your full name"
                      />
                      <User size={18} aria-hidden="true" />
                    </label>
                  ) : null}

                  <label className={styles.field}>
                    <span className={styles.srOnly}>{admin ? "Admin email" : "Email"}</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={admin ? "Enter admin email" : "Enter your email"}
                      autoComplete={admin ? "username" : "email"}
                    />
                    <Mail size={18} aria-hidden="true" />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.srOnly}>Password</span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={isSignup ? "Create your password" : "Enter your password"}
                      autoComplete={admin ? "current-password" : isSignup ? "new-password" : "current-password"}
                    />
                    <Eye size={18} aria-hidden="true" />
                  </label>

                  {isSignup ? (
                    <div className={styles.serviceGrid} aria-label="Choose your main project">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const isSelected = selectedService === service.id;

                        return (
                          <button
                            className={`${styles.serviceOption} ${isSelected ? styles.serviceOptionSelected : ""}`}
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedService(service.id)}
                            aria-pressed={isSelected}
                          >
                            <Icon size={22} aria-hidden="true" />
                            <span>{service.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : admin ? (
                    <div className={styles.formMeta}>
                      <span className={styles.remember}>
                        <input type="checkbox" checked readOnly />
                        <span>Protected admin session</span>
                      </span>
                      <Link href="/">Back to site</Link>
                    </div>
                  ) : (
                    <div className={styles.formMeta}>
                      <label className={styles.remember}>
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(event) => setRemember(event.target.checked)}
                        />
                        <span>Remember me</span>
                      </label>
                      <Link href="/contact">Forgot Password?</Link>
                    </div>
                  )}

                  <button className={styles.loginButton} type="submit">
                    {admin ? "Open admin panel" : isSignup ? "Create account" : "Login"}
                  </button>

                  <p className={styles.demoNote}>
                    {admin
                      ? "Use your Supabase admin account credentials."
                      : "Account verification may be required depending on Supabase settings."}
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="loading"
                  className={styles.loading}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className={styles.spinner} aria-hidden="true" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      {loadingMessages[loadingStep]}
                    </motion.p>
                  </AnimatePresence>
                  <div className={styles.progress} aria-hidden="true">
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: `${(loadingStep + 1) * 25}%` }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <aside className={styles.visualPanel} aria-label="Land Travel visual">
          <Image src="/assets/login-blue-silk.png" alt="" fill priority sizes="(max-width: 860px) 100vw, 50vw" />
          <div className={styles.notice}>
            <p>
              © 2026 Land Travel. All rights reserved.
              <br />
              One secure portal for study, tourism, and Omra requests.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
