import { MessageCircle, ArrowRight } from "lucide-react";
import { createWhatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";

export function WhatsAppCTA() {
  const whatsappUrl = createWhatsappLink("Hello Land Travel, I have a quick question.");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-emerald-600/20 hover:shadow-xl transition-all duration-300 transform active:scale-[0.99] group overflow-hidden relative"
    >
      {/* Background shape */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 translate-x-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="p-4 rounded-2xl bg-white/10 text-white shrink-0">
            <MessageCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-1">
              Need a Fast Answer? Chat via WhatsApp
            </h3>
            <p className="text-sm text-white/80 max-w-2xl font-medium leading-relaxed">
              Connect directly with our consulting advisors for instant support. Send us a message on {siteConfig.contact.whatsapp}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-bold bg-white text-emerald-700 px-6 py-3 rounded-full shrink-0 group-hover:bg-emerald-50 transition-colors">
          <span>Open Chat</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
