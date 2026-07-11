"use client";

import Image from "next/image";
import { useState } from "react";
import { Award, Check, Plane, Send, ShieldCheck, Star } from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { useInquiryForm, tourismInquirySchema, TourismInquiryFields } from "@/components/inquiry/useInquiryForm";
import { createWhatsappLink } from "@/lib/whatsapp";
import { asset, intlPackages } from "@/lib/site-data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/client";

export default function InternationalTourismPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPkg, setSelectedPkg] = useState(intlPackages[0].id);
  const { register, handleSubmit, formState: { errors }, setSubmitted, submitted, getValues, reset } = useInquiryForm(
    tourismInquirySchema,
    {
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        travelers: "1",
        date: "",
        notes: ""
      }
    }
  );

  const onSubmit = async (data: TourismInquiryFields) => {
    const activePkgObj = intlPackages.find(p => p.id === selectedPkg) || intlPackages[0];
    
    // Save inquiry to Supabase
    const supabase = createClient();
    const { error: dbError } = await supabase.from("inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service_type: "tourism_international",
      destination_or_package: `Package: ${activePkgObj.title} (${data.date}, ${data.travelers} voyageurs)`,
      message: data.notes || null,
      preferred_contact: "whatsapp",
    });

    if (dbError) {
      console.error("Failed to save inquiry to database:", dbError);
    }

    let message = `Bonjour Land Travel, je souhaite me renseigner sur le voyage organisé international :\n`;
    message += `• Destination : ${activePkgObj.title}\n`;
    message += `• Nom Complet : ${data.name}\n`;
    message += `• E-mail : ${data.email}\n`;
    message += `• Téléphone : ${data.phone}\n`;
    message += `• Voyageurs : ${data.travelers === "1" ? "1 Personne" : data.travelers === "2" ? "2 Personnes" : data.travelers === "3-5" ? "Famille (3-5 pers.)" : "Groupe (6+ pers.)"}\n`;
    message += `• Date de départ estimée : ${data.date}\n`;
    if (data.notes) {
      message += `• Précisions : ${data.notes}\n`;
    }

    const whatsappUrl = createWhatsappLink(message);
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  const categories = ["All", "Europe", "Asia", "Tropical", "Adventure"];

  const filteredPackages = activeCategory === "All" 
    ? intlPackages 
    : intlPackages.filter(p => p.category === activeCategory);

  const handleSelectPkg = (pkgId: string) => {
    setSelectedPkg(pkgId);
    const formSection = document.getElementById("intl-inquiry-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activePkgObj = intlPackages.find(p => p.id === selectedPkg) || intlPackages[0];

  return (
    <MotionPageShell>
      {/* Hero Header */}
      <PageHero
        title="Destinations de Rêve & Voyages Organisés"
        subtitle="Des plages sauvages des Maldives aux ruelles néons de Tokyo, en passant par les safaris du Serengeti, envolez-vous vers la destination de vos rêves en toute sérénité."
        backgroundImage={asset("intl-maldives-resort.webp")}
        overlayColor="bg-black/40"
      />

      {/* Categories Filter Menu */}
      <Container className="py-12">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-primary/5 text-primary hover:bg-primary/10 border border-transparent"
              }`}
            >
              {category === "All" ? "Toutes les destinations" : category}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col h-full bg-white border border-border rounded-3xl" hoverable={true}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge variant="primary">{pkg.category}</Badge>
                  <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">{pkg.duration}</Badge>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-primary">
                    Vol Régulier Inclus
                  </span>
                  <div className="flex gap-0.5 text-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current text-orange" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-text mb-3">
                  {pkg.title}
                </h3>
                
                <p className="text-sm text-muted mb-6 line-clamp-3">
                  {pkg.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-text mb-2.5">
                    Points Forts du Voyage :
                  </h4>
                  <ul className="space-y-1.5 mb-5">
                    {pkg.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted">
                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {pkg.inclusions && (
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold text-muted mb-2">
                        Compris dans le tarif
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.inclusions.map((inc, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white border border-border px-2 py-0.5 rounded font-semibold text-text"
                          >
                            ✓ {inc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-5 border-t border-border flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted font-bold">
                      Tarif tout compris
                    </span>
                    <span className="text-xl font-extrabold text-primary">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleSelectPkg(pkg.id)}
                    variant="primary"
                    size="sm"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Inquiry Form Section */}
      <section className="py-20 bg-cream/20 border-t border-border" id="intl-inquiry-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col - Benefits */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary mb-3">
                Devis sans engagement
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-6">
                Réservez vos vols & hôtels
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Notre équipe de conseillers s&apos;occupe de l&apos;intégralité de vos démarches : réservation des billets, hébergements haut de gamme, transferts aéroport et assistance visa touristique si requise.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Plane size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Partenariats Aériens VIP</h4>
                    <p className="text-sm text-muted">Accords de tarifs négociés avec les plus grandes compagnies aériennes régulières.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Voyage 100% Assuré</h4>
                    <p className="text-sm text-muted">Possibilité d&apos;inclure une assurance multirisque annulation et rapatriement de premier plan.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Hôtels Sélectionnés</h4>
                    <p className="text-sm text-muted">Établissements 4 et 5 étoiles audités régulièrement pour garantir la meilleure literie et hygiène.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Form */}
            <div className="lg:col-span-7">
              <Card glassmorphic className="p-6 md:p-8 border border-border shadow-premium/5 bg-white rounded-3xl" hoverable={false}>
                {!submitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Nom Complet *
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          {...register("name")}
                          placeholder="Alice Martin"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.name ? "error" : ""}`}
                        />
                        {errors.name && (
                          <span className="error-message">{errors.name.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Adresse E-mail *
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          {...register("email")}
                          placeholder="alice.martin@example.com"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && (
                          <span className="error-message">{errors.email.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label htmlFor="phone" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Téléphone *
                        </label>
                        <input 
                          type="tel" 
                          id="phone" 
                          {...register("phone")}
                          placeholder="+33 7 98 76 54 32"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.phone ? "error" : ""}`}
                        />
                        {errors.phone && (
                          <span className="error-message">{errors.phone.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pkg" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Destination souhaitée
                        </label>
                        <select 
                          id="pkg"
                          value={selectedPkg}
                          onChange={(e) => setSelectedPkg(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                        >
                          {intlPackages.map((p) => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label htmlFor="travelers" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Nombre de voyageurs
                        </label>
                        <select 
                          id="travelers"
                          {...register("travelers")}
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${errors.travelers ? "error" : ""}`}
                        >
                          <option value="1">1 Personne</option>
                          <option value="2">2 Personnes (Couple)</option>
                          <option value="3-5">Famille (3-5 pers.)</option>
                          <option value="6+">Groupe (6+ pers.)</option>
                        </select>
                        {errors.travelers && (
                          <span className="error-message">{errors.travelers.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="date" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Date estimée de départ
                        </label>
                        <input 
                          type="date" 
                          id="date" 
                          {...register("date")}
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${errors.date ? "error" : ""}`}
                        />
                        {errors.date && (
                          <span className="error-message">{errors.date.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="notes" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                        Précisions supplémentaires (Hôtel de préférence, classe affaire, escales...)
                      </label>
                      <textarea 
                        id="notes" 
                        rows={3} 
                        {...register("notes")}
                        placeholder="Ex: lit double requis, hôtel vue mer ou centre-ville, préférence de vol direct..."
                        className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.notes ? "error" : ""}`}
                      />
                      {errors.notes && (
                        <span className="error-message">{errors.notes.message}</span>
                      )}
                    </div>

                    <Button type="submit" variant="primary" className="w-full shadow-lg">
                      <Send size={16} className="mr-2" /> Envoyer ma demande de voyage
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-4">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-text mb-2">Demande Enregistrée !</h3>
                    <p className="text-sm md:text-base text-muted mb-6">
                      Merci <strong>{getValues("name")}</strong>. Votre dossier pour le package international <strong>&quot;{activePkgObj.title}&quot;</strong> a été transmis à notre service de réservation.
                    </p>
                    <div className="bg-cream/10 border border-dashed border-border rounded-2xl p-6 w-full text-left text-sm mb-6 space-y-2 text-text">
                      <div><strong>Package :</strong> {activePkgObj.title} ({activePkgObj.duration})</div>
                      <div><strong>Voyageurs :</strong> {getValues("travelers") === "2" ? "2 personnes (Couple)" : getValues("travelers") === "1" ? "1 voyageur" : getValues("travelers")}</div>
                      {getValues("date") && <div><strong>Date :</strong> {getValues("date")}</div>}
                      <div><strong>Traitement :</strong> Un expert en vols internationaux étudie votre demande pour vous proposer le meilleur tarif et le meilleur itinéraire. Réponse sous 24h.</div>
                    </div>
                    <Button variant="outline" size="md" onClick={() => {
                      reset();
                      setSubmitted(false);
                    }}>
                      Calculer un autre tarif
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </MotionPageShell>
  );
}
