import { CheckCircle2 } from "lucide-react";
import { InquiryForm } from "@/components/ui/InquiryForm";

export function ContactForm() {
  const steps = [
    "Input your real name and contact details.",
    "Select your department target (Study, Tourism, Omra).",
    "Add travel destinations or university details.",
    "Click submit to open the message draft in WhatsApp.",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Information Column */}
      <div className="lg:col-span-5 space-y-6">
        <span className="block text-xs uppercase font-extrabold tracking-widest text-primary">
          Get in Touch
        </span>
        
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text leading-tight">
          Submit an Online Inquiry File
        </h2>
        
        <p className="text-base text-muted/90 leading-relaxed">
          Please fill out the form. Your information is processed instantly to generate a structured travel request ready to send to our WhatsApp desk.
        </p>

        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-extrabold text-text uppercase tracking-wider">
            Inquiry Submission Checklist
          </h4>
          
          <ul className="space-y-3">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-muted">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form Column */}
      <div className="lg:col-span-7">
        <InquiryForm serviceType="contact" />
      </div>
    </div>
  );
}
