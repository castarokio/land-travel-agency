"use client";

import Image from "next/image";
import { useState } from "react";
import { Award, Check, Compass, Phone, Send, Star } from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { useInquiryForm, tourismInquirySchema, TourismInquiryFields } from "@/components/inquiry/useInquiryForm";
import { createWhatsappLink } from "@/lib/whatsapp";
import { asset, localTours } from "@/lib/site-data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export default function LocalTourismPageClient() {
  const [selectedTour, setSelectedTour] = useState(localTours[0].id);
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

  const handleSelectTour = (tourId: string) => {
    setSelectedTour(tourId);
    // Scroll down to form
    const formSection = document.getElementById("inquiry-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeTourObj = localTours.find(t => t.id === selectedTour) || localTours[0];

  const onSubmit = (data: TourismInquiryFields) => {
    let message = `Bonjour Land Travel, je souhaite me renseigner sur le circuit local :\n`;
    message += `• Circuit : ${activeTourObj.title}\n`;
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

  return (
    <MotionPageShell>
      {/* Hero Header */}
      <PageHero
        title="Tourisme Local & Circuits d'Aventure"
        subtitle="Partez à la rencontre des paysages grandioses de notre terroir. Désert saharien, cités impériales chargées d'histoire et randonnées sauvages vous attendent."
        backgroundImage={asset("local-desert-sunset.webp")}
        overlayColor="bg-black/40"
      />

      {/* Main Content Grid */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {localTours.map((tour) => (
            <Card key={tour.id} className="flex flex-col h-full bg-white border border-border rounded-3xl" hoverable={true}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge variant="orange">Local</Badge>
                  <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">{tour.duration}</Badge>
                </div>
              </div>
              <div className="flex flex-col flex-grow p-6 md:p-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-orange">
                    Circuit Découverte
                  </span>
                  <div className="flex gap-0.5 text-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current text-orange" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
                  {tour.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted mb-6 line-clamp-3">
                  {tour.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-text mb-3">
                    Prestations Incluses :
                  </h4>
                  <ul className="space-y-2">
                    {tour.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                        <Check size={16} className="text-orange shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted font-bold">
                      Tarif indicatif
                    </span>
                    <span className="text-xl md:text-2xl font-extrabold text-orange">
                      {tour.price}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handleSelectTour(tour.id)}
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    Réserver / Se renseigner
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Inquiry Form Section */}
      <section className="py-20 bg-cream/20 border-t border-border" id="inquiry-form-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col - Benefits */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs uppercase font-extrabold tracking-widest text-orange mb-3">
                Devis Gratuit
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-6">
                Planifiez votre expédition
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Remplissez ce formulaire et notre conseiller local vous recontactera sous 24h ouvrées pour finaliser les détails de votre voyage sur mesure.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Itinéraires Flexibles</h4>
                    <p className="text-sm text-muted">Modifiez le rythme, l&apos;hébergement et les activités selon vos envies.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Accompagnement Expert</h4>
                    <p className="text-sm text-muted">Des chauffeurs et guides professionnels agréés pour votre confort et sécurité.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">Assistance Locale H24</h4>
                    <p className="text-sm text-muted">Une ligne téléphonique directe disponible pendant toute la durée de votre séjour.</p>
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
                          placeholder="Jean Dupont"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && (
                          <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>
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
                          placeholder="jean.dupont@example.com"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
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
                          placeholder="+33 6 12 34 56 78"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.phone ? "border-red-500" : ""}`}
                        />
                        {errors.phone && (
                          <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="tour" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Circuit Sélectionné
                        </label>
                        <select 
                          id="tour"
                          value={selectedTour}
                          onChange={(e) => setSelectedTour(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                        >
                          {localTours.map((t) => (
                            <option key={t.id} value={t.id}>{t.title}</option>
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
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${errors.travelers ? "border-red-500" : ""}`}
                        >
                          <option value="1">1 Personne</option>
                          <option value="2">2 Personnes</option>
                          <option value="3-5">Famille (3-5 pers.)</option>
                          <option value="6+">Groupe (6+ pers.)</option>
                        </select>
                        {errors.travelers && (
                          <span className="text-xs text-red-500 mt-1">{errors.travelers.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="date" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                          Date de départ souhaitée
                        </label>
                        <input 
                          type="date" 
                          id="date" 
                          {...register("date")}
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${errors.date ? "border-red-500" : ""}`}
                        />
                        {errors.date && (
                          <span className="text-xs text-red-500 mt-1">{errors.date.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="notes" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                        Demandes spéciales / Remarques
                      </label>
                      <textarea 
                        id="notes" 
                        rows={4} 
                        {...register("notes")}
                        placeholder="Ex: lit bébé nécessaire, allergies alimentaires, vol de nuit..."
                        className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.notes ? "border-red-500" : ""}`}
                      />
                      {errors.notes && (
                        <span className="text-xs text-red-500 mt-1">{errors.notes.message}</span>
                      )}
                    </div>

                    <Button type="submit" variant="primary" className="w-full shadow-lg">
                      <Send size={16} className="mr-2" /> Envoyer ma demande
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-4">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-text mb-2">Demande Reçue !</h3>
                    <p className="text-sm md:text-base text-muted mb-6">
                      Merci <strong>{getValues("name")}</strong>. Votre demande de renseignements pour le circuit <strong>&quot;{activeTourObj.title}&quot;</strong> a été enregistrée.
                    </p>
                    <div className="bg-cream/10 border border-dashed border-border rounded-2xl p-6 w-full text-left text-sm mb-6 space-y-2 text-text">
                      <div><strong>Voyageurs :</strong> {getValues("travelers") === "1" ? "1 Voyageur" : getValues("travelers") === "2" ? "2 Voyageurs" : getValues("travelers")}</div>
                      {getValues("date") && <div><strong>Départ estimé :</strong> {getValues("date")}</div>}
                      <div><strong>Statut :</strong> Un conseiller vous contactera par email ({getValues("email")}) ou par téléphone ({getValues("phone")}) sous 24h.</div>
                    </div>
                    <Button variant="outline" size="md" onClick={() => {
                      reset();
                      setSubmitted(false);
                    }}>
                      Faire une autre demande
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
