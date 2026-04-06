'use client'
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#ede5d4] p-10 text-center shadow-sm">
        <h1 className="font-serif text-2xl text-[#2c3e50] mb-2">Espace Administration</h1>
        <p className="text-[#6b6b6b] text-sm mb-8 font-serif italic">Réservé aux membres du bureau</p>
        
        <button 
          onClick={() => signIn('google', { callbackUrl: '/admin' })}
          className="flex items-center justify-center gap-3 w-full bg-[#2c3e50] text-[#f5f0e8] py-3 px-4 rounded-sm hover:bg-[#3d5166] transition-all uppercase tracking-widest text-[10px] font-bold"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
          Se connecter avec Google
        </button>
        
        <a href="/" className="block mt-8 text-[10px] uppercase tracking-[2px] text-[#8b6f47]">
          ← Retour au site
        </a>
      </div>
    </div>
  );
}