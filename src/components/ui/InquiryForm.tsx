"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { createWhatsappLink } from "@/lib/whatsapp";
import { Button } from "./Button";
import { createClient } from "@/lib/supabase/client";

// Define the validation schema using Zod
const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  serviceType: z.enum(["study-abroad", "tourism", "omra", "contact"]),
  destinationOrPackage: z.string().optional(),
  message: z.string().optional(),
  preferredContact: z.enum(["whatsapp", "phone", "email"]),
});

type FormValues = z.infer<typeof formSchema>;

interface InquiryFormProps {
  serviceType?: "study-abroad" | "tourism" | "omra" | "contact";
  defaultDestination?: string;
  defaultPackage?: string;
  className?: string;
}

export function InquiryForm({
  serviceType = "contact",
  defaultDestination = "",
  defaultPackage = "",
  className = "",
}: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceType,
      destinationOrPackage: defaultDestination || defaultPackage || "",
      message: "",
      preferredContact: "whatsapp",
    },
  });

  // Prepopulate if props change dynamically
  useEffect(() => {
    setValue("serviceType", serviceType);
    setValue("destinationOrPackage", defaultDestination || defaultPackage || "");
  }, [serviceType, defaultDestination, defaultPackage, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Save lead to Supabase Database
      const supabase = createClient();
      const { error: dbError } = await supabase.from("inquiries").insert({
        name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        service_type: data.serviceType,
        destination_or_package: data.destinationOrPackage || null,
        message: data.message || null,
        preferred_contact: data.preferredContact,
      });

      if (dbError) {
        console.error("Failed to save inquiry to database:", dbError);
      }

      // Build WhatsApp message text
      const serviceLabels = {
        "study-abroad": "Study Abroad (Admission Support)",
        tourism: "Tourism/Holiday Package",
        omra: "Omra Pilgrimage Reservation",
        contact: "General Inquiry",
      };

      let message = `Hello Land Travel, I would like to make an inquiry:\n\n`;
      message += `• Name: ${data.fullName}\n`;
      message += `• Phone: ${data.phone}\n`;
      if (data.email) message += `• Email: ${data.email}\n`;
      message += `• Service: ${serviceLabels[data.serviceType]}\n`;
      if (data.destinationOrPackage) {
        message += `• Target: ${data.destinationOrPackage}\n`;
      }
      message += `• Preferred Contact: ${data.preferredContact.toUpperCase()}\n`;
      if (data.message) {
        message += `\nMessage:\n"${data.message}"`;
      }

      // Generate WhatsApp link and redirect
      const whatsappUrl = createWhatsappLink(message);
      window.open(whatsappUrl, "_blank");

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className={`bg-white border border-border p-6 md:p-8 rounded-3xl shadow-premium/5 ${className}`}>
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/5 text-primary flex items-center justify-center rounded-full mx-auto mb-4">
            <Send className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Inquiry Sent to WhatsApp!</h3>
          <p className="text-sm text-muted mb-6">
            We have redirected you to WhatsApp. You can send the formatted message directly to start chatting with our advisor.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
            Send another inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. John Doe"
              {...register("fullName")}
              className={`w-full px-4 py-3 rounded-xl border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
              }`}
            />
            {errors.fullName && (
              <span className="text-xs text-red-500 mt-1 block">{errors.fullName.message}</span>
            )}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. +213 555 12 34 56"
                {...register("phone")}
                className={`w-full px-4 py-3 rounded-xl border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  errors.phone ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                }`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. john@example.com"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
              )}
            </div>
          </div>

          {/* Service Selector & Destination/Package Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="serviceType" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
                Service Type
              </label>
              <select
                id="serviceType"
                {...register("serviceType")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="study-abroad">Study Abroad</option>
                <option value="tourism">Tourism / Holiday</option>
                <option value="omra">Omra Pilgrimage</option>
                <option value="contact">General Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="destinationOrPackage" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
                Destination / Package
              </label>
              <input
                id="destinationOrPackage"
                type="text"
                placeholder="e.g. Maldives, Canada, etc."
                {...register("destinationOrPackage")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
              Preferred Contact Method
            </label>
            <div className="flex gap-4">
              {["whatsapp", "phone", "email"].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer select-none">
                  <input
                    type="radio"
                    value={method}
                    {...register("preferredContact")}
                    className="w-4 h-4 text-primary focus:ring-primary/20 border-border"
                  />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">
              Your Message (Optional)
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us more about your travel or study plans..."
              {...register("message")}
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            className="w-full shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Open in WhatsApp"}
          </Button>
        </form>
      )}
    </div>
  );
}
