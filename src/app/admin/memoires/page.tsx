"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Trash2, FileText, Upload, Calendar, Edit2, Check, X, ArrowLeft } from "lucide-react";

export default function ManageMemoires() {
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [titre, setTitre] = useState("");
  const [datePub, setDatePub] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  
  // États pour l'édition
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitre, setEditTitre] = useState("");
  const [editDate, setEditDate] = useState("");

  const fetchDocs = async () => {
    // On trie par date de publication (le plus récent en haut)
    const { data } = await supabase
      .from("memoires")
      .select("*")
      .order("date_publication", { ascending: false });
    if (data) setBulletins(data);
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleUpload = async () => {
    if (!file || !titre || !datePub) {
      return alert("Veuillez remplir tous les champs (Titre, Date et Fichier).");
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      
      // 1. Upload Storage
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. URL Publique
      const { data: { publicUrl } } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

      // 3. Insertion Base avec date_publication
      const { error: dbError } = await supabase
        .from("memoires")
        .insert([{ 
          titre, 
          pdf_url: publicUrl, 
          date_publication: datePub 
        }]);

      if (dbError) throw dbError;

      alert("Le bulletin a été publié avec succès.");
      setTitre("");
      setDatePub("");
      setFile(null);
      setFileInputKey(Date.now());
      fetchDocs();
    } catch (error: any) {
      alert("Une erreur est survenue lors de l'envoi : " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const { error } = await supabase
        .from("memoires")
        .update({ 
          titre: editTitre, 
          date_publication: editDate 
        })
        .eq("id", id);

      if (error) throw error;
      setEditingId(null);
      fetchDocs();
    } catch (error) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const deleteBulletin = async (id: number, pdfUrl: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce bulletin ?")) return;
    
    try {
      const urlParts = pdfUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from("documents").remove([fileName]);
      const { error } = await supabase.from("memoires").delete().eq("id", id);
      
      if (error) throw error;
      fetchDocs();
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-16 px-4 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex flex-col">
        
        {/* RETOUR */}
        <div className="mb-12">
          <Link href="/admin" className="flex items-center gap-2 text-[#8b6f47] text-[10px] uppercase tracking-[3px] font-bold hover:gap-4 transition-all">
            <ArrowLeft size={14} /> Retour au tableau de bord
          </Link>
        </div>
        
        <h1 className="font-serif text-4xl text-[#2c3e50] mb-16 italic text-center">Gestion MéMoire(S)</h1>

        {/* FORMULAIRE D'AJOUT */}
        <div className="w-full flex justify-center mb-24">
          <div className="bg-white border border-[#ede5d4] p-10 shadow-sm w-full max-w-md">
            <h2 className="font-serif text-xl text-[#2c3e50] mb-8 text-center font-light italic text-[22px]">Nouveau Bulletin</h2>
            <div className="space-y-8">
              
              <div className="border-b border-[#ede5d4] pb-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Titre du numéro</label>
                <input 
                  type="text" 
                  value={titre} 
                  onChange={(e) => setTitre(e.target.value)} 
                  placeholder="Ex: Numéro 4 - Printemps 2024" 
                  className="w-full bg-transparent focus:outline-none italic text-sm text-[#2c3e50]"
                />
              </div>

              <div className="border-b border-[#ede5d4] pb-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Date de publication</label>
                <input 
                  type="date" 
                  value={datePub} 
                  onChange={(e) => setDatePub(e.target.value)} 
                  className="w-full bg-transparent focus:outline-none text-sm text-[#2c3e50] cursor-pointer"
                />
              </div>
              
              <div className="py-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-3">Fichier PDF</label>
                <input 
                  key={fileInputKey}
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  className="text-[11px] text-[#6b6b6b] cursor-pointer w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:bg-[#f5f0e8] file:text-[#8b6f47] file:font-bold hover:file:bg-[#ede5d4]"
                />
              </div>

              <button 
                onClick={handleUpload} 
                disabled={uploading} 
                className="w-full py-4 bg-[#2c3e50] text-[#f5f0e8] text-[10px] uppercase tracking-[4px] font-bold hover:bg-[#3d5166] transition-all duration-300 flex justify-center items-center gap-3 shadow-md"
              >
                {uploading ? "Veuillez patienter..." : <><Upload size={14} /> Publier le bulletin</>}
              </button>
            </div>
          </div>
        </div>

        {/* LISTE DES BULLETINS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
          {bulletins.map((b) => (
            <div key={b.id} className="group flex flex-col items-center">
              <div className="relative h-96 w-full overflow-hidden border border-[#ede5d4] bg-white transition-all duration-500 hover:shadow-xl flex flex-col items-center justify-center p-8">
                
                <FileText size={80} strokeWidth={0.5} className="text-[#2c3e50] mb-6 transition-transform duration-700 group-hover:scale-110" />
                
                {editingId === b.id ? (
                  <div className="w-full space-y-4 px-2">
                    <input 
                      type="text" 
                      value={editTitre || ""} 
                      onChange={(e) => setEditTitre(e.target.value)} 
                      className="w-full border-b border-[#8b6f47] bg-transparent text-[11px] uppercase text-center focus:outline-none italic" 
                    />
                    <input 
                      type="date" 
                      value={editDate || ""} 
                      onChange={(e) => setEditDate(e.target.value)} 
                      className="w-full border-b border-[#8b6f47] bg-transparent text-[11px] uppercase text-center focus:outline-none" 
                    />
                    <div className="flex justify-center gap-6 mt-4">
                      <button onClick={() => handleUpdate(b.id)} className="text-green-700 hover:scale-125 transition-transform"><Check size={20}/></button>
                      <button onClick={() => setEditingId(null)} className="text-red-700 hover:scale-125 transition-transform"><X size={20}/></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] text-[#8b6f47] uppercase tracking-widest mb-2 flex items-center gap-2 font-bold">
                      <Calendar size={12} /> 
                      {b.date_publication 
                        ? new Date(b.date_publication).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                        : "Date non définie"}
                    </div>
                    
                    <p className="mt-2 mb-8 text-[11px] uppercase tracking-[2px] text-[#2c3e50] italic text-center px-2 font-medium leading-relaxed">
                      {b.titre}
                    </p>
                    
                    <a 
                      href={b.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] uppercase tracking-widest text-[#8b6f47] border border-[#8b6f47] px-6 py-2.5 hover:bg-[#8b6f47] hover:text-white transition-all duration-300 font-bold"
                    >
                      Visualiser le PDF
                    </a>
                  </>
                )}

                {/* BOUTONS ACTIONS */}
                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button 
                    onClick={() => {
                      setEditingId(b.id);
                      setEditTitre(b.titre);
                      setEditDate(b.date_publication);
                    }}
                    className="w-9 h-9 flex items-center justify-center bg-[#8b6f47] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => deleteBulletin(b.id, b.pdf_url)}
                    className="w-9 h-9 flex items-center justify-center bg-red-800 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}