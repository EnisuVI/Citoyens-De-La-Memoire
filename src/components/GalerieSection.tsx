"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalerieSection() {
  const [allPhotos, setAllPhotos] = useState<any[]>([]);
  const [randomPhotos, setRandomPhotos] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('galerie_photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setAllPhotos(data);
      // Mélange et sélection de 9 photos pour l'affichage principal
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRandomPhotos(shuffled.slice(0, 9));
    } else {
      setAllPhotos([]);
      setRandomPhotos([]);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Navigation au clavier pour la Lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev! + 1) % allPhotos.length);
    if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev! - 1 + allPhotos.length) % allPhotos.length);
    if (e.key === "Escape") setSelectedIndex(null);
  }, [allPhotos, selectedIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const placeholders = ['🏛️', '🌳', '📰', '🎖️', '📜', '🕊️', '🕯️', '📚', '🤝'];

  return (
    <section id="galerie" style={{ background: '#fff', padding: '80px 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{
          fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px',
          textTransform: 'uppercase', color: '#8b6f47',
          borderBottom: '1px solid #8b6f47', paddingBottom: '4px'
        }}>Photos</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c3e50', margin: '16px 0 12px' }}>
          Galerie
        </h2>
      </div>

      {/* GRILLE PRINCIPALE */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '32px', 
        maxWidth: '1100px', 
        margin: '0 auto',
        justifyContent: 'center'
      }}>
        {randomPhotos.length > 0 ? (
          randomPhotos.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedIndex(allPhotos.findIndex(item => item.id === p.id))}
              className="group"
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div style={{ 
                aspectRatio: '1/1', overflow: 'hidden', borderRadius: '4px', 
                border: '1px solid #ede5d4', position: 'relative' 
              }}>
                <img 
                  src={p.image_url} 
                  alt={p.titre} 
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }}
                  className="image-hover"
                />
              </div>
              <p className="titre-hover" style={{ 
                fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: '#8b6f47', 
                marginTop: '12px', fontStyle: 'italic', transition: '0.3s', opacity: 0 
              }}>
                {p.titre}
              </p>
            </div>
          ))
        ) : (
          /* EMOJIS SI VIDE */
          placeholders.map((emoji, i) => (
            <div key={i} style={{ 
              background: '#2c3e50', borderRadius: '6px', aspectRatio: '1/1', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' 
            }}>{emoji}</div>
          ))
        )}
      </div>

      {/* BOUTON VOIR PLUS */}
      {allPhotos.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <button 
            onClick={() => setIsOpen(true)}
            style={{
              background: 'none', border: '1px solid #8b6f47', color: '#8b6f47',
              padding: '14px 40px', fontFamily: 'Arial, sans-serif', fontSize: '0.75rem',
              textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s'
            }}
            className="btn-galerie"
          >
            Voir toute la galerie
          </button>
        </div>
      )}

      {/* LIGHTBOX (Plein écran) */}
      {selectedIndex !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.95)', zIndex: 10001, display: 'flex',
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)'
        }} onClick={() => setSelectedIndex(null)}>
          
          <button style={{ position: 'absolute', top: '30px', right: '30px', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={40} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + allPhotos.length) % allPhotos.length); }}
            style={{ position: 'absolute', left: '20px', color: '#fff', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}
          >
            <ChevronLeft size={40} />
          </button>

          <div style={{ maxWidth: '85%', maxHeight: '80%', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={allPhotos[selectedIndex].image_url} 
              alt={allPhotos[selectedIndex].titre}
              style={{ maxHeight: '75vh', maxWidth: '100%', borderRadius: '4px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }} 
            />
            <p style={{ color: '#f5f0e8', marginTop: '20px', fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontStyle: 'italic' }}>
              {allPhotos[selectedIndex].titre}
            </p>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % allPhotos.length); }}
            style={{ position: 'absolute', right: '20px', color: '#fff', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}

      {/* MODAL ARCHIVES COMPLETES */}
      {isOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: '#f5f0e8', zIndex: 9999, padding: '40px', overflowY: 'auto' 
        }}>
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ position: 'fixed', top: '20px', right: '20px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10000 }}
          >
            <X size={20} />
          </button>
          
          <div style={{ maxWidth: '1100px', margin: '60px auto 0' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#2c3e50', marginBottom: '50px', textAlign: 'center', fontStyle: 'italic' }}>
              Archives Photographiques
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {allPhotos.map((p, idx) => (
                <div key={p.id} onClick={() => { setSelectedIndex(idx); setIsOpen(false); }} style={{ cursor: 'pointer' }}>
                  <img src={p.image_url} alt={p.titre} style={{ width: '100%', borderRadius: '2px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.65rem', color: '#8b6f47', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                    {p.titre}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS POUR LES HOVERS SANS BIBLIOTHÈQUE EXTERNE */}
      <style jsx>{`
        .group:hover .image-hover { transform: scale(1.1); }
        .group:hover .titre-hover { opacity: 1 !important; }
        .btn-galerie:hover { background: #8b6f47 !important; color: #fff !important; }
      `}</style>
    </section>
  );
}