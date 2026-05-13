import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from "@/components/Providers" // On importe le nouveau fichier
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Les Citoyens de la Mémoire',
  description: 'Préserver et transmettre la mémoire collective',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {/* On enveloppe tout le contenu dans Providers */}
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}