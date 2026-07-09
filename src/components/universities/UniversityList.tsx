"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, GraduationCap } from "lucide-react";
import { universities } from "@/data/universities";
import { UniversityCard } from "@/components/ui/UniversityCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function UniversityList() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedProgram, setSelectedProgram] = useState<string>("All");

  // Extract unique countries
  const countriesList = useMemo(() => {
    const countries = new Set<string>();
    universities.forEach((u) => countries.add(u.country));
    return ["All", ...Array.from(countries)];
  }, []);

  // Extract unique program categories (flattened and simplified)
  const programsList = useMemo(() => {
    const programs = new Set<string>();
    universities.forEach((u) => {
      u.programs.forEach((prog) => {
        // Group similar programs into broader categories for easier filtering
        if (prog.toLowerCase().includes("informatique") || prog.toLowerCase().includes("logiciel") || prog.toLowerCase().includes("intelligence")) {
          programs.add("Tech & Informatique");
        } else if (prog.toLowerCase().includes("business") || prog.toLowerCase().includes("mba") || prog.toLowerCase().includes("finance") || prog.toLowerCase().includes("commerce") || prog.toLowerCase().includes("management")) {
          programs.add("Management & Finance");
        } else if (prog.toLowerCase().includes("médecine") || prog.toLowerCase().includes("santé") || prog.toLowerCase().includes("neuroscience")) {
          programs.add("Santé & Médecine");
        } else if (prog.toLowerCase().includes("droit") || prog.toLowerCase().includes("sciences pol")) {
          programs.add("Droit & Politique");
        } else if (prog.toLowerCase().includes("génie") || prog.toLowerCase().includes("engineering")) {
          programs.add("Ingénierie");
        } else {
          programs.add("Sciences & Arts");
        }
      });
    });
    return ["All", ...Array.from(programs)];
  }, []);

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                            u.city.toLowerCase().includes(search.toLowerCase());
      
      const matchesCountry = selectedCountry === "All" || u.country === selectedCountry;

      const matchesProgram = selectedProgram === "All" || u.programs.some((prog) => {
        if (selectedProgram === "Tech & Informatique") {
          return prog.toLowerCase().includes("informatique") || prog.toLowerCase().includes("logiciel") || prog.toLowerCase().includes("intelligence");
        }
        if (selectedProgram === "Management & Finance") {
          return prog.toLowerCase().includes("business") || prog.toLowerCase().includes("mba") || prog.toLowerCase().includes("finance") || prog.toLowerCase().includes("commerce") || prog.toLowerCase().includes("management");
        }
        if (selectedProgram === "Santé & Médecine") {
          return prog.toLowerCase().includes("médecine") || prog.toLowerCase().includes("santé") || prog.toLowerCase().includes("neuroscience");
        }
        if (selectedProgram === "Droit & Politique") {
          return prog.toLowerCase().includes("droit") || prog.toLowerCase().includes("sciences pol");
        }
        if (selectedProgram === "Ingénierie") {
          return prog.toLowerCase().includes("génie") || prog.toLowerCase().includes("engineering");
        }
        // Fallback for Sciences & Arts
        return !prog.toLowerCase().match(/(informatique|logiciel|intelligence|business|mba|finance|commerce|management|médecine|santé|neuroscience|droit|sciences pol|génie|engineering)/);
      });

      return matchesSearch && matchesCountry && matchesProgram;
    });
  }, [search, selectedCountry, selectedProgram]);

  return (
    <div style={{ minHeight: "600px" }}>
      {/* Filtering Box Controls */}
      <div 
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "24px",
          marginBottom: "40px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "16px"
        }}
        className="md:grid-cols-3 shadow-sm"
      >
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search 
            className="w-4 h-4 text-muted" 
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} 
          />
          <input
            type="text"
            placeholder="Rechercher une université, une ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              background: "var(--cream)/10"
            }}
          />
        </div>

        {/* Country Selector */}
        <div style={{ position: "relative" }}>
          <MapPin 
            className="w-4 h-4 text-muted" 
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} 
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              color: "var(--text)",
              background: "var(--cream)/10",
              cursor: "pointer"
            }}
          >
            <option value="All">Toutes les destinations</option>
            {countriesList.filter(c => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Program Selector */}
        <div style={{ position: "relative" }}>
          <GraduationCap 
            className="w-4 h-4 text-muted" 
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} 
          />
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              color: "var(--text)",
              background: "var(--cream)/10",
              cursor: "pointer"
            }}
          >
            <option value="All">Toutes les spécialités</option>
            {programsList.filter(p => p !== "All").map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucun établissement trouvé"
          description="Essayez de modifier vos filtres de recherche ou de changer de pays pour découvrir d'autres universités partenaires."
          actionLabel="Réinitialiser les filtres"
          onAction={() => {
            setSearch("");
            setSelectedCountry("All");
            setSelectedProgram("All");
          }}
        />
      )}
    </div>
  );
}
