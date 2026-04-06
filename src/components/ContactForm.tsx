"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nom: "", email: "", sujet: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert([formData]);
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      alert("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: 'white', padding: '40px', borderRadius: '4px', textAlign: 'center', border: '1px solid #93C5FD' }}>
        <CheckCircle size={48} color="#8b6f47" style={{ margin: '0 auto 15px' }} />
        <h3 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', fontSize: '1.4rem' }}>Message envoyé</h3>
        <p style={{ color: '#6b6b6b' }}>Merci pour votre message. L'association Les Citoyens de la Mémoire vous répondra dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <input required type="text" placeholder="Votre nom" style={inputStyle}
          onChange={(e) => setFormData({...formData, nom: e.target.value})} />
        <input required type="email" placeholder="Votre email" style={inputStyle}
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
      </div>
      <input required type="text" placeholder="Sujet" style={inputStyle}
        onChange={(e) => setFormData({...formData, sujet: e.target.value})} />
      <textarea required rows={6} placeholder="Votre message..." style={{ ...inputStyle, resize: 'none' }}
        onChange={(e) => setFormData({...formData, message: e.target.value})} />

      <button type="submit" disabled={loading} style={btnStyle}>
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
        {loading ? "ENVOI EN COURS..." : "ENVOYER LE MESSAGE"}
      </button>
    </form>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '4px',
  border: '1px solid #e0dcd5',
  fontSize: '0.9rem',
  outline: 'none',
  backgroundColor: '#fff'
};

const btnStyle = {
  backgroundColor: '#2c3e50',
  color: '#fff',
  padding: '16px',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px'
};