"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Eye, GraduationCap, Heart, Loader2, Mail, User } from "lucide-react";
import styles from "./login.module.css";

type AuthMode = "login" | "signup";
type ServiceId = "study" | "tourism" | "omra";

const services: Array<{ id: ServiceId; label: string; icon: typeof GraduationCap }> = [
  { id: "study", label: "Study", icon: GraduationCap },
  { id: "tourism", label: "Tourism", icon: Compass },
  { id: "omra", label: "Omra", icon: Heart },
];

export function AuthPage({ initialMode = "login" }: { initialMode?: AuthMode }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceId>("study");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const isSignup = mode === "signup";
  const loadingMessages = isSignup
    ? [
        "Creating your account...",
        "Preparing your secure portal...",
        "Building your first checklist...",
        "Your space is ready.",
      ]
    : [
        "Securing your session...",
        "Checking your profile...",
        "Opening your travel portal...",
        "Welcome back.",
      ];

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    setIsLoading(false);
    setLoadingStep(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || (isSignup && (!name || !selectedService))) {
      return;
    }

    setIsLoading(true);

    const interval = window.setInterval(() => {
      setLoadingStep((step) => {
        if (step >= 3) {
          window.clearInterval(interval);
          window.setTimeout(() => router.push("/portal"), 350);
          return step;
        }

        return step + 1;
      });
    }, 450);
  };

  return (
    <main className={styles.page}>
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
              <h1>{isSignup ? "Start Your Journey!" : "Welcome Back Traveler!"}</h1>
              <p>{isSignup ? "Create your client portal in a few seconds" : "We are happy to see you again"}</p>
            </div>

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
                    <span className={styles.srOnly}>Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
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
                    {isSignup ? "Create account" : "Login"}
                  </button>

                  <p className={styles.demoNote}>
                    Demo mode: use any details to open the Land Travel portal.
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
