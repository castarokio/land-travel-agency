import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/data/site";
import { createWhatsappLink } from "@/lib/whatsapp";

export function ContactOptions() {
  const options = [
    {
      title: "Chat on WhatsApp",
      description: "Quick assistance for quick questions about any package or admission.",
      value: siteConfig.contact.whatsapp,
      icon: MessageCircle,
      href: createWhatsappLink("Hello Land Travel, I would like to make an inquiry."),
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Call Advisor",
      description: "Talk to a customer care agent directly during business hours.",
      value: siteConfig.contact.phone,
      icon: Phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
      color: "text-primary bg-primary/5 border-primary/10",
    },
    {
      title: "Email Support",
      description: "Send official study documents or custom booking inquiries.",
      value: siteConfig.contact.email,
      icon: Mail,
      href: `mailto:${siteConfig.contact.email}`,
      color: "text-pink bg-pink/5 border-pink/10",
    },
    {
      title: "Office Location",
      description: "Visit our main consulting agency in Tizi Ouzou.",
      value: siteConfig.contact.address,
      icon: MapPin,
      href: "#map-section",
      color: "text-orange bg-orange/5 border-orange/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {options.map((opt, idx) => {
        const Icon = opt.icon;

        return (
          <a
            key={idx}
            href={opt.href}
            target={opt.href.startsWith("http") ? "_blank" : undefined}
            rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block h-full group"
          >
            <Card className="p-6 flex flex-col h-full items-start group-hover:border-primary/30" hoverable={true}>
              <div className={`p-3 rounded-2xl border mb-5 transition-transform duration-300 group-hover:scale-105 ${opt.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-bold text-text mb-2">
                {opt.title}
              </h3>
              
              <p className="text-xs text-muted mb-4 leading-relaxed">
                {opt.description}
              </p>
              
              <span className="text-sm font-bold text-primary group-hover:underline break-all block mt-auto">
                {opt.value}
              </span>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
