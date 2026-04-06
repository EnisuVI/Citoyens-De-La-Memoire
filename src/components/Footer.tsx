import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2c3e50' }} className="text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Colonne 1 - Présentation */}
        <div>
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-lg font-bold mb-4">
            Les Citoyens de la Mémoire
          </h3>
          <p className="text-sm leading-relaxed font-serif">
            Association dédiée à la préservation et à la transmission de la mémoire historique de Fouquières-lez-Béthune.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-sans">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
            <li><Link href="#association" className="hover:text-white transition">L'association</Link></li>
            <li><Link href="#evenements" className="hover:text-white transition">Nos Actions</Link></li>
            <li><Link href="#memoires" className="hover:text-white transition">MéMoire(S)</Link></li>
            <li><Link href="#galerie" className="hover:text-white transition">Galerie</Link></li>
            <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 - Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-sans">
            Contact
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>137 rue Ovide Miont</li>
            <li>62322 Fouquières-lez-Béthune</li>
            <li className="mt-4">
              <a 
                href="mailto:citoyensdelamemoire@gmail.com" 
                className="text-white hover:text-[#8b6f47] transition flex items-center gap-2"
              >
                citoyensdelamemoire@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10 text-center py-6 text-xs text-white/30 uppercase tracking-[3px]">
        © 2026 Les Citoyens de la Mémoire — Tous droits réservés
      </div>
    </footer>
  )
}