export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #2c3e50 0%, #3d5166 50%, #2c3e50 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
      paddingTop: '64px',  // ← ICI
      overflow: 'hidden'
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139,111,71,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,111,71,0.1) 0%, transparent 40%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '680px', margin: '0 auto' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(139,111,71,0.2)',
          border: '1px solid rgba(139,111,71,0.4)',
          color: '#c4a882',
          fontFamily: 'Arial, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          padding: '6px 18px',
          borderRadius: '20px',
          marginBottom: '28px'
        }}>
          Fondée en juin 2024 · Fouquières-lez-Béthune
        </div>

        {/* Titre */}
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          fontWeight: 'bold',
          color: '#f5f0e8',
          lineHeight: 1.1,
          marginBottom: '20px'
        }}>
          Les Citoyens<br />de la <span style={{ color: '#8b6f47' }}>Mémoire</span>
        </h1>

        {/* Sous-titre */}
        <p style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          color: 'rgba(245,240,232,0.45)',
          marginBottom: '24px'
        }}>
          Association Loi 1901
        </p>

        {/* Description */}
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.05rem',
          color: 'rgba(245,240,232,0.75)',
          lineHeight: 1.7,
          maxWidth: '520px',
          margin: '0 auto 40px'
        }}>
          Transmettre le devoir de mémoire aux générations futures et faire connaître l'histoire locale de Fouquières-lez-Béthune.
        </p>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="#association" style={{
            background: '#8b6f47', color: '#f5f0e8',
            padding: '14px 32px', borderRadius: '4px',
            fontFamily: 'Arial, sans-serif', fontSize: '0.85rem',
            letterSpacing: '1px', textDecoration: 'none',
            textTransform: 'uppercase' as const
          }}>
            Découvrir l'association
          </a>
          <a href="#evenements" style={{
            background: 'transparent', color: '#f5f0e8',
            border: '1px solid rgba(245,240,232,0.4)',
            padding: '14px 32px', borderRadius: '4px',
            fontFamily: 'Arial, sans-serif', fontSize: '0.85rem',
            letterSpacing: '1px', textDecoration: 'none',
            textTransform: 'uppercase' as const
          }}>
            Nos actions
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#stats" style={{
        position: 'absolute', bottom: '36px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '6px', textDecoration: 'none',
        color: 'rgba(245,240,232,0.35)',
        fontFamily: 'Arial, sans-serif', fontSize: '0.65rem',
        letterSpacing: '2px', textTransform: 'uppercase' as const
      }}>
        <span>Défiler</span>
        <span>↓</span>
      </a>
    </section>
  )
}
