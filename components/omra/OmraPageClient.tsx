"use client";

import Image from "next/image";
import { useState } from "react";
import { Award, BookOpen, Check, Hotel, Send, ShieldCheck } from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { useInquiryForm, omraInquirySchema, OmraInquiryFields } from "@/components/inquiry/useInquiryForm";
import { createWhatsappLink } from "@/lib/whatsapp";
import { asset, omraPackages } from "@/lib/site-data";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function OmraPageClient() {
  const [selectedFormula, setSelectedFormula] = useState(omraPackages[0].id);
  const { register, handleSubmit, formState: { errors }, setSubmitted, submitted, getValues, reset } = useInquiryForm(
    omraInquirySchema,
    {
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        pilgrims: "1",
        departureMonth: "Octobre 2026",
        notes: ""
      }
    }
  );

  const onSubmit = async (data: OmraInquiryFields) => {
    const activeFormulaObj = omraPackages.find(p => p.id === selectedFormula) || omraPackages[0];
    
    // Save inquiry to Supabase
    const supabase = createClient();
    const { error: dbError } = await supabase.from("inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service_type: "omra",
      destination_or_package: `Formule: ${activeFormulaObj.name} (${data.departureMonth}, ${data.pilgrims} Pèlerins)`,
      message: data.notes || null,
      preferred_contact: "whatsapp",
    });

    if (dbError) {
      console.error("Failed to save inquiry to database:", dbError);
    }

    let message = `Bonjour Land Travel, je souhaite réserver ma place pour l'Omra :\n`;
    message += `• Formule : ${activeFormulaObj.name}\n`;
    message += `• Nom Complet : ${data.name}\n`;
    message += `• E-mail : ${data.email}\n`;
    message += `• Téléphone : ${data.phone}\n`;
    message += `• Participants : ${data.pilgrims === "1" ? "1 Personne" : data.pilgrims === "2" ? "2 Personnes" : data.pilgrims === "3-4" ? "Chambre Famille (3-4 pers.)" : "Groupe / Plus de 5"}\n`;
    message += `• Départ souhaité : ${data.departureMonth}\n`;
    if (data.notes) {
      message += `• Remarques : ${data.notes}\n`;
    }

    const whatsappUrl = createWhatsappLink(message);
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  const ziyaratSites = [
    {
      name: "Mont Uhud",
      image: asset("omra-ziyarat-uhud.webp"),
      description: "Le site historique de la bataille de Uhud, lieu de recueillement et d'histoire spirituelle près de Madinah."
    },
    {
      name: "Grotte de Hira",
      image: asset("omra-ziyarat-hira.webp"),
      description: "Située sur le mont Jabal al-Noor à Makkah, le lieu de la première révélation coranique à notre Prophète (SWS)."
    },
    {
      name: "Mosquée de Quba",
      image: asset("omra-quba-mosque.webp"),
      description: "La toute première mosquée de l'Islam construite par le Prophète (SWS) à son arrivée à Madinah."
    },
    {
      name: "Masjid an-Nabawi",
      image: asset("omra-masjid-nabawi.webp"),
      description: "La mosquée sacrée du Prophète (SWS) à Madinah, abritant sa sainte tombe et le Rawdah béni."
    }
  ];

  const handleSelectFormula = (formulaId: string) => {
    setSelectedFormula(formulaId);
    const formSection = document.getElementById("omra-inquiry-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeFormulaObj = omraPackages.find(p => p.id === selectedFormula) || omraPackages[0];

  return (
    <MotionPageShell>
      {/* Spiritual Hero */}
      <PageHero
        title="Formules Omra Complètes & Encadrées"
        subtitle="Vivez le voyage de votre vie avec sérénité spirituelle. Nos équipes s'occupent de toute la logistique, des démarches de visa aux cours de préparation et visites guidées."
        backgroundImage={asset("omra-masjid-nabawi-sunset.webp")}
        overlayColor="bg-emerald-950/80"
      />

      {/* Package Selection Cards */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="flex flex-col items-center mb-12">
            <SectionHeader
              label="Formules 2026"
              title="Comparez nos offres de pèlerinage"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {omraPackages.map((pkg) => {
              const isPrestige = pkg.id === "prestige";
              return (
                <Card 
                  className={`flex flex-col h-full bg-white relative overflow-hidden transition-all duration-300 ${
                    isPrestige ? "border-emerald-600 border-2 ring-1 ring-emerald-600/10 shadow-md" : ""
                  }`}
                  key={pkg.id}
                  hoverable={true}
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image 
                      src={pkg.image} 
                      alt={pkg.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={isPrestige}
                    />
                    {isPrestige && (
                      <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10">
                        Recommandé VIP
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-text mb-1">{pkg.name}</h3>
                    <span className="text-sm text-muted font-medium mb-4 block">{pkg.duration}</span>

                    {/* Price Range */}
                    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 mb-6">
                      <span className="block text-[10px] uppercase tracking-wider text-emerald-800 font-extrabold mb-1">
                        Budget indicatif
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-700">
                        {pkg.priceRange}
                      </span>
                    </div>

                    {/* Hotel Info */}
                    <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                      <div className="flex gap-2.5 items-start">
                        <Hotel className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-text">Makkah :</strong> <span className="text-muted leading-relaxed">{pkg.hotelMakkah}</span>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <Hotel className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-text">Madinah :</strong> <span className="text-muted leading-relaxed">{pkg.hotelMadinah}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8 text-sm text-muted flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Select Formula Button */}
                    <Button 
                      onClick={() => handleSelectFormula(pkg.id)}
                      className={`w-full mt-auto !py-3 ${
                        isPrestige 
                          ? "!bg-emerald-600 hover:!bg-emerald-700 !text-white border-transparent" 
                          : "!border-emerald-600 !text-emerald-700 hover:!bg-emerald-50 bg-transparent border-2"
                      }`}
                    >
                      Sélectionner cette formule
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Ziyarat Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col items-center mb-12">
            <SectionHeader
              label="Excursions religieuses"
              title="Visites Historiques (Ziyarat) Incluses"
              description="Revivez l'histoire de la révélation lors de nos sorties encadrées par des guides théologiens bilingues."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ziyaratSites.map((site, idx) => (
              <div 
                className="group relative h-80 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md" 
                key={idx}
              >
                <Image 
                  src={site.image} 
                  alt={site.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <h4 className="text-lg font-bold mb-1.5 text-yellow-300 drop-shadow-sm">{site.name}</h4>
                  <p className="text-xs text-white/90 leading-relaxed transition-all duration-300 opacity-100 max-h-24 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-24">
                    {site.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-slate-50 border-t border-slate-100" id="omra-inquiry-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col - Benefits */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
                  Dossier & Devis
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text mt-4 mb-3">
                  Réserver ma place
                </h2>
                <p className="text-muted leading-relaxed">
                  Afin de garantir votre vol direct et vos réservations d&apos;hôtel dans les meilleures conditions, nous vous conseillons d&apos;effectuer vos demandes d&apos;inscription le plus tôt possible.
                </p>
              </div>

              {/* Benefit Items */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/30 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">Visa Omra Garanti</h4>
                    <p className="text-sm text-muted leading-relaxed">Agrément officiel du Ministère du Hajj pour le traitement express de vos visas électroniques Nusuk.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/30 text-emerald-700 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">Préparation Spirituelle</h4>
                    <p className="text-sm text-muted leading-relaxed">Séance de formation collective avant le départ : rites, conseils pratiques et guide écrit offert.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/30 text-emerald-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">Accompagnement Continu</h4>
                    <p className="text-sm text-muted leading-relaxed">Un encadrant technique et un guide spirituel bilingues restent joignables 24h/24 sur place.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm">
                {!submitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Nom Complet *</label>
                        <input 
                          type="text" 
                          id="name" 
                          {...register("name")}
                          placeholder="Youssef Alami" 
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${errors.name ? "error" : ""}`}
                        />
                        {errors.name && (
                          <span className="error-message">{errors.name.message}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Adresse E-mail *</label>
                        <input 
                          type="email" 
                          id="email" 
                          {...register("email")}
                          placeholder="youssef.alami@example.com" 
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && (
                          <span className="error-message">{errors.email.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Téléphone *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          {...register("phone")}
                          placeholder="+33 6 99 88 77 66" 
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${errors.phone ? "error" : ""}`}
                        />
                        {errors.phone && (
                          <span className="error-message">{errors.phone.message}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="formula" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Formule choisie</label>
                        <select 
                          id="formula"
                          value={selectedFormula}
                          onChange={(e) => setSelectedFormula(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                        >
                          {omraPackages.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="pilgrims" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Nombre de pèlerins</label>
                        <select 
                          id="pilgrims"
                          {...register("pilgrims")}
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${errors.pilgrims ? "error" : ""}`}
                        >
                          <option value="1">1 Personne</option>
                          <option value="2">2 Personnes (Chambre Double)</option>
                          <option value="3-4">Chambre Famille (3-4 pers.)</option>
                          <option value="5+">Groupe / Plus de 5</option>
                        </select>
                        {errors.pilgrims && (
                          <span className="error-message">{errors.pilgrims.message}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="month" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Mois de départ visé</label>
                        <select 
                          id="month"
                          {...register("departureMonth")}
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${errors.departureMonth ? "error" : ""}`}
                        >
                          <option value="Octobre 2026">Octobre 2026 (Vacances Scolaires)</option>
                          <option value="Décembre 2026">Décembre 2026 (Climat idéal)</option>
                          <option value="Février 2027">Février 2027</option>
                          <option value="Ramadan 2027">Mois de Ramadan 2027 (Omra Ramadan)</option>
                        </select>
                        {errors.departureMonth && (
                          <span className="error-message">{errors.departureMonth.message}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-extrabold uppercase tracking-wider text-muted mb-2">Remarques, demandes spéciales ou besoins d&apos;assistance médicale</label>
                      <textarea 
                        id="notes" 
                        rows={3} 
                        {...register("notes")}
                        placeholder="Ex: besoin d'un fauteuil roulant, départ depuis une autre ville..."
                        className={`w-full px-4 py-3 rounded-xl border border-border bg-slate-50/50 text-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors resize-none ${errors.notes ? "error" : ""}`}
                      />
                      {errors.notes && (
                        <span className="error-message">{errors.notes.message}</span>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full !bg-emerald-600 hover:!bg-emerald-700 !shadow-emerald-600/20 mt-2 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Envoyer ma demande d&apos;inscription
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center rounded-full mb-4 animate-[scale-up_180ms_cubic-bezier(0.175,0.885,0.32,1.275)]">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">Demande Enregistrée !</h3>
                    <p className="text-sm text-muted mb-6 max-w-md">
                      Chaleureux remerciements <strong>{getValues("name")}</strong>. Votre pré-inscription pour la <strong>{activeFormulaObj.name}</strong> a bien été enregistrée pour <strong>{getValues("departureMonth")}</strong>.
                    </p>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 w-full text-sm text-left mb-6 space-y-2.5">
                      <div><strong>Formule :</strong> <span className="text-muted">{activeFormulaObj.name}</span></div>
                      <div><strong>Participants :</strong> <span className="text-muted">{getValues("pilgrims") === "1" ? "1 Pèlerin" : getValues("pilgrims") === "2" ? "2 Pèlerins" : getValues("pilgrims")}</span></div>
                      <div><strong>Départ souhaité :</strong> <span className="text-muted">{getValues("departureMonth")}</span></div>
                      <hr className="border-slate-200 my-2" />
                      <div className="text-xs text-muted leading-relaxed">
                        <strong>Prochaine étape :</strong> Un conseiller spécialiste du pèlerinage va étudier votre dossier. Vous recevrez les devis et la liste des documents requis par email ({getValues("email")}) sous 24h.
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        reset();
                        setSubmitted(false);
                      }}
                      className="!border-emerald-600 !text-emerald-700 hover:!bg-emerald-50 bg-transparent"
                    >
                      Faire une autre pré-inscription
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </MotionPageShell>
  );
}
