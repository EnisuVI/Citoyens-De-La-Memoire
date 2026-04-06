export default function Hero() {
  return (
    <section className="relative h-screen bg-[#2c3e50] flex flex-col items-center justify-center overflow-hidden">
      {/* Grille subtile en arrière-plan */}
      <div className="absolute inset-0 opacity-20" 
           style={{backgroundImage: 'linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px'}}>
      </div>
      
      <div className="relative text-center px-6 max-w-4xl z-10">
        <div className="inline-block border border-[#8b6f47]/40 bg-[#8b6f47]/20 text-[#8b6f47] text-[10px] tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-8">
          Fondée en juin 2024 · Fouquières-lez-Béthune
        </div>
        
        <h1 className="text-4xl md:text-6xl text-[#f5f0e8] font-serif leading-tight mb-4">
          Les Citoyens <br /> de la <span className="text-[#8b6f47]">Mémoire</span>
        </h1>
        
        <p className="text-[12px] tracking-[3px] uppercase text-[#f5f0e8]/40 mb-8 font-light">
          Association Loi 1901
        </p>
        
        <p className="text-[#f5f0e8]/70 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
          Transmettre le devoir de mémoire aux générations futures et faire connaître l'histoire locale de Fouquières-lez-Béthune.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#association" className="bg-[#8b6f47] text-[#f5f0e8] px-8 py-3 rounded-sm hover:bg-[#6b5337] transition-all text-sm uppercase tracking-wider">
            Découvrir l'association
          </a>
          <a href="#evenements" className="border border-[#f5f0e8]/20 text-[#f5f0e8]/80 px-8 py-3 rounded-sm hover:border-[#f5f0e8]/60 transition-all text-sm uppercase tracking-wider">
            Nos actions
          </a>
        </div>
      </div>
    </section>
  );
}