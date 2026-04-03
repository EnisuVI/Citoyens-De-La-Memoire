import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* STATS */}
        <div style={{
          background: '#3d5166', padding: '48px',
          display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap'
        }}>
          {[
            { number: '2024', label: 'Année de création' },
            { number: '4',    label: 'Résistants honorés' },
            { number: '80',   label: 'Ans de la Libération' },
            { number: '500',  label: 'Exemplaires MéMoire(S)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#8b6f47', fontFamily: 'Georgia, serif' }}>
                {s.number}
              </div>
              <div style={{
                fontFamily: 'Arial, sans-serif', fontSize: '0.7rem',
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                color: 'rgba(245,240,232,0.5)', marginTop: '6px'
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ASSOCIATION */}
        <section id="association" style={{ background: '#fff', padding: '80px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{
              fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase' as const, color: '#8b6f47',
              borderBottom: '1px solid #8b6f47', paddingBottom: '4px'
            }}>Qui sommes-nous</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c3e50', margin: '16px 0 12px' }}>
              L'association
            </h2>
            <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', maxWidth: '520px', margin: '0 auto' }}>
              Créée en juin 2024, notre mission est de préserver et transmettre la mémoire historique locale.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '1000px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#2c3e50', marginBottom: '16px' }}>Notre mission</h3>
              <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', marginBottom: '14px', lineHeight: 1.7 }}>
                Les Citoyens de la Mémoire est une association loi 1901 fondée à Fouquières-lez-Béthune,
                œuvrant pour transmettre le nécessaire devoir de mémoire aux générations futures.
              </p>
              <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', marginBottom: '14px', lineHeight: 1.7 }}>
                Notre première exposition, labellisée nationalement sur les 80 ans de la Libération,
                a mis à l'honneur quatre résistants Fouquièrois : Ovide Miont, Joseph Hauguet, Willi Wehrle et Constant Bouxin.
              </p>
              <p style={{ color: '#6b6b6b', fontFamily: 'Georgia, serif', lineHeight: 1.7 }}>
                Présidée par <strong style={{ color: '#2c3e50' }}>Arnaud Willay</strong>, l'association publie également <em>MéMoire(S)</em>, sa lettre historique trimestrielle.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#2c3e50', marginBottom: '24px' }}>Nos valeurs</h3>
              {[
                { icon: '🕯️', title: 'Mémoire',      desc: 'Préserver le souvenir de ceux qui ont sacrifié leur vie pour notre liberté.' },
                { icon: '📚', title: 'Transmission', desc: "Éduquer les jeunes générations à l'histoire locale et nationale." },
                { icon: '🤝', title: 'Citoyenneté',  desc: 'Rassembler la communauté autour de valeurs républicaines.' },
              ].map(v => (
                <div key={v.title} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '44px', height: '44px', background: '#f5f0e8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{v.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', color: '#2c3e50', marginBottom: '4px' }}>{v.title}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: '#6b6b6b', lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÉVÉNEMENTS */}
        <section id="evenements" style={{ background: '#f5f0e8', padding: '80px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{
              fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase' as const, color: '#8b6f47',
              borderBottom: '1px solid #8b6f47', paddingBottom: '4px'
            }}>Ce que nous faisons</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c3e50', margin: '16px 0 12px' }}>
              Nos actions
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { emoji: '🏛️', date: 'Automne 2024', tag: 'Exposition · National',
                title: '80 ans de la Libération',
                desc: "Exposition labellisée nationalement mettant à l'honneur quatre résistants Fouquièrois : Ovide Miont, Joseph Hauguet, Willi Wehrle et Constant Bouxin." },
              { emoji: '🌳', date: '5 mai 2024', tag: 'Inauguration · Hommage',
                title: 'Parc Willi Wehrle (1915–1945)',
                desc: 'Inauguration d\'un parc en hommage à Willi Wehrle, résistant arrêté comme "anti nazi" le 2 mai 1935, déporté et condamné à mort.' },
              { emoji: '📰', date: 'Septembre 2025', tag: 'Publication · N°1',
                title: 'MéMoire(S) — La lettre historique',
                desc: 'Premier numéro de la lettre historique trimestrielle. Tirage : 500 exemplaires.' },
            ].map(ev => (
              <div key={ev.title} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ background: '#2c3e50', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                  {ev.emoji}
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#8b6f47', color: '#fff', borderRadius: '4px', padding: '3px 10px', fontFamily: 'Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '1px' }}>{ev.date}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#8b6f47', marginBottom: '8px' }}>{ev.tag}</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', fontSize: '1rem', marginBottom: '10px' }}>{ev.title}</h3>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.82rem', color: '#6b6b6b', lineHeight: 1.6 }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIE */}
        <section id="galerie" style={{ background: '#fff', padding: '80px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{
              fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase' as const, color: '#8b6f47',
              borderBottom: '1px solid #8b6f47', paddingBottom: '4px'
            }}>Photos</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c3e50', margin: '16px 0 12px' }}>
              Galerie
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
            {['🏛️', '🌳', '📰', '🎖️', '📜', '🕊️'].map((emoji, i) => (
              <div key={i} style={{
                background: '#2c3e50', borderRadius: '6px', aspectRatio: '4/3',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem'
              }}>{emoji}</div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ background: '#f5f0e8', padding: '80px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{
              fontFamily: 'Arial, sans-serif', fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase' as const, color: '#8b6f47',
              borderBottom: '1px solid #8b6f47', paddingBottom: '4px'
            }}>Nous écrire</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c3e50', margin: '16px 0 12px' }}>
              Contact
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '900px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2c3e50', marginBottom: '20px' }}>Coordonnées</h3>
              {[
                { icon: '📍', label: 'Adresse',   value: '137 rue Ovide Miont\n62322 Fouquières-lez-Béthune' },
                { icon: '👤', label: 'Président', value: 'Arnaud Willay' },
                { icon: '📅', label: 'Fondée en', value: 'Juin 2024' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#2c3e50', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <strong style={{ display: 'block', fontFamily: 'Arial, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#2c3e50', marginBottom: '2px' }}>{c.label}</strong>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: '#6b6b6b', whiteSpace: 'pre-line' }}>{c.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

import ContactForm from '@/components/ContactForm'
