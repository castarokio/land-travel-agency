"use client";

import { useState } from "react";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
};

export function useInquiryForm<TFormData extends ContactFields>(
  initialFormData: TFormData,
  requiredMessage = "Veuillez remplir tous les champs obligatoires (Nom, Email, Téléphone)."
) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  function setField<TKey extends keyof TFormData>(field: TKey, value: TFormData[TKey]) {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert(requiredMessage);
      return;
    }

    setSubmitted(true);
  }

  return {
    formData,
    handleSubmit,
    setField,
    setSubmitted,
    submitted
  };
}
