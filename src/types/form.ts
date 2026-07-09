export type InquiryFormData = {
  fullName: string;
  phone: string;
  email?: string;
  serviceType: "study-abroad" | "tourism" | "omra" | "contact";
  destination?: string;
  package?: string;
  message?: string;
  preferredContact: "whatsapp" | "phone" | "email";
};
