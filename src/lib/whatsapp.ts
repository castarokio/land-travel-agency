import { siteConfig } from "@/data/site";

export function createWhatsappLink(message: string) {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
