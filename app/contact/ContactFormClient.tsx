/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./contact.module.css";

export function ContactFormClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName || !lastName || !phone || !service) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("inquiries").insert({
        name: `${firstName} ${lastName}`,
        phone,
        email: email || null,
        service_type: "contact",
        destination_or_package: service,
        message: message || null,
        preferred_contact: "email",
      });

      if (error) {
        setErrorMsg(error.message);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setService("");
      setMessage("");
    } catch (e) {
      setErrorMsg("Une erreur s'est produite lors de l'envoi de la demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formSuccess} style={{
        textAlign: "center",
        padding: "40px 24px",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(5, 18, 45, 0.05)",
        border: "1px solid rgba(23, 26, 32, 0.08)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          color: "#10b981",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <Check size={28} />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#171a20", marginBottom: "10px" }}>
          Demande Envoyée !
        </h3>
        <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", marginBottom: "24px" }}>
          Merci pour votre message. Un conseiller Land Travel prendra contact avec vous dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="button button-small"
          type="button"
          style={{ cursor: "pointer" }}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      {errorMsg && (
        <div style={{
          color: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.08)",
          border: "1px solid rgba(239, 68, 68, 0.16)",
          borderRadius: "12px",
          padding: "14px",
          fontSize: "14px",
          fontWeight: "600",
          width: "100%",
          textAlign: "left",
          marginBottom: "14px"
        }}>
          {errorMsg}
        </div>
      )}
      <div className={styles.twoCol}>
        <label>
          Prénom *
          <input
            required
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Nom *
          <input
            required
            placeholder="Votre nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.twoCol}>
        <label>
          Téléphone *
          <input
            required
            placeholder="+213 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Adresse e-mail
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <label>
        Service demandé *
        <input
          required
          placeholder="Études, tourisme, Omra, visa..."
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </label>
      <label>
        Message
        <textarea
          placeholder="Expliquez votre besoin ou demande de rendez-vous"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
