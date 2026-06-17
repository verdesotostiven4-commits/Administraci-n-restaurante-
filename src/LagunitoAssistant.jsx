import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import './lagunito.css';
import './galleryEnhancer.js';

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
    document.title = 'Villa Laguna | Restaurante';
    let icon = document.querySelector("link[rel='icon']");
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = '/favicon.svg';
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
