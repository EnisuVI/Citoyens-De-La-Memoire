'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Identifiants provisoires — à remplacer par Supabase Auth plus tard
    if (email === 'admin@citoyensdelamemoire.fr' && password === 'MotDePasseProvisoire123') {
      document.cookie = 'admin_auth=true; path=/'
      router.push('/admin/dashboard')
    } else {
      setError('Identifiants incorrects.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#f5f0e8',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', padding: '48px', borderRadius: '8px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', background: '#2c3e50',
            borderRadius: '6px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px'
          }}>🕊</div>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', fontSize: '1.4rem', margin: '0 0 4px' }}>
            Administration
          </h1>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.8rem', color: '#6b6b6b', margin: 0 }}>
            Accès réservé aux membres du bureau
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#2c3e50', display: 'block', marginBottom: '6px' }}>
              Identifiant
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@citoyensdelamemoire.fr"
              style={{
                width: '100%', padding: '11px 14px', border: '1px solid #ede5d4',
                borderRadius: '4px', fontFamily: 'Arial, sans-serif', fontSize: '0.9rem',
                outline: 'none', boxSizing: 'border-box' as const
              }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#2c3e50', display: 'block', marginBottom: '6px' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '11px 14px', border: '1px solid #ede5d4',
                borderRadius: '4px', fontFamily: 'Arial, sans-serif', fontSize: '0.9rem',
                outline: 'none', boxSizing: 'border-box' as const
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontFamily: 'Arial, sans-serif', fontSize: '0.82rem', margin: 0 }}>
              {error}
            </p>
          )}

          <button type="submit" style={{
            background: '#2c3e50', color: '#f5f0e8', border: 'none',
            padding: '13px', borderRadius: '4px', fontFamily: 'Arial, sans-serif',
            fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer', marginTop: '4px'
          }}>
            Accéder au tableau de bord
          </button>
        </form>
      </div>
    </div>
  )
}
