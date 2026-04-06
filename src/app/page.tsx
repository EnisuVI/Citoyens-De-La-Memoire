"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import GalerieSection from '@/components/GalerieSection'
import MembresSection from '@/components/MembresSection' // Ajoute cette ligne
import DynamicTitle from '../components/DynamicTitle'
import { 
  FileText, 
  ExternalLink, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  User, 
  ArrowUp, 
  Archive 
} from "lucide-react";

export default function Home() {
  const [evenements, setEvenements] = useState<any[]>([]);
  const [allMemoires, setAllMemoires] = useState<any[]>([]);
  const [showArchives, setShowArchives] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    // Mise à jour du titre de l'onglet navigateur
    document.title = "Mémoires - Les citoyens de la mémoire";

    async function fetchData() {
      const { data: evData } = await supabase
        .from("evenements")
        .select("*")
        .order("date_evenement", { ascending: false });
      if (evData) setEvenements(evData);

      const { data: memData } = await supabase
        .from("memoires")
        .select("*")
        .order("date_publication", { ascending: false });
      if (memData) setAllMemoires(memData);
    }
    fetchData();

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dernierMemoire = allMemoires[0];
  const archivesMemoires = allMemoires.slice(1);

  return (
    <main style={{ position: 'relative' }}>
      <DynamicTitle />
      <Hero />

      {/* BOUTON REMONTER EN HAUT */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed', bottom: '30px', right: '30px', width: '50px', height: '50px',
            backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000, transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8b6f47'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* SECTION STATISTIQUES */}
      <div style={{ background: '#3d5166', padding: '48px', display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
        {[
          { number: '2024', label: 'Année de création' },
          { number: '4',    label: 'Résistants honorés' },
          { number: '80',   label: 'Ans de la Libération' },
          { number: '500',  label: 'Exemplaires MéMoire(S)' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#8b6f47', fontFamily: 'Georgia, serif' }}>{s.number}</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* SECTION ASSOCIATION */}
      <section id="association" style={{ background: '#fff', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6f47', borderBottom: '1px solid #8b6f47', paddingBottom: '4px' }}>Qui sommes-nous</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#2c3e50', margin: '16px 0 12px' }}>L'association</h2>
          <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', maxWidth: '520px', margin: '0 auto' }}>Créée en juin 2024, notre mission est de préserver et transmettre la mémoire historique locale.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#2c3e50', marginBottom: '16px' }}>Notre mission</h3>
            <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', marginBottom: '14px', lineHeight: 1.7 }}>Les Citoyens de la Mémoire est une association loi 1901 fondée à Fouquières-lez-Béthune, œuvrant pour transmettre le nécessaire devoir de mémoire.</p>
            <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', lineHeight: 1.7 }}>Présidée par <strong style={{ color: '#2c3e50' }}>Arnaud Willay</strong>, l'association publie également <em>MéMoire(S)</em>.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#2c3e50', marginBottom: '24px' }}>Nos valeurs</h3>
            {[
              { icon: '🕯️', title: 'Mémoire', desc: 'Préserver le souvenir de ceux qui ont sacrifié leur vie.' },
              { icon: '📚', title: 'Transmission', desc: "Éduquer les jeunes générations à l'histoire locale." },
            ].map(v => (
              <div key={v.title} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '44px', height: '44px', background: '#f5f0e8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{v.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', color: '#2c3e50' }}>{v.title}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: '#6b6b6b' }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION ÉVÉNEMENTS */}
      <section id="evenements" style={{ background: '#fcfaf7', padding: '80px 48px', borderTop: '1px solid #eee' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6f47' }}>Agenda</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#2c3e50', marginTop: '10px' }}>Nos actions</h2>
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {evenements.length > 0 ? evenements.map((ev) => (
            <div key={ev.id} style={{ background: '#fff', padding: '24px', borderRadius: '4px', display: 'flex', gap: '24px', alignItems: 'stretch', minHeight: '150px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
              <div style={{ background: '#2c3e50', color: '#fff', padding: '15px 10px', borderRadius: '4px', textAlign: 'center', width: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{ev.emoji || '🏛️'}</div>
                <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, lineHeight: 1.3, fontWeight: 'bold' }}>{ev.tag}</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#8b6f47', fontWeight: 'bold', textTransform: 'uppercase' }}>{ev.tag}</span>
                  <span style={{ color: '#ccc' }}>•</span>
                  <span style={{ fontSize: '0.85rem', color: '#6b6b6b' }}>{new Date(ev.date_evenement).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#2c3e50', margin: 0 }}>{ev.titre}</h3>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: '#6b6b6b', lineHeight: 1.5, marginTop: '8px' }}>{ev.description}</p>
              </div>
            </div>
          )) : (
            <p style={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>Aucun événement prévu pour le moment.</p>
          )}
        </div>
      </section>
    <MembresSection />
      {/* SECTION MÉMOIRE(S) */}
      <section id="memoires" style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6f47' }}>Publication</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', color: '#2c3e50', marginTop: '10px' }}>MéMoire(S)</h2>
          </div>

          {dernierMemoire ? (
            <>
              {/* DERNIER NUMÉRO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '300px', height: '400px', background: '#fcfaf7', border: '1px solid #e0dcd5',
                    boxShadow: '15px 15px 0px #8b6f47', padding: '35px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '8rem', opacity: 0.03, pointerEvents: 'none' }}>🗞️</div>
                    <div style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '10px' }}>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.7rem', fontWeight: 'bold', color: '#8b6f47' }}>BULLETIN TRIMESTRIEL</div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#2c3e50', marginTop: '5px' }}>MéMoire(S)</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={110} color="#2c3e50" strokeWidth={0.5} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 'bold' }}>{dernierMemoire.titre}</div>
                       <div style={{ fontSize: '0.65rem', color: '#999', marginTop: '4px' }}>
                          {new Date(dernierMemoire.date_publication).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                       </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', color: '#2c3e50', marginBottom: '20px' }}>Dernière édition</h3>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#6b6b6b', lineHeight: 1.8, marginBottom: '30px', fontSize: '1.1rem' }}>
                    Retrouvez notre lettre historique trimestrielle. Chaque numéro approfondit un pan de l'histoire locale et rend hommage à nos résistants.
                  </p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <a href={dernierMemoire.pdf_url} target="_blank" rel="noopener noreferrer" 
                       style={{ background: '#2c3e50', color: '#fff', padding: '14px 28px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      LIRE EN LIGNE <ExternalLink size={16} />
                    </a>
                    <a href={dernierMemoire.pdf_url} download
                       style={{ border: '2px solid #2c3e50', color: '#2c3e50', padding: '12px 28px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Download size={16} /> PDF
                    </a>
                  </div>
                </div>
              </div>

              {/* SECTION ARCHIVES */}
              {archivesMemoires.length > 0 && (
                <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button 
                    onClick={() => setShowArchives(!showArchives)}
                    style={{
                      background: 'none', border: 'none', color: '#8b6f47', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px',
                      fontFamily: 'Arial, sans-serif', fontSize: '0.75rem', fontWeight: 'bold',
                      textTransform: 'uppercase', letterSpacing: '3px', transition: 'all 0.3s ease'
                    }}
                  >
                    <Archive size={18} />
                    {showArchives ? "Masquer les archives" : "Consulter les numéros précédents"}
                    {showArchives ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {showArchives && (
                    <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '24px', width: '100%', marginTop: '50px'
                    }}>
                      {archivesMemoires.map((mem) => (
                        <div 
                           key={mem.id}
                           onMouseEnter={() => setHoveredId(mem.id)}
                           onMouseLeave={() => setHoveredId(null)}
                           style={{ 
                             background: hoveredId === mem.id ? '#f2eadf' : '#fcfaf7', 
                             border: '1px solid #ede5d4', 
                             padding: '24px', 
                             display: 'flex', 
                             alignItems: 'center',
                             justifyContent: 'space-between',
                             transition: 'all 0.4s ease',
                             cursor: 'default',
                             position: 'relative'
                           }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <FileText size={32} color="#8b6f47" strokeWidth={1} />
                            <div style={{ textAlign: 'left' }}>
                              <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: '#2c3e50', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {mem.titre}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '2px' }}>
                                {new Date(mem.date_publication).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          
                          {/* BOUTONS ACTIONS APPARAISSANT AU HOVER */}
                          <div style={{ 
                            display: 'flex', 
                            gap: '16px', 
                            opacity: hoveredId === mem.id ? 1 : 0,
                            transform: hoveredId === mem.id ? 'translateX(0)' : 'translateX(10px)',
                            transition: 'all 0.3s ease'
                          }}>
                            <a href={mem.pdf_url} target="_blank" rel="noopener noreferrer" title="Lire en ligne"
                               style={{ color: '#2c3e50', background: 'rgba(44,62,80,0.05)', padding: '8px', borderRadius: '4px', transition: 'all 0.2s' }}
                               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(44,62,80,0.15)'}
                               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(44,62,80,0.05)'}>
                              <ExternalLink size={18} />
                            </a>
                            <a href={mem.pdf_url} download title="Télécharger"
                               style={{ color: '#2c3e50', background: 'rgba(44,62,80,0.05)', padding: '8px', borderRadius: '4px', transition: 'all 0.2s' }}
                               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(44,62,80,0.15)'}
                               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(44,62,80,0.05)'}>
                              <Download size={18} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#999' }}>Le bulletin arrive bientôt...</p>
          )}
        </div>
      </section>

      <section id="galerie">
        <GalerieSection />
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" style={{ background: '#f5f0e8', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6f47', borderBottom: '1px solid #8b6f47', paddingBottom: '4px' }}>Nous écrire</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#2c3e50', margin: '16px 0 12px' }}>Contact</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '900px', margin: '0 auto' }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2c3e50', marginBottom: '20px' }}>Coordonnées</h3>
            {[
              { icon: <MapPin size={18} />, label: 'Adresse',   value: '137 rue Ovide Miont\n62322 Fouquières-lez-Béthune' },
              { icon: <User size={18} />, label: 'Président', value: 'Arnaud Willay' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                <div style={{ width: '36px', height: '36px', background: '#2c3e50', color: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#2c3e50' }}>{c.label}</strong>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: '#6b6b6b', whiteSpace: 'pre-line' }}>{c.value}</span>
                </div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}