"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminGalerie() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<any[]>([]);
  // État pour forcer la réinitialisation de l'input file
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('galerie_photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPhotos(data);
    } catch (e) {
      console.error("Erreur de chargement");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async () => {
    if (!file || !title) {
      return alert("Veuillez remplir tous les champs avant de publier.");
    }
    
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      
      // 1. Upload Storage
      const { error: uploadError } = await supabase.storage
        .from('galerie')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. URL Publique
      const { data: { publicUrl } } = supabase.storage
        .from('galerie')
        .getPublicUrl(fileName);

      // 3. Insertion Base
      const { error: dbError } = await supabase
        .from('galerie_photos')
        .insert([{ titre: title, image_url: publicUrl }]);

      if (dbError) throw dbError;

      alert("La photo a été ajoutée avec succès.");
      
      // Reset du formulaire
      setTitle("");
      setFile(null);
      setFileInputKey(Date.now()); // Ceci efface le nom du fichier à côté du bouton
      fetchPhotos();
    } catch (error) {
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setUploading(false);
    }
  };

const deletePhoto = async (id: number, imageUrl: string) => {
  if (!confirm("Voulez-vous vraiment supprimer cette photo ?")) return;

  try {
    const decodedUrl = decodeURI(imageUrl);
    const parts = decodedUrl.split('/galerie/');
    const fileName = parts[1]?.split('?')[0];
    console.log("URL originale:", imageUrl);
    console.log("Fichier extrait:", fileName);


    // Suppression Storage
    if (fileName) {
      const { error: storageError } = await supabase.storage.from('galerie').remove([fileName]);
      if (storageError) console.error("Storage error:", storageError);
    }

    // Suppression SQL — avec log explicite
    const { data, error } = await supabase
      .from('galerie_photos')
      .delete()
      .eq('id', id)
      .select(); // ← IMPORTANT : force Supabase à retourner ce qui a été supprimé

    console.log("Résultat delete:", data, error);

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Aucune ligne supprimée — vérifiez les policies RLS");
    }

    setPhotos(prev => prev.filter(p => p.id !== id));

  } catch (error: any) {
    alert("Erreur : " + error.message);
  }
};

  const editPhoto = async (id: number) => {
    const newTitle = prompt("Veuillez saisir le nouveau titre de l'image :");
    if (newTitle && newTitle.trim() !== "") {
      const { error } = await supabase
        .from('galerie_photos')
        .update({ titre: newTitle })
        .eq('id', id);
      
      if (!error) fetchPhotos();
      else alert("Une erreur est survenue lors de la modification.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        
        <div className="mb-12 text-center md:text-left">
          <Link href="/admin" className="text-[#8b6f47] text-[10px] uppercase tracking-[3px] hover:underline">
            ← Retour au tableau de bord
          </Link>
        </div>
        
        <h1 className="font-serif text-3xl text-[#2c3e50] mb-16 italic text-center">Gestion de la Galerie</h1>

        <div className="w-full flex justify-center mb-24">
          <div className="bg-white border border-[#ede5d4] p-10 shadow-sm w-full max-w-md">
            <h2 className="font-serif text-xl text-[#2c3e50] mb-8 text-center font-light">Nouvelle photo</h2>
            <div className="space-y-8">
              <div className="border-b border-[#ede5d4] pb-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-1">Titre de l'image</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Saisissez un titre..." 
                  className="w-full bg-transparent focus:outline-none italic text-sm text-[#2c3e50]"
                />
              </div>
              
              <div className="py-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-[#8b6f47] mb-3">Fichier</label>
                <input 
                  key={fileInputKey} // Force le reset de l'input après upload
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  className="text-[11px] text-[#6b6b6b] cursor-pointer w-full"
                />
              </div>

              <button 
                onClick={handleUpload} 
                disabled={uploading} 
                className="w-full py-4 bg-[#2c3e50] text-[#f5f0e8] text-[10px] uppercase tracking-[4px] hover:bg-[#3d5166] transition-all duration-300"
              >
                {uploading ? "Veuillez patienter..." : "Publier la photo"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
          {photos.map((p) => (
            <div key={p.id} className="group flex flex-col items-center">
              <div className="relative h-64 w-full overflow-hidden border border-[#ede5d4] bg-white transition-all duration-500 group-hover:shadow-md">
                <img 
                  src={p.image_url} 
                  alt={p.titre} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex gap-2">
                  <button 
                    onClick={() => editPhoto(p.id)}
                    className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={() => deletePhoto(p.id, p.image_url)}
                    className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <p className="mt-4 text-[10px] uppercase tracking-widest text-[#8b6f47] italic text-center px-2">
                {p.titre}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}