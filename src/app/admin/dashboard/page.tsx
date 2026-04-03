'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      router.push('/admin')
    }
  }, [router])

  function logout() {
    sessionStorage.removeItem('admin_auth')
    router.push('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', padding: '48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', fontSize: '1.8rem', marginBottom: '4px' }}>
              Tableau de bord
            </h1>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.78rem', color: '#9b9b9b', letterSpacing: '1px' }}>
              LES CITOYENS DE LA MÉMOIRE
            </p>
          </div>
          <button onClick={logout} style={{
            background: 'none', border: '1px solid #ede5d4',
            padding: '8px 18px', borderRadius: '4px',
            fontFamily: 'Arial, sans-serif', fontSize: '0.78rem',
            color: '#6b6b6b', cursor: 'pointer', letterSpacing: '1px'
          }}>
            Déconnexion
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Événements',  icon: '📅', href: '/admin/evenements',  desc: 'Ajouter, modifier, supprimer' },
            { label: 'Galerie',     icon: '🖼️', href: '/admin/galerie',     desc: 'Gérer les photos' },
            { label: 'Actualités',  icon: '📰', href: '/admin/actualites',  desc: 'Lettres et publications' },
            { label: 'Messages',    icon: '✉️', href: '/admin/messages',    desc: 'Formulaire de contact' },
          ].map(c => (
            <Link key={c.href} href={c.href} style={{
              display: 'block', background: '#fff',
              borderRadius: '8px', padding: '28px 24px',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              border: '1px solid #ede5d4'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{c.icon}</div>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', fontSize: '1.1rem', marginBottom: '6px' }}>
                {c.label}
              </h2>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.78rem', color: '#9b9b9b' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
