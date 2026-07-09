"use client";

import { useForm, UseFormProps, FieldValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as z from "zod";

// Base contact fields schema
export const contactSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().min(8, "Le numéro de téléphone doit contenir au moins 8 chiffres."),
});

// Local & International Tourism Schema
export const tourismInquirySchema = contactSchema.extend({
  travelers: z.string().min(1, "Veuillez sélectionner le nombre de voyageurs."),
  date: z.string().min(1, "Veuillez sélectionner une date de départ."),
  notes: z.string().optional(),
});

// Omra Schema
export const omraInquirySchema = contactSchema.extend({
  pilgrims: z.string().min(1, "Veuillez sélectionner le nombre de pèlerins."),
  departureMonth: z.string().min(1, "Veuillez sélectionner un mois de départ."),
  notes: z.string().optional(),
});

export type ContactFields = z.infer<typeof contactSchema>;
export type TourismInquiryFields = z.infer<typeof tourismInquirySchema>;
export type OmraInquiryFields = z.infer<typeof omraInquirySchema>;

type ZodResolverSchema = Parameters<typeof zodResolver>[0];

export function useInquiryForm<TFieldValues extends FieldValues>(
  schema: ZodResolverSchema,
  options?: Omit<UseFormProps<TFieldValues>, "resolver">
) {
  const form = useForm<TFieldValues>({
    ...options,
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
  });

  const [submitted, setSubmitted] = useState(false);

  return {
    ...form,
    submitted,
    setSubmitted,
  };
}
