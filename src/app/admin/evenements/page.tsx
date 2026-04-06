"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Trash2, Pencil, Plus, Save, X, Calendar } from "lucide-react";

export default function AdminEvenements() {
  const [evenements, setEvenements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date_evenement: "",
    tag: "Commémoration",
    emoji: "🏛️"
  });

  useEffect(() => {
    fetchEvenements();
  }, []);

  async function fetchEvenements() {
    const { data } = await supabase
      .from("evenements")
      .select("*")
      .order("date_evenement", { ascending: false });
    if (data) setEvenements(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre || !formData.date_evenement) return alert("Veuillez remplir les champs obligatoires.");
    
    setLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase.from("evenements").update(formData).eq("id", editingId);
        if (error) throw error;
        alert("Événement mis à jour !");
        setEditingId(null);
      } else {
        const { error } = await supabase.from("evenements").insert([formData]);
        if (error) throw error;
        alert("Événement ajouté !");
      }
      setFormData({ titre: "", description: "", date_evenement: "", tag: "Commémoration", emoji: "🏛️" });
      fetchEvenements();
    } catch (error) {
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ev: any) => {
    setEditingId(ev.id);
    setFormData({
      titre: ev.titre,
      description: ev.description,
      date_evenement: ev.date_evenement,
      tag: ev.tag,
      emoji: ev.emoji
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        
        <div className="mb-12 text-center md:text-left">
          <Link href="/admin" className="text-[#8b6f47] text-[10px] uppercase tracking-[3px] hover:underline">
            ← Retour au tableau de bord
          </Link>
        </div>
        
        <h1 className="font-serif text-3xl text-[#2c3e50] mb-16 italic text-center">
          {editingId ? "Modification de l'événement" : "Gestion des Événements"}
        </h1>

        <div className="w-full flex justify-center mb-24">
          <div className="bg-white border border-[#ede5d4] p-10 shadow-sm w-full max-w-2xl">
            <h2 className="font-serif text-xl text-[#2c3e50] mb-8 text-center font-light">
              {editingId ? "Modifier les détails" : "Nouvel événement"}
            </h2>
            
            <div className="flex flex-col">
              
              {/* LIGNE TITRE & DATE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="border-b border-[#ede5d4] pb-2">
                  <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Titre</label>
                  <input 
                    type="text" 
                    value={formData.titre}
                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                    placeholder="Titre de l'action..."
                    className="w-full bg-transparent focus:outline-none italic text-sm text-[#2c3e50]"
                  />
                </div>
                <div className="border-b border-[#ede5d4] pb-2">
                  <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Date</label>
                  <input 
                    type="date" 
                    value={formData.date_evenement}
                    onChange={(e) => setFormData({...formData, date_evenement: e.target.value})}
                    className="w-full bg-transparent focus:outline-none text-sm text-[#2c3e50] cursor-pointer"
                  />
                </div>
              </div>

              {/* BLOC DESCRIPTION CORRIGÉ (Espace resserré) */}
              <div className="border-b border-[#ede5d4] pb-1 mb-6">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-0">Description</label>
                <textarea 
                  rows={1}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Détails..."
                  className="w-full bg-transparent focus:outline-none italic text-sm text-[#2c3e50] resize-none mt-[-4px]"
                />
              </div>

              {/* LIGNE TAG & EMOJI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="border-b border-[#ede5d4] pb-2">
                  <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Catégorie</label>
                  <select 
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                    className="w-full bg-transparent focus:outline-none text-sm text-[#2c3e50] appearance-none cursor-pointer"
                  >
                    <option>Commémoration</option>
                    <option>Exposition</option>
                    <option>Conférence</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="border-b border-[#ede5d4] pb-2">
                  <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Emoji / Icône</label>
                  <input 
                    type="text" 
                    value={formData.emoji}
                    onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                    placeholder="Ex: 🕯️"
                    className="w-full bg-transparent focus:outline-none text-sm text-[#2c3e50]"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleSubmit} 
                  disabled={loading} 
                  className="flex-1 py-4 bg-[#2c3e50] text-[#f5f0e8] text-[10px] uppercase tracking-[4px] hover:bg-[#3d5166] transition-all duration-300 flex justify-center items-center gap-3"
                >
                  {loading ? "Veuillez patienter..." : editingId ? <><Save size={14} /> Enregistrer</> : <><Plus size={14} /> Ajouter</>}
                </button>
                {editingId && (
                  <button 
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ titre: "", description: "", date_evenement: "", tag: "Commémoration", emoji: "🏛️" });
                    }}
                    className="px-6 py-4 border border-[#e74c3c] text-[#e74c3c] text-[10px] uppercase tracking-[4px] hover:bg-[#e74c3c] hover:text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LISTE DES ACTIONS EXISTANTES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full">
          {evenements.map((ev) => (
            <div key={ev.id} className="group flex flex-col items-center">
              <div className="relative w-full bg-white border border-[#ede5d4] p-8 transition-all duration-500 group-hover:shadow-md min-h-[200px] flex flex-col justify-center">
                <div className="text-3xl mb-4 text-center">{ev.emoji}</div>
                <h3 className="font-serif text-lg text-[#2c3e50] text-center mb-2">{ev.titre}</h3>
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8b6f47] uppercase tracking-widest mb-4">
                  <Calendar size={12} /> {ev.date_evenement}
                </div>
                <p className="text-[11px] text-[#6b6b6b] italic text-center line-clamp-2">{ev.description}</p>

                <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex gap-2">
                  <button onClick={() => handleEdit(ev)} className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full"><Pencil size={14} /></button>
                  <button onClick={async () => { if(confirm("Supprimer ?")) { await supabase.from("evenements").delete().eq("id", ev.id); fetchEvenements(); } }} className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full"><Trash2 size={14} /></button>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 text-center">
                   <span className="text-[8px] bg-[#f5f0e8] px-3 py-1 text-[#8b6f47] uppercase tracking-[2px]">{ev.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}