import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import './lagunito.css';

const quick = ['Hola', 'Recomiéndame algo', 'Quiero un postre', 'Algo económico', '¿Cómo llego?', 'Hacer pedido'];

function fallback(text) {
  const clean = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const nums = clean.replace(/,/g, '.').match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  if (nums.length > 1) return { reply: `El total aproximado es $${nums.reduce((a, b) => a + b, 0).toFixed(2)}.`, mood: 'talking' };
  if (clean.includes('hola')) return { reply: '¡Hola! Soy Lagunito. Puedo ayudarte con menú, precios, ubicación, pedidos y recomendaciones.', mood: 'happy' };
  if (clean.includes('postre')) return { reply: 'Te recomiendo Cheesecake de Maracuyá, Higos con Queso o Tres Leches.', mood: 'happy', action: { label: 'Ver tienda', hash: '#tienda' } };
  if (clean.includes('lleg') || clean.includes('ubic')) return { reply: 'Estamos en Cajabamba, Ecuador, cerca de la Laguna de Colta.', mood: 'talking', action: { label: 'Ver ubicación', hash: '#ubicacion' } };
  return { reply: 'Puedo ayudarte con Villa Laguna: menú, ingredientes, precios, pedidos, ubicación o recomendaciones.', mood: 'thinking', action: { label: 'Ver tienda', hash: '#tienda' } };
}

export default function LagunitoAssistant({ open, setOpen, cart = [], cartTotal = 0 }) {
  const [input, setInput] = useState('');
  const [mood, setMood] = useState('idle');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: '¡Hola! Soy Lagunito. Pregúntame por menú, precios, pedidos, ingredientes o ubicación.' }]);
  const endRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (document.getElementById('gallery-mosaic-inline')) return;
    const style = document.createElement('style');
    style.id = 'gallery-mosaic-inline';
    style.textContent = `.gallery-preview-grid{display:grid!important;grid-template-columns:repeat(6,1fr)!important;grid-auto-rows:116px!important;gap:10px!important}.gallery-placeholder{min-height:0!important;padding:0!important;display:block!important;position:relative!important;overflow:hidden!important;border-radius:24px!important;border:1px solid rgba(229,189,102,.42)!important;background-size:cover!important;background-position:center!important;box-shadow:0 16px 34px rgba(8,45,45,.18)!important}.gallery-placeholder span,.gallery-placeholder strong{display:none!important}.gallery-placeholder:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,45,45,.02),rgba(8,45,45,.2))}.gallery-placeholder:nth-child(1){grid-column:span 3!important;grid-row:span 2!important;background-image:url('https://blogger.googleusercontent.com/img/a/AVvXsEiTKpQAs4uqaQb_ybJrQWWJU_FcAXv5KyZLfu4a0qSe8ZFJrEOz5PyYsJSHEveHn-HLXZySF2W7aNozW1uIlAc5fxFbPTLqiYvDg9BU3rqAucyya201ZbYxEtIvZGniNbp-9fJj5m2pJuWCIbJfYlNEFZcNIrZZlmoDSw0kf04UgpIQJ3k-eCyxRTxHGlY')!important}.gallery-placeholder:nth-child(2){grid-column:span 3!important;background-image:url('https://blogger.googleusercontent.com/img/a/AVvXsEi1NeloTCI0MpuSTFUnLbrL0a5zV5kJI2HgD-c6f0g0tPeM3nENbEybYN06BU8Ft3RmaSwGV-xw4YcO3jQ_hmEpfcI3VLu8FpundzTfL2WHH2kPqxfbXu8LLYWQoeHAJL6DLiePN1YIbfgHKj6By4cD7l1tSc4l0UaKt2q46QYDR71FIi7Ru40WSErXeWg')!important}.gallery-placeholder:nth-child(3){grid-column:span 3!important;background-image:url('https://blogger.googleusercontent.com/img/a/AVvXsEhdwiwKkPpRsS7fwZS_gIkvF7WYURut_eQYZ5QYLbS2H3zJoEPxYs6tjIleS_7qqcPlfne7ISW9U7S3JfBM5ZGlSBzfbdTpNGu9B5yDIxGu-0wVFh7Ej8LALYCYMiGiOgtHRsaX3zlfQ7Ho9LxhF0E-8Y-OnnBNSKYg-mWoS8lgvIc2FT-ZbKXQfLAz3dU')!important}.gallery-placeholder:nth-child(4){grid-column:span 2!important;background-image:url('https://blogger.googleusercontent.com/img/a/AVvXsEgCWQH1-FTBCSjwOAaASYIVB-mIz8r29MNsix7qg-7wwbEfMb8eu06KElbFDgztZlv9bS6-gd3CfqpHRUPjjog-mC3zgahWtrdGP8KovTpx_3DAqBNKdTovFXIJo6BgrwAG8fSO1aS4jFTGVPTXLYjsEEmJvF-CRrf6AqV2WCTY_6LrPNTTAcHawJiiAvA')!important}.gallery-placeholder:nth-child(5){grid-column:span 4!important;background-image:url('https://blogger.googleusercontent.com/img/a/AVvXsEhDL7bKRwtj1HYvtqbLFCCtaEJ3egzk1Tu0EWsEN90aShFOlOVQVcWwOxbuaEXrIAM64lK6Mq-WSqV_3Qa-Ou7B0JylLbtI7Fv1j8xIBiQBP2U9ucMc2TpzGC903DZHFbZFRuMrdOvMf5ef_i10yTpBFuEr2cRXHfK6RI8TzQfDI-o0NP5hbiY9AstxNBA')!important}.gallery-placeholder:nth-child(6){display:none!important}@media(max-width:900px){.gallery-preview-grid{grid-template-columns:1fr!important;grid-auto-rows:180px!important}.gallery-placeholder{grid-column:auto!important;grid-row:auto!important}}`;
    document.head.appendChild(style);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => {
    const close = (e) => { if (open && wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open, setOpen]);

  async function ask(text) {
    const value = text.trim();
    if (!value) return;
    const history = [...messages, { from: 'user', text: value }];
    setMessages(history); setInput(''); setTyping(true); setMood('thinking');
    try {
      const res = await fetch('/api/lagunito', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: value, history: history.slice(-8), cart, cartTotal }) });
      if (!res.ok) throw new Error('error');
      const data = await res.json();
      setTyping(false); setMood(data.mood || 'talking');
      setMessages((m) => [...m, { from: 'bot', text: data.reply, action: data.action?.label, hash: data.action?.hash }]);
    } catch {
      const data = fallback(value);
      setTyping(false); setMood(data.mood || 'talking');
      setMessages((m) => [...m, { from: 'bot', text: data.reply, action: data.action?.label, hash: data.action?.hash }]);
    }
    setTimeout(() => setMood('idle'), 1200);
  }

  const goTo = (hash) => { window.location.hash = hash; setOpen(false); };

  return <div ref={wrapRef} className={`lagunito-wrap ${open ? 'is-open' : ''}`}>
    {!open && <div className="lagunito-tip">¿Te ayudo a elegir?</div>}
    <motion.button className={`lagunito-button mood-${mood}`} onClick={() => setOpen(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
      <span className="lagunito-face-pro"><span className="lagunito-halo"/><span className="lagunito-chef-dot"/><span className="lagunito-pro-eye left"><span/></span><span className="lagunito-pro-eye right"><span/></span><span className="lagunito-pro-smile"/><span className="lagunito-waterline"/></span>
    </motion.button>
    <AnimatePresence>{open && <motion.aside className="lagunito-panel" initial={{ opacity:0, y:20, scale:.96 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:20, scale:.96 }}>
      <div className="lagunito-head"><div className="lagunito-mini"><Sparkles size={18}/></div><div><strong>Lagunito</strong><span>Asistente de Villa Laguna</span></div><button onClick={() => setOpen(false)}><X size={18}/></button></div>
      <div className="lagunito-messages">{messages.map((msg,i)=><div className={`lagunito-message ${msg.from}`} key={i}><p>{msg.text}</p>{msg.action&&<button onClick={()=>goTo(msg.hash)}>{msg.action}</button>}</div>)}{typing&&<div className="lagunito-message bot typing"><span/><span/><span/></div>}<div ref={endRef}/></div>
      <div className="lagunito-actions">{quick.map((q)=><button key={q} onClick={()=>ask(q)}>{q}</button>)}</div>
      <form className="lagunito-input" onSubmit={(e)=>{e.preventDefault();ask(input)}}><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Pregunta por menú, precios, ingredientes..."/><button><Send size={17}/></button></form>
    </motion.aside>}</AnimatePresence>
  </div>;
}
