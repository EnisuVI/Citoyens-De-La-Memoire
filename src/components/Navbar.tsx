'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    ["L'ASSOCIATION", '#association'],
    ['ÉVÉNEMENTS',    '#evenements'],
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
        padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px', height: '40px', background: '#2c3e50',
            borderRadius: '4px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#f5f0e8', fontSize: '20px'
          }}>🕊</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 'bold', color: '#2c3e50', lineHeight: 1.2 }}>
            Les Citoyens<br />de la Mémoire
          </div>
        </Link>

        {/* Desktop */}
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', alignItems: 'center' }}
            className="hidden md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} style={{
                textDecoration: 'none', color: '#6b6b6b',
                fontFamily: 'Arial, sans-serif', fontSize: '0.78rem',
                letterSpacing: '1.5px', textTransform: 'uppercase' as const
              }}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="24" height="24" fill="none" stroke="#2c3e50" strokeWidth={2} viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden" style={{
        position: 'fixed', top: '64px', left: 0, right: 0,
        background: 'rgba(245,240,232,0.98)',
        borderBottom: '1px solid #ede5d4',
        zIndex: 999,
        maxHeight: open ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease'
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '13px 32px',
                textDecoration: 'none', color: '#6b6b6b',
                fontFamily: 'Arial, sans-serif', fontSize: '0.85rem',
                letterSpacing: '1.5px', textTransform: 'uppercase' as const,
                borderBottom: '1px solid #ede5d4'
              }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ height: '64px' }} />
    </>
  )
}
