import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Colonne 1 - Présentation */}
        <div>
          <h3 className="text-white font-serif text-lg font-bold mb-4">
            Citoyens de la Mémoire
          </h3>
          <p className="text-sm leading-relaxed">
            Association dédiée à la préservation et à la transmission de la mémoire collective française.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="#accueil" className="hover:text-white transition">Accueil</Link></li>
            <li><Link href="#apropos" className="hover:text-white transition">L'association</Link></li>
            <li><Link href="#evenements" className="hover:text-white transition">Événements</Link></li>
            <li><Link href="#galerie" className="hover:text-white transition">Galerie</Link></li>
            <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 - Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Contact
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>contact@citoyensdelamemoire.fr</li>
            <li>01 23 45 67 89</li>
            <li>Paris, France</li>
          </ul>
        </div>

      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/30">
        © 2024 Citoyens de la Mémoire — Tous droits réservés
      </div>
    </footer>
  )
}
