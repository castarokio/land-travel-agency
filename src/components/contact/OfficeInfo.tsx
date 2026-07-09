import { MapPin, Clock, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/data/site";

export function OfficeInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Branch Address */}
      <div className="p-8 border border-border bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3.5 rounded-2xl bg-primary/5 text-primary shrink-0 w-fit mb-6">
          <MapPin className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-text mb-2">Main Agency Office</h3>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          Our physical office is fully open to welcome students, travelers, and pilgrims for face-to-face consulting files.
        </p>
        
        <span className="text-base font-bold text-text block">
          {siteConfig.contact.address}
        </span>
      </div>

      {/* Working Hours */}
      <div className="p-8 border border-border bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3.5 rounded-2xl bg-orange/5 text-orange shrink-0 w-fit mb-6">
          <Clock className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-text mb-2">Opening Hours</h3>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          Our advisors are available to handle your phone lines and online inquiries during these standard hours.
        </p>
        
        <span className="text-base font-bold text-text block mb-1">
          {siteConfig.contact.workingHours}
        </span>
        <span className="text-xs text-red-500 font-bold flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5" /> Closed on Fridays
        </span>
      </div>
    </div>
  );
}
