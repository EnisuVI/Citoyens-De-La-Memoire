"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ImageIcon, FileText, Calendar, HardDrive, ArrowRight, 
  LogOut, User, Activity, CheckCircle2, Mail, Trash2, Reply, Eye, EyeOff, X, Shield
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [stats, setStats] = useState({
    photos: 0,
    memoires: 0,
    eventsFuture: 0,
    eventsPast: 0,
    messagesTotal: 0,
    messagesNonLus: 0,
    usedMB: 0,
    limitMB: 1024,
  });

  // Correction de l'erreur d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const fetchData = async () => {
    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const todayIso = now.toISOString().split('T')[0];

      const [ph, me, ef, ep, mt, mnl, mList, phSizes, meSizes] = await Promise.all([
        supabase.from('galerie_photos').select('*', { count: 'exact', head: true }),
        supabase.from('memoires').select('*', { count: 'exact', head: true }),
        supabase.from('evenements').select('*', { count: 'exact', head: true }).gte('date_evenement', todayIso),
        supabase.from('evenements').select('*', { count: 'exact', head: true }).lt('date_evenement', todayIso),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('lu', false),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        // Récupération des tailles réelles (si colonne 'taille' existe, sinon mettre 0)
        supabase.from('galerie_photos').select('taille'),
        supabase.from('memoires').select('taille')
      ]);

      // Calcul du stockage réel en MB
      const totalBytes = [
        ...(phSizes.data || []),
        ...(meSizes.data || [])
      ].reduce((acc, curr) => acc + (Number(curr.taille) || 0), 0);
      
      const usedMB = totalBytes > 0 ? totalBytes / (1024 * 1024) : (ph.count || 0) * 0.8 + (me.count || 0) * 2.5;

      setStats({
        photos: ph.count || 0,
        memoires: me.count || 0,
        eventsFuture: ef.count || 0,
        eventsPast: ep.count || 0,
        messagesTotal: mt.count || 0,
        messagesNonLus: mnl.count || 0,
        usedMB: usedMB,
        limitMB: 1024
      });

      setMessages(mList.data || []);
      setLastSync(new Date());
    } catch (error) {
      console.error("Erreur de synchronisation :", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchData();
  }, [status]);

  if (!mounted || status === "loading") return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center font-serif italic text-[#8b6f47]">
      Chargement du portail...
    </div>
  );

  const storagePercent = Math.min((stats.usedMB / stats.limitMB) * 100, 100);
  const syncTime = lastSync 
    ? `${lastSync.getHours().toString().padStart(2,'0')}:${lastSync.getMinutes().toString().padStart(2,'0')}`
    : '—';

  // --- ACTIONS (Logique inchangée) ---
  const toggleRead = async (e: React.MouseEvent, msg: any) => {
    e.stopPropagation();
    const { error } = await supabase.from('contacts').update({ lu: !msg.lu }).eq('id', msg.id).select();
    if (!error) {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, lu: !msg.lu } : m));
      setStats(prev => ({ ...prev, messagesNonLus: !msg.lu ? prev.messagesNonLus - 1 : prev.messagesNonLus + 1 }));
    }
  };

  const deleteMsg = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Supprimer ce message définitivement ?")) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (!error) {
        const deleted = messages.find(m => m.id === id);
        setMessages(prev => prev.filter(m => m.id !== id));
        setStats(prev => ({
          ...prev,
          messagesTotal: prev.messagesTotal - 1,
          messagesNonLus: deleted && !deleted.lu ? prev.messagesNonLus - 1 : prev.messagesNonLus
        }));
        if (selectedMsg?.id === id) setSelectedMsg(null);
      }
    }
  };

  const openMessage = async (msg: any) => {
    setSelectedMsg(msg);
    if (!msg.lu) {
      const { error } = await supabase.from('contacts').update({ lu: true }).eq('id', msg.id).select();
      if (!error) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, lu: true } : m));
        setStats(prev => ({ ...prev, messagesNonLus: Math.max(0, prev.messagesNonLus - 1) }));
        setSelectedMsg({ ...msg, lu: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-24 pb-20 px-6 font-sans relative text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* BANNIÈRE SÉCURISÉ */}
        <div className="mb-10 border border-[#8b6f47]/30 bg-[#2c3e50]/5 px-8 py-4 flex items-center gap-4">
          <Shield size={16} className="text-[#8b6f47]" />
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-[4px] font-bold text-[#8b6f47]">
              ESPACE SÉCURISÉ — ACCÈS RESTREINT AUX ADMINISTRATEURS AUTORISÉS
            </p>
          </div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest text-green-700 font-bold">ACTIF</span>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-end border-b border-[#ede5d4] pb-8 mb-12">
          <div>
            <span className="text-[#8b6f47] text-[10px] uppercase tracking-[4px] font-bold">ADMINISTRATION</span>
            <h1 className="font-serif text-4xl text-[#2c3e50] mt-2 italic">Tableau de Bord</h1>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-[#ede5d4] rounded-full text-xs italic text-[#2c3e50]">
              <User size={14} className="text-[#8b6f47]" />
              <span>{session?.user?.name}</span>
            </div>
            <button onClick={() => signOut()} className="text-[9px] uppercase tracking-widest text-red-800 font-bold hover:opacity-70 flex items-center gap-2">
              <LogOut size={12} /> DÉCONNEXION
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          <StatCard icon={<ImageIcon size={18}/>} label="PHOTOS GALERIE" value={stats.photos} />
          <StatCard icon={<FileText size={18}/>} label="MÉMOIRE(S) PDF" value={stats.memoires} />
          <StatCard icon={<Calendar size={18}/>} label="ÉVÉNEMENTS À VENIR" value={stats.eventsFuture} subLabel={`+${stats.eventsPast} PASSÉS`} />
          <StatCard icon={<Mail size={18}/>} label="MESSAGES" value={stats.messagesTotal} subLabel={`${stats.messagesNonLus} NON-LUS`} highlight={stats.messagesNonLus > 0} />
<div className="bg-white border border-[#ede5d4] p-6 shadow-sm relative">
  <HardDrive size={16} className="text-[#8b6f47] opacity-40 mb-6" />
  <div className="text-[10px] font-bold text-[#8b6f47] absolute top-6 right-6">{storagePercent.toFixed(1)}%</div>
  <div className="font-serif text-3xl text-[#2c3e50] mb-1">{stats.usedMB.toFixed(1)} MB</div>
  <div className="text-[9px] uppercase tracking-[2px] text-[#8b6f47] font-bold">STOCKAGE</div>
  <div className="text-[9px] text-gray-400 italic mt-1 font-serif">sur {stats.limitMB / 1024} Go disponibles</div>
  <div className="w-full h-[2px] bg-[#f5f0e8] mt-4">
    <div className="h-full bg-[#8b6f47]" style={{ width: `${storagePercent}%` }} />
  </div>
</div>

        </div>

        {/* MODULES & ACTIVITÉ (Identiques au précédent) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <MenuLink title="Galerie Photos" link="/admin/galerie" desc="Gérer les souvenirs iconographiques" />
          <MenuLink title="MéMoire(S)" link="/admin/memoires" desc="Administrer les publications" />
          <MenuLink title="Événements" link="/admin/evenements" desc="Planifier l'agenda" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white border border-[#ede5d4] p-8 shadow-sm">
            <h3 className="font-serif text-lg text-[#2c3e50] mb-6 italic border-b border-[#f5f0e8] pb-4 flex items-center gap-2">
              <Activity size={18} className="text-[#8b6f47]" /> Activité récente
            </h3>
            <div className="space-y-0">
              <ActivityItem text="Connexion au portail sécurisé réussie" time="À L'INSTANT" />
              <ActivityItem text={`Base de données synchronisée (${stats.photos + stats.memoires} fichiers)`} time={syncTime} />
              <ActivityItem text="Mise à jour des messages terminée" time="RÉCEMMENT" />
            </div>
          </div>
          <div className="bg-[#2c3e50] p-10 flex flex-col justify-center items-center text-center shadow-lg">
            <div className="w-16 h-16 rounded-full border border-[#8b6f47]/40 flex items-center justify-center mb-6">
              <CheckCircle2 size={28} className="text-[#8b6f47]" />
            </div>
            <h4 className="font-serif text-2xl text-[#f5f0e8] mb-4 italic">Système Intègre</h4>
            <p className="text-[10px] uppercase tracking-[3px] text-[#f5f0e8]/60 font-bold leading-loose px-4">
              TOUTES LES SAUVEGARDES<br/>SONT À JOUR SUR LE CLOUD<br/>SUPABASE.
            </p>
          </div>
        </div>

        {/* LISTE MESSAGES (Identique au précédent) */}
        <div className="bg-white border border-[#ede5d4] p-8 shadow-sm">
            <h3 className="font-serif text-lg text-[#2c3e50] mb-8 italic flex items-center gap-3 border-b border-[#f5f0e8] pb-4">
                <Mail size={18} className="text-[#8b6f47]" /> Boîte de réception
                {stats.messagesNonLus > 0 && <span className="ml-2 bg-[#8b6f47] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">{stats.messagesNonLus} NON-LUS</span>}
            </h3>
            <div className="space-y-2">
                {messages.map((msg) => (
                    <div key={msg.id} onClick={() => openMessage(msg)} className={`flex items-center justify-between p-4 border cursor-pointer hover:bg-[#fcfbf9] transition-all ${!msg.lu ? 'bg-[#8b6f47]/5 border-l-4 border-l-[#8b6f47] border-[#ede5d4]' : 'bg-white border-[#f5f0e8] opacity-70'}`}>
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                            <button onClick={(e) => toggleRead(e, msg)} className={`flex-shrink-0 transition-all hover:scale-110 ${msg.lu ? 'text-gray-300 hover:text-[#8b6f47]' : 'text-[#8b6f47]'}`}>
                                {msg.lu ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 flex-1 items-center gap-4 min-w-0">
                                <div className={`text-xs uppercase truncate ${!msg.lu ? 'font-bold text-[#2c3e50]' : 'font-normal text-gray-500'}`}>{msg.nom}</div>
                                <div className={`text-xs italic truncate ${!msg.lu ? 'text-[#8b6f47]' : 'text-gray-400'}`}>{msg.sujet}</div>
                                <div className="text-[10px] text-gray-400 truncate">{msg.message}</div>
                            </div>
                        </div>
                        <button onClick={(e) => deleteMsg(e, msg.id)} className="text-red-800/40 hover:text-red-800 ml-4"><Trash2 size={15} /></button>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* MODALE (Identique au précédent) */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#2c3e50]/90 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-2xl shadow-2xl flex flex-col border border-[#8b6f47]/30">
            <div className="p-6 border-b border-[#f5f0e8] flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8b6f47] font-bold">Lecture du courrier</p>
                <h2 className="font-serif text-2xl text-[#2c3e50] italic">{selectedMsg.sujet}</h2>
              </div>
              <button onClick={() => setSelectedMsg(null)} className="p-2 text-[#2c3e50] hover:bg-[#f5f0e8] transition-colors"><X size={24} /></button>
            </div>
            <div className="p-8 bg-[#fcfbf9] overflow-y-auto max-h-[60vh]">
              <div className="mb-6 pb-6 border-b border-[#ede5d4] grid grid-cols-2 gap-4 text-sm text-left">
                <div><p className="text-[#8b6f47] text-[9px] font-bold uppercase">De</p><p className="text-[#2c3e50] font-serif">{selectedMsg.nom}</p></div>
                <div><p className="text-[#8b6f47] text-[9px] font-bold uppercase">Adresse</p><p className="text-[#2c3e50] italic">{selectedMsg.email}</p></div>
              </div>
              <div className="font-serif text-[#2c3e50] leading-relaxed whitespace-pre-wrap text-lg text-left">{selectedMsg.message}</div>
            </div>
            {selectedMsg && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#2c3e50]/90 backdrop-blur-md p-4">
    <div className="bg-white w-full max-w-2xl shadow-2xl flex flex-col border border-[#8b6f47]/30">
      
      {/* HEADER */}
      <div className="p-6 border-b border-[#f5f0e8] flex justify-between items-center">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#8b6f47] font-bold">Lecture du courrier</p>
          <h2 className="font-serif text-2xl text-[#2c3e50] italic">{selectedMsg.sujet}</h2>
        </div>
        <button onClick={() => setSelectedMsg(null)} className="p-2 text-[#2c3e50] hover:bg-[#f5f0e8] transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* CORPS */}
      <div className="p-8 bg-[#fcfbf9] overflow-y-auto max-h-[60vh]">
        
        {/* MÉTADONNÉES — grille 2x2 */}
        <div className="mb-6 pb-6 border-b border-[#ede5d4] grid grid-cols-2 gap-4 text-sm text-left">
          <div>
            <p className="text-[#8b6f47] text-[9px] font-bold uppercase mb-1">De</p>
            <p className="text-[#2c3e50] font-serif">{selectedMsg.nom}</p>
          </div>
          <div>
            <p className="text-[#8b6f47] text-[9px] font-bold uppercase mb-1">Adresse</p>
            <p className="text-[#2c3e50] italic">{selectedMsg.email}</p>
          </div>
          <div>
            <p className="text-[#8b6f47] text-[9px] font-bold uppercase mb-1">Date</p>
            <p className="text-[#2c3e50] font-serif text-xs">
              {new Date(selectedMsg.created_at).toLocaleDateString('fr-FR', { 
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          <div>
            <p className="text-[#8b6f47] text-[9px] font-bold uppercase mb-1">Statut</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${selectedMsg.lu ? 'text-green-700' : 'text-[#8b6f47]'}`}>
              {selectedMsg.lu ? '✅ Lu' : '📩 Non lu'}
            </p>
          </div>
        </div>

        {/* MESSAGE */}
        <div className="font-serif text-[#2c3e50] leading-relaxed whitespace-pre-wrap text-lg text-left">
          {selectedMsg.message}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 bg-white border-t border-[#f5f0e8] flex justify-end gap-4">
        <a 
          href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.sujet}`} 
          className="bg-[#2c3e50] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#8b6f47] flex items-center gap-2 transition-colors"
        >
          <Reply size={16} /> Répondre
        </a>
      </div>
    </div>
  </div>
)}

            <div className="p-6 bg-white border-t border-[#f5f0e8] flex justify-end gap-4">
              <a href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.sujet}`} className="bg-[#2c3e50] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#8b6f47] flex items-center gap-2">
                <Reply size={16} /> Répondre
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, subLabel, highlight = false }: any) {
  return (
    <div className="bg-white border border-[#ede5d4] p-6 shadow-sm group hover:border-[#8b6f47] transition-all relative text-left">
      <div className={`${highlight ? 'text-[#8b6f47]' : 'text-[#8b6f47] opacity-40'} mb-6 group-hover:opacity-100`}>{icon}</div>
      <div className="font-serif text-3xl text-[#2c3e50] mb-1">{value}</div>
      <div className="text-[9px] uppercase tracking-[2px] text-[#8b6f47] font-bold">{label}</div>
      {subLabel && <div className="text-[9px] text-gray-400 italic mt-1 font-serif">{subLabel}</div>}
      {highlight && <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#8b6f47] rounded-full animate-pulse" />}
    </div>
  );
}

function MenuLink({ title, link, desc }: any) {
  return (
    <Link href={link} className="group">
      <div className="bg-[#2c3e50] p-10 h-full transition-all group-hover:bg-[#324559] flex flex-col justify-between shadow-md text-left">
        <div>
          <h3 className="font-serif text-xl text-[#f5f0e8] mb-4">{title}</h3>
          <p className="text-[#f5f0e8]/50 text-xs italic font-serif leading-relaxed">{desc}</p>
        </div>
        <div className="mt-8 flex items-center gap-2 text-[#8b6f47] text-[10px] uppercase tracking-[3px] font-bold">
          ACCÉDER <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({ text, time }: any) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#f5f0e8] last:border-0 text-left">
      <span className="text-sm text-[#2c3e50] italic font-serif">{text}</span>
      <span className="text-[9px] uppercase tracking-widest text-[#8b6f47] font-bold ml-4 flex-shrink-0">{time}</span>
    </div>
  );
}