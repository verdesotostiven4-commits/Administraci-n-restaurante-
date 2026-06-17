import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, ShoppingBag, Sparkles, X, ChefHat, Send } from 'lucide-react';
import './lagunito.css';

const quickReplies = [
  {
    label: 'Recomiéndame algo',
    answer: 'Mi recomendación de la casa: Seco de Chivo Tradicional si quieres algo fuerte, Empanadas de Queso si buscas una entrada rápida, y Tres Leches para cerrar dulce.',
    action: 'Ir a tienda',
    hash: '#tienda',
  },
  {
    label: 'Quiero un postre',
    answer: 'Para postres, prueba Cheesecake de Maracuyá si quieres algo fresco, Higos con Queso si quieres tradición, o Tres Leches si buscas algo clásico.',
    action: 'Ver tienda',
    hash: '#tienda',
  },
  {
    label: '¿Cómo llego?',
    answer: 'Estamos en Cajabamba, Ecuador. Puedes abrir la ubicación en Google Maps desde el botón de ubicación de la página.',
    action: 'Ubicación',
    hash: '#ubicacion',
  },
  {
    label: 'Hacer pedido',
    answer: 'Agrega tus platos al carrito y luego envía el pedido por WhatsApp. Yo te acompaño mientras eliges.',
    action: 'Armar pedido',
    hash: '#tienda',
  },
];

export default function LagunitoAssistant() {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState('saludo');
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy Lagunito, tu guía de Villa Laguna. Puedo recomendarte platos, ayudarte con ubicación o armar tu pedido.' },
  ]);

  const bubbleText = useMemo(() => {
    if (open) return 'Estoy listo para ayudarte';
    if (mood === 'feliz') return '¡Buena elección!';
    if (mood === 'pensando') return 'Estoy pensando...';
    return '¿Te ayudo a elegir?';
  }, [open, mood]);

  const choose = (reply) => {
    setMood('feliz');
    setMessages((current) => [
      ...current,
      { from: 'user', text: reply.label },
      { from: 'bot', text: reply.answer, action: reply.action, hash: reply.hash },
    ]);
    setTimeout(() => setMood('saludo'), 1200);
  };

  const goTo = (hash) => {
    window.location.hash = hash;
    setOpen(false);
  };

  return (
    <div className="lagunito-wrap">
      <AnimatePresence>
        {!open && (
          <motion.div
            className="lagunito-tip"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
          >
            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`lagunito-button mood-${mood}`}
        onClick={() => setOpen(true)}
        aria-label="Abrir asistente Lagunito"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="lagunito-face">
          <span className="lagunito-hat"><ChefHat size={22} /></span>
          <span className="lagunito-eye left" />
          <span className="lagunito-eye right" />
          <span className="lagunito-smile" />
          <span className="lagunito-shine" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="lagunito-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22 }}
          >
            <div className="lagunito-head">
              <div className="lagunito-mini"><Sparkles size={18} /></div>
              <div>
                <strong>Lagunito</strong>
                <span>Asistente de Villa Laguna</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar asistente"><X size={18} /></button>
            </div>

            <div className="lagunito-messages">
              {messages.map((message, index) => (
                <div className={`lagunito-message ${message.from}`} key={`${message.text}-${index}`}>
                  <p>{message.text}</p>
                  {message.action && <button onClick={() => goTo(message.hash)}>{message.action}</button>}
                </div>
              ))}
            </div>

            <div className="lagunito-actions">
              {quickReplies.map((reply) => (
                <button key={reply.label} onClick={() => choose(reply)}>
                  {reply.label === '¿Cómo llego?' ? <MapPin size={15} /> : reply.label === 'Hacer pedido' ? <ShoppingBag size={15} /> : <MessageCircle size={15} />}
                  {reply.label}
                </button>
              ))}
            </div>

            <button className="lagunito-main-cta" onClick={() => goTo('#tienda')}>
              <Send size={17} /> Ir a tienda virtual
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
