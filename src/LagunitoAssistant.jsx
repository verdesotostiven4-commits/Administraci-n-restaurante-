import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, ShoppingBag, Sparkles, X, Send, Utensils, Cookie, WalletCards, Clock3 } from 'lucide-react';
import './lagunito.css';

const quickReplies = [
  {
    label: 'Recomiéndame algo',
    intent: 'recommend',
    icon: Utensils,
  },
  {
    label: 'Quiero un postre',
    intent: 'dessert',
    icon: Cookie,
  },
  {
    label: 'Algo económico',
    intent: 'budget',
    icon: WalletCards,
  },
  {
    label: '¿Cómo llego?',
    intent: 'location',
    icon: MapPin,
  },
  {
    label: 'Hacer pedido',
    intent: 'order',
    icon: ShoppingBag,
  },
  {
    label: 'Horario',
    intent: 'hours',
    icon: Clock3,
  },
];

const replies = {
  recommend: {
    mood: 'thinking',
    answer: 'Estoy pensando en algo bien Villa Laguna... Te recomiendo Seco de Chivo Tradicional si quieres un plato fuerte, Chicharrón Andino si buscas algo crocante, o Tres Leches para cerrar con algo dulce.',
    action: 'Ver recomendaciones',
    hash: '#tienda',
  },
  dessert: {
    mood: 'happy',
    answer: 'Para postres te iría perfecto el Cheesecake de Maracuyá si quieres algo fresco, Higos con Queso si buscas tradición, o Tres Leches si quieres un clásico familiar.',
    action: 'Ver postres',
    hash: '#tienda',
  },
  budget: {
    mood: 'happy',
    answer: 'Para algo rico y económico, mira las Empanadas de Queso o la Torta Tres Leches. Son buenas opciones para probar algo sin gastar mucho.',
    action: 'Ir a tienda',
    hash: '#tienda',
  },
  location: {
    mood: 'talking',
    answer: 'Estamos en Cajabamba, Ecuador. Puedes revisar la sección de ubicación y abrir Google Maps desde ahí para llegar más fácil.',
    action: 'Ver ubicación',
    hash: '#ubicacion',
  },
  order: {
    mood: 'happy',
    answer: 'Para pedir, agrega tus platos al carrito y luego envía el pedido por WhatsApp. Yo puedo ayudarte a elegir antes de confirmar.',
    action: 'Armar pedido',
    hash: '#tienda',
  },
  hours: {
    mood: 'talking',
    answer: 'El horario puede ajustarse según atención del restaurante. Por ahora, lo más seguro es confirmar por WhatsApp antes de ir o hacer un pedido.',
    action: 'Contactar',
    hash: '#ubicacion',
  },
  unknown: {
    mood: 'thinking',
    answer: 'Puedo ayudarte con recomendaciones, postres, platos económicos, ubicación o pedidos. Prueba preguntarme: “quiero algo típico”, “algo barato” o “quiero un postre”.',
    action: 'Ver tienda',
    hash: '#tienda',
  },
};

function detectIntent(text) {
  const value = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (value.includes('postre') || value.includes('dulce') || value.includes('tres leches') || value.includes('cheesecake') || value.includes('higo')) return 'dessert';
  if (value.includes('barato') || value.includes('economico') || value.includes('precio') || value.includes('presupuesto')) return 'budget';
  if (value.includes('ubicacion') || value.includes('llego') || value.includes('llegar') || value.includes('maps') || value.includes('direccion')) return 'location';
  if (value.includes('pedido') || value.includes('pedir') || value.includes('whatsapp') || value.includes('carrito')) return 'order';
  if (value.includes('horario') || value.includes('hora') || value.includes('abierto')) return 'hours';
  if (value.includes('recomienda') || value.includes('recomendacion') || value.includes('tipico') || value.includes('plato') || value.includes('comer')) return 'recommend';
  return 'unknown';
}

export default function LagunitoAssistant({ open, setOpen }) {
  const [mood, setMood] = useState('idle');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy Lagunito, tu guía de Villa Laguna. Puedo recomendarte platos, ayudarte con ubicación o armar tu pedido.' },
  ]);
  const messagesEndRef = useRef(null);
  const sleepyTimer = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping, open]);

  useEffect(() => {
    clearTimeout(sleepyTimer.current);
    if (!open) {
      sleepyTimer.current = setTimeout(() => setMood('sleepy'), 14000);
    }
    return () => clearTimeout(sleepyTimer.current);
  }, [open, messages]);

  const bubbleText = useMemo(() => {
    if (open) return 'Estoy listo para ayudarte';
    if (mood === 'happy') return '¡Buena elección!';
    if (mood === 'thinking') return 'Estoy pensando...';
    if (mood === 'sleepy') return 'Tócame si necesitas ayuda';
    return '¿Te ayudo a elegir?';
  }, [open, mood]);

  const botReply = (intent) => {
    const reply = replies[intent] || replies.unknown;
    setMood(reply.mood);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMood('talking');
      setMessages((current) => [
        ...current,
        { from: 'bot', text: reply.answer, action: reply.action, hash: reply.hash },
      ]);
      setTimeout(() => setMood(reply.mood === 'thinking' ? 'happy' : 'idle'), 1400);
    }, 650);
  };

  const choose = (reply) => {
    setMessages((current) => [...current, { from: 'user', text: reply.label }]);
    botReply(reply.intent);
  };

  const submit = (event) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setInput('');
    setMessages((current) => [...current, { from: 'user', text: value }]);
    botReply(detectIntent(value));
  };

  const goTo = (hash) => {
    window.location.hash = hash;
    setOpen(false);
  };

  return (
    <div className={`lagunito-wrap ${open ? 'is-open' : ''}`}>
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
        onClick={() => {
          setOpen(true);
          setMood('happy');
          setTimeout(() => setMood('idle'), 900);
        }}
        aria-label="Abrir asistente Lagunito"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="lagunito-bird">
          <span className="lagunito-crest" />
          <span className="lagunito-wing" />
          <span className="lagunito-beak" />
          <span className="lagunito-eye left" />
          <span className="lagunito-eye right" />
          <span className="lagunito-mouth" />
          <span className="lagunito-scarf" />
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
              {isTyping && (
                <div className="lagunito-message bot typing">
                  <span /> <span /> <span />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="lagunito-actions">
              {quickReplies.map((reply) => {
                const Icon = reply.icon;
                return (
                  <button key={reply.label} onClick={() => choose(reply)}>
                    <Icon size={15} />
                    {reply.label}
                  </button>
                );
              })}
            </div>

            <form className="lagunito-input" onSubmit={submit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escribe: quiero algo típico..."
              />
              <button type="submit" aria-label="Enviar mensaje"><Send size={17} /></button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
