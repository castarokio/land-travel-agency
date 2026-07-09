"use client";

import { use, useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Star, 
  MapPin, 
  Share2, 
  Bookmark, 
  Hotel, 
  Map, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Send,
  Check
} from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { tourismDestinations } from "@/lib/site-data";
import { Container } from "@/components/ui/Container";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Card } from "@/components/ui/Card";
import { useInquiryForm, tourismInquirySchema, TourismInquiryFields } from "@/components/inquiry/useInquiryForm";
import { createWhatsappLink } from "@/lib/whatsapp";

export default function DestinationDetailPageClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dest = tourismDestinations.find((d) => d.id === id);

  // States for interactive components
  const [selectedDay, setSelectedDay] = useState(0);
  const [openHighlightIndex, setOpenHighlightIndex] = useState(0);
  const [openIncludedIndex, setOpenIncludedIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

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

  const onSubmit = (data: TourismInquiryFields) => {
    if (!dest) return;
    
    let message = `Bonjour Land Travel, je souhaite me renseigner sur la destination :\n`;
    message += `• Destination : ${dest.name}\n`;
    message += `• Nom Complet : ${data.name}\n`;
    message += `• E-mail : ${data.email}\n`;
    message += `• Téléphone : ${data.phone}\n`;
    message += `• Voyageurs : ${data.travelers === "1" ? "1 Personne" : data.travelers === "2" ? "2 Personnes" : data.travelers === "3-5" ? "Famille (3-5 pers.)" : "Groupe (6+ pers.)"}\n`;
    message += `• Date de départ souhaitée : ${data.date}\n`;
    if (data.notes) {
      message += `• Demandes spéciales : ${data.notes}\n`;
    }

    const whatsappUrl = createWhatsappLink(message);
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  if (!dest) {
    return (
      <div className="text-center py-24 px-6 max-w-xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
          Destination Introuvable
        </h1>
        <p className="text-muted mb-8">
          Le voyage que vous recherchez n&apos;existe pas ou a été déplacé.
        </p>
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
      </div>
    );
  }

  // Handle Share click
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  // Get related adventures (other destinations)
  const relatedDestinations = tourismDestinations.filter((d) => d.id !== dest.id).slice(0, 3);

  return (
    <MotionPageShell>
      
      {/* 1. HERO SECTION (Collage + Header info) */}
      <section className="pt-24 pb-12 border-b border-border">
        <Container>
          
          {/* Header Back Navigation */}
          <div className="mb-6">
            <BackLink href="/">Retour à l&apos;accueil</BackLink>
          </div>

          {/* Title & Actions Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-border mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-3">
                Évasion balnéaire : {dest.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin size={16} className="text-primary" /> {dest.location}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Star size={16} className="fill-yellow text-yellow" stroke="none" />
                  <span className="text-text font-bold">{dest.rating}</span>
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-semibold text-text hover:bg-muted/5 transition-colors"
              >
                <Share2 size={14} /> {shareSuccess ? "Copié !" : "Partager"}
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-semibold transition-colors ${
                  isSaved ? "bg-primary/5 text-primary border-primary/20" : "text-text hover:bg-muted/5"
                }`}
              >
                <Bookmark size={14} className={isSaved ? "fill-primary text-primary" : ""} /> 
                {isSaved ? "Enregistré" : "Enregistrer"}
              </button>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="md:col-span-2 relative h-[300px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm">
              <Image 
                src={dest.collage[0]} 
                alt={`${dest.name} main view`} 
                fill 
                className="object-cover hover:scale-[1.02] transition-transform duration-700"
                priority 
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            <div className="flex flex-row md:flex-col gap-4 h-full">
              <div className="flex-1 relative h-[140px] md:h-[232px] rounded-3xl overflow-hidden shadow-sm">
                <Image 
                  src={dest.collage[1]} 
                  alt={`${dest.name} side view 1`} 
                  fill 
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="flex-1 relative h-[140px] md:h-[232px] rounded-3xl overflow-hidden shadow-sm">
                <Image 
                  src={dest.collage[2]} 
                  alt={`${dest.name} side view 2`} 
                  fill 
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* 2. OFFER SUMMARY & DESCRIPTION SECTION */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Booking Info Card */}
            <div className="lg:col-span-5 bg-white border border-border rounded-3xl p-8 shadow-premium/5 lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-text mb-4">{dest.name} Bliss</h2>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {dest.shortDesc}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/5 rounded-full text-xs font-semibold text-text border border-border">
                  <Hotel size={16} strokeWidth={1.5} className="text-primary" />
                  <span>Hôtel & destination</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/5 rounded-full text-xs font-semibold text-text border border-border">
                  <Clock size={16} strokeWidth={1.5} className="text-primary" />
                  <span>{dest.duration}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/5 rounded-full text-xs font-semibold text-text border border-border">
                  <Map size={16} strokeWidth={1.5} className="text-primary" />
                  <span>{dest.placesCount}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-muted mb-1">À partir de</div>
                  <div className="text-2xl font-extrabold text-primary">{dest.price}</div>
                </div>
                <Button 
                  onClick={() => {
                    const formSection = document.getElementById("inquiry-form-section");
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  variant="primary" 
                  size="md"
                >
                  Réserver maintenant
                </Button>
              </div>
            </div>

            {/* Right Presentation Description Block */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-3">DESCRIPTION</span>
                <p className="text-base text-muted leading-relaxed">
                  {dest.intro}
                </p>
              </div>
              
              {/* Hotel recommendations listed cleanly inside description space */}
              <div className="pt-8 border-t border-border">
                <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-6">OÙ SÉJOURNER</span>
                <div className="space-y-6">
                  {dest.hotels.map((hotel, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 p-5 bg-muted/5 rounded-2xl border border-border/60">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                        {hotel.type}
                      </span>
                      <h4 className="text-lg font-bold text-text">
                        {hotel.name}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {hotel.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. TRAVEL ITINERARY SECTION */}
      <section className="py-16 bg-cream/15 border-y border-border">
        <Container>
          <div className="mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-3">PROGRAMME</span>
            <h2 className="text-3xl font-extrabold text-text">Votre itinéraire de voyage</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Day Tab Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
              {dest.itinerary.map((day, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`flex items-center justify-between p-4 rounded-xl text-left font-semibold text-sm transition-all border duration-200 ${
                    selectedDay === idx 
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/10" 
                      : "bg-white text-text border-border hover:bg-muted/5"
                  }`}
                >
                  <span className="truncate pr-4">{day.title}</span>
                  <ArrowRight size={14} className={`shrink-0 transition-opacity duration-200 ${selectedDay === idx ? "opacity-100" : "opacity-0"}`} />
                </button>
              ))}
            </div>

            {/* Center image that updates based on selection */}
            <div className="lg:col-span-4 relative h-[280px] lg:h-auto rounded-3xl overflow-hidden shadow-sm">
              <Image 
                src={dest.itinerary[selectedDay].image} 
                alt={dest.itinerary[selectedDay].title} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Right Day Details */}
            <div className="lg:col-span-4 flex flex-col justify-center p-8 bg-white border border-border rounded-3xl shadow-premium/5">
              <span className="inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold w-fit mb-4">
                Étape {selectedDay + 1}
              </span>
              <h3 className="text-xl font-bold text-text mb-4">
                {dest.itinerary[selectedDay].subtitle}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {dest.itinerary[selectedDay].desc}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. TRAVEL HIGHLIGHTS SECTION */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-3">POINTS FORTS</span>
            <h2 className="text-3xl font-extrabold text-text">Expériences inoubliables</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Paragraph + Editorial Image */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base text-muted leading-relaxed">
                Vivez des moments privilégiés au plus proche de la culture et des paysages. Notre formule propose un juste équilibre entre activités encadrées et temps libres d&apos;exploration personnelle.
              </p>
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-sm">
                <Image 
                  src={dest.collage[1]} 
                  alt="Travelers highlight scene" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Right Numbered Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {dest.highlights.map((highlight, idx) => {
                const isOpen = openHighlightIndex === idx;
                return (
                  <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-white transition-all duration-300">
                    <button 
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-text hover:bg-muted/5 transition-colors"
                      onClick={() => setOpenHighlightIndex(isOpen ? -1 : idx)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-extrabold text-primary/40">0{idx + 1}</span>
                        <span className="text-base md:text-lg">{highlight.title}</span>
                      </div>
                      <span className="text-muted shrink-0 ml-4">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden text-sm text-muted leading-relaxed px-5 ${
                        isOpen ? "max-h-[300px] pb-5 pt-1 border-t border-border/50" : "max-h-0"
                      }`}
                    >
                      {highlight.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. WHAT'S INCLUDED SECTION */}
      <section className="py-16 bg-cream/15 border-y border-border">
        <Container>
          <div className="mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-3">INCLUS</span>
            <h2 className="text-3xl font-extrabold text-text">Ce qui est compris dans votre expérience</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Inclusions Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {dest.whatsIncluded.map((included, idx) => {
                const isOpen = openIncludedIndex === idx;
                return (
                  <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-white transition-all duration-300">
                    <button 
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-text hover:bg-muted/5 transition-colors"
                      onClick={() => setOpenIncludedIndex(isOpen ? -1 : idx)}
                    >
                      <span className="text-base md:text-lg">{included.title}</span>
                      <span className="text-muted shrink-0 ml-4">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden text-sm text-muted leading-relaxed px-5 ${
                        isOpen ? "max-h-[300px] pb-5 pt-1 border-t border-border/50" : "max-h-0"
                      }`}
                    >
                      {included.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Vertical Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-sm">
              <Image 
                src={dest.collage[2]} 
                alt="Inclusions and accommodations detail" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100" id="inquiry-form-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col - Benefits */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  Devis Gratuit
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text mt-4 mb-3 font-sans">
                  Planifiez votre expédition
                </h2>
                <p className="text-muted leading-relaxed">
                  Remplissez ce formulaire et notre conseiller local vous recontactera sous 24h ouvrées pour finaliser les détails de votre voyage sur mesure.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1 font-sans">Itinéraires Flexibles</h4>
                    <p className="text-sm text-muted leading-relaxed">Modifiez le rythme, l&apos;hébergement et les activités selon vos envies.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1 font-sans">Accompagnement Expert</h4>
                    <p className="text-sm text-muted leading-relaxed">Des chauffeurs et guides professionnels agréés pour votre confort et sécurité.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1 font-sans">Assistance Locale H24</h4>
                    <p className="text-sm text-muted leading-relaxed">Une ligne téléphonique directe disponible pendant toute la durée de votre séjour.</p>
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
                          placeholder="jean.dupont@example.com"
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
                          placeholder="+33 6 12 34 56 78"
                          className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.phone ? "error" : ""}`}
                        />
                        {errors.phone && (
                          <span className="error-message">{errors.phone.message}</span>
                        )}
                      </div>
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
                          <option value="2">2 Personnes</option>
                          <option value="3-5">Famille (3-5 pers.)</option>
                          <option value="6+">Groupe (6+ pers.)</option>
                        </select>
                        {errors.travelers && (
                          <span className="error-message">{errors.travelers.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="date" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                        Date de départ souhaitée
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

                    <div className="flex flex-col">
                      <label htmlFor="notes" className="text-xs uppercase font-extrabold tracking-wider text-muted mb-2">
                        Demandes spéciales / Remarques
                      </label>
                      <textarea 
                        id="notes" 
                        rows={4} 
                        {...register("notes")}
                        placeholder="Ex: lit bébé nécessaire, allergies alimentaires, vol de nuit..."
                        className={`w-full px-4 py-3 rounded-xl border border-border bg-cream/5 text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.notes ? "error" : ""}`}
                      />
                      {errors.notes && (
                        <span className="error-message">{errors.notes.message}</span>
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
                      Merci <strong>{getValues("name")}</strong>. Votre demande de renseignements pour la destination <strong>&quot;{dest.name}&quot;</strong> a été enregistrée.
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

      {/* 6. RELATED ADVENTURES SECTION */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary block mb-3">GALERIE</span>
            <h2 className="text-3xl font-extrabold text-text">Explorer plus d&apos;aventures</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedDestinations.map((related) => (
              <DestinationCard key={related.id} destination={related} />
            ))}
          </div>
        </Container>
      </section>

      {/* 7. BOTTOM LARGE CTA BANNER (Full-Bleed, Edge-To-Edge) */}
      <section className="relative py-24 md:py-32 overflow-hidden text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-105"
          style={{ backgroundImage: `url(${dest.collage[0]})` }}
        />
        <div className="absolute inset-0 bg-primary-dark/80 mix-blend-multiply opacity-90" />
        
        <Container className="relative z-10 flex flex-col items-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Découvrez des destinations uniques, pensées pour vous
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-2xl font-medium">
            Chez Pathfinder, nous créons des voyages personnalisés selon vos envies. Laissez-nous organiser votre prochaine escapade de rêve.
          </p>
          <Button href="/#tourism" variant="secondary" size="lg">
            Commencer <ArrowRight size={16} className="ml-2" />
          </Button>
        </Container>
      </section>

    </MotionPageShell>
  );
}
