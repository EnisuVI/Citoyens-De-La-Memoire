"use client";
import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

// Données fixes des membres (à remplir à la main)
const MEMBRES = [
  { nom: "Arnaud Willay", role: "Président", bio: "Fondateur et président de l'association." },
  { nom: "Clémentine Leroy", role: "Secrétaire", bio: "Coordination administrative." },
  { nom: "Guillaume Guillemant", role: "Trésorier", bio: "Gestion financière." },
  { nom: "Sophie Duby", role: "Membre", bio: "Membre de l'association." },
  { nom: "Timothée Leroy", role: "Membre", bio: "Membre de l'association." },
  { nom: "Agathe Wersinger", role: "Membre", bio: "Membre de l'association." },
  { nom: "Gabriel Guillemant", role: "Membre", bio: "Membre de l'association." },
  { nom: "Charles-Augustin Videlaine", role: "Membre", bio: "Membre de l'association." },
];

export default function MembresSection() {
  // State pour suivre quel membre est survolé
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="membres" style={{ background: '#fcfbf9', padding: '80px 48px', borderTop: '1px solid #eee' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6f47' }}>L'Équipe</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#2c3e50', marginTop: '10px', marginBottom: '12px' }}>Les membres</h2>
        <div style={{ width: '40px', height: '1px', background: '#8b6f47', margin: '0 auto' }}></div>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {MEMBRES.map((m, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              background: hoveredIndex === i ? '#f5f0e8' : '#fff', // Le fond change au hover
              padding: '20px 30px', 
              border: '1px solid #ede5d4', 
              borderRadius: '4px',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: '30px',
              transform: hoveredIndex === i ? 'translateX(10px)' : 'translateX(0)', // Léger décalage au hover
              transition: 'all 0.3s ease-in-out', // Animation fluide
              cursor: 'default',
              boxShadow: hoveredIndex === i ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            {/* Infos Principales */}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2c3e50', margin: 0 }}>{m.nom}</h3>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#6b6b6b', fontStyle: 'italic', margin: '4px 0 0' }}>
                {m.bio}
              </p>
            </div>

            {/* Rôle stylisé */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#8b6f47', 
              fontFamily: 'Arial, sans-serif', 
              fontSize: '0.65rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              opacity: hoveredIndex === i ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              <ShieldCheck size={14} />
              {m.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}