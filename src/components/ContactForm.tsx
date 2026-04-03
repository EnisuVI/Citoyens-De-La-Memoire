'use client'

export default function ContactForm() {
  return (
    <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" placeholder="Votre nom" style={{
        padding: '12px 16px', border: '1px solid #ede5d4', borderRadius: '4px',
        fontFamily: 'Arial, sans-serif', fontSize: '0.9rem', background: '#fff', outline: 'none'
      }} />
      <input type="email" placeholder="Votre e-mail" style={{
        padding: '12px 16px', border: '1px solid #ede5d4', borderRadius: '4px',
        fontFamily: 'Arial, sans-serif', fontSize: '0.9rem', background: '#fff', outline: 'none'
      }} />
      <textarea placeholder="Votre message…" rows={4} style={{
        padding: '12px 16px', border: '1px solid #ede5d4', borderRadius: '4px',
        fontFamily: 'Arial, sans-serif', fontSize: '0.9rem', background: '#fff',
        outline: 'none', resize: 'vertical'
      }} />
      <button type="submit" style={{
        background: '#2c3e50', color: '#f5f0e8', border: 'none',
        padding: '13px', borderRadius: '4px', fontFamily: 'Arial, sans-serif',
        fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer'
      }}>Envoyer le message</button>
    </form>
  )
}
