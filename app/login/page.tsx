"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Loader2, Mail } from "lucide-react";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Securing your session...",
    "Checking your profile...",
    "Opening your travel portal...",
    "Welcome back.",
  ];

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
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
      <section className={styles.frame} aria-label="Land Travel login">
        <div className={styles.formPanel}>
          <div className={styles.formInner}>
            <Link className={styles.brand} href="/" aria-label="Land Travel home">
              <span className={styles.brandMark}>
                <Image src="/assets/landtravel-logo.png" alt="" width={1254} height={1254} priority />
              </span>
              <span>Land Travel</span>
            </Link>

            <div className={styles.heading}>
              <h1>Welcome Back Traveler!</h1>
              <p>We are happy to see you again</p>
            </div>

            <div className={styles.segmented} aria-label="Authentication mode">
              <span className={styles.segmentActive}>Sign in</span>
              <Link href="/signup">Sign Up</Link>
            </div>

            <AnimatePresence mode="wait">
              {!isLoading ? (
                <motion.form
                  key="login-form"
                  className={styles.form}
                  onSubmit={handleLogin}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
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
                      placeholder="Enter your password"
                    />
                    <Eye size={18} aria-hidden="true" />
                  </label>

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

                  <button className={styles.loginButton} type="submit">
                    Login
                  </button>

                  <p className={styles.demoNote}>
                    Demo mode: use any email and password to open the portal.
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
              Unauthorized use or reproduction of portal content is prohibited.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
