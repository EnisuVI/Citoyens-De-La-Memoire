'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Détection de la taille d'écran pour le rendu propre
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const links = [
    ["L'ASSOCIATION", '#association'],
    ['NOS ACTIONS',    '#evenements'],
    ['MÉMOIRE(S)',    '#memoires'],
    ['GALERIE',       '#galerie'],
    ['CONTACT',       '#contact'],
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: 'rgba(245,240,232,0.97)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #ede5d4',
        zIndex: 1000, height: '64px',
        padding: isMobile ? '0 20px' : '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', background: '#2c3e50',
            borderRadius: '4px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#f5f0e8', fontSize: '18px'
          }}>🕊</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 'bold', color: '#2c3e50', lineHeight: 1.1 }}>
            Les Citoyens<br />de la Mémoire
          </div>
        </Link>

        {/* Menu Desktop - Visible uniquement si pas mobile */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} style={{ textDecoration: 'none', color: '#6b6b6b', fontFamily: 'Arial, sans-serif', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</a>
              </li>
            ))}
          </ul>
        )}

        {/* Bouton Hamburger - Visible uniquement si mobile */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="28" height="28" fill="none" stroke="#2c3e50" strokeWidth={2} viewBox="0 0 24 24">
              {open 
                ? <path d="M6 18L18 6M6 6l12 12" /> 
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        )}
      </nav>

      {/* Menu Mobile Dropdown */}
      <div style={{
        position: 'fixed', top: '64px', left: 0, right: 0,
        background: '#f5f0e8', zIndex: 999,
        maxHeight: open && isMobile ? '400px' : '0',
        overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
        borderBottom: open ? '1px solid #ede5d4' : 'none'
      }}>
        <ul style={{ listStyle: 'none', padding: '10px 0' }}>
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '15px 25px', textDecoration: 'none', 
                color: '#2c3e50', fontSize: '0.8rem', borderBottom: '1px solid #ede5d4'
              }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}