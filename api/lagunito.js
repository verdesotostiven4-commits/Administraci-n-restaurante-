const MENU = [
  ['Cheesecake de Maracuyá', 'Postres', 4.99, 'queso crema, crema de leche, leche condensada, maracuyá'],
  ['Higos con Queso', 'Postres', 6.00, 'higos, panela, canela, clavo de olor, queso fresco'],
  ['Torta Tres Leches', 'Postres', 3.85, 'bizcocho, tres leches, vainilla, merengue'],
  ['Chicharrón Andino', 'Entradas', 5.00, 'cerdo, papas, ensalada, ají artesanal'],
  ['Empanadas de Queso', 'Entradas', 2.70, 'masa y queso ecuatoriano'],
  ['Seco de Chivo Tradicional de la Sierra', 'Platos fuertes', 13.00, 'chivo, chicha de jora, cerveza, arroz, plátano'],
  ['Cuy Asado al Horno de Leña', 'Platos fuertes', 16.50, 'cuy, papas, mote, salsa de maní'],
  ['Arroz con Pato al Horno', 'Platos fuertes', 15.00, 'pato, arroz, fondo de ave, especias'],
  ['Lomo de Cerdo Agridulce', 'Platos fuertes', 9.00, 'lomo de cerdo, mortiño, zanahoria blanca'],
  ['Lomo Saltado de la Villa', 'Platos fuertes', 12.00, 'lomo de res, cebolla, pimientos, tomate, arroz, papas'],
];

function buildPrompt(cart = [], cartTotal = 0) {
  const menu = MENU.map(([name, category, price, ingredients]) => `- ${name} (${category}) $${price.toFixed(2)}. Ingredientes: ${ingredients}`).join('\n');
  const currentCart = cart.length
    ? cart.map((item) => `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`).join('\n')
    : 'Carrito vacío.';

  return `Eres Lagunito, asistente virtual de Villa Laguna Restaurante en Cajabamba, Ecuador, cerca de la Laguna de Colta.
Habla en español latino, con tono cálido, profesional y breve.
Ayuda solo con temas del restaurante: menú, precios, ingredientes, recomendaciones, pedidos, ubicación, carrito, cálculos de total, atención al cliente y experiencia gastronómica.
Si preguntan algo fuera del negocio, redirige amablemente al menú, pedidos o ubicación.
No inventes horarios exactos; indica que se confirme por WhatsApp.
Calcula totales cuando el cliente dé precios o pregunte cuánto sería.

MENÚ:
${menu}

CARRITO ACTUAL:
${currentCart}
Total del carrito: $${Number(cartTotal || 0).toFixed(2)}

Responde siempre en JSON válido:
{"reply":"texto para el cliente","mood":"idle|happy|thinking|talking|sleepy","action":null}
Si conviene llevar a una sección:
{"reply":"texto","mood":"happy","action":{"label":"Ver tienda","hash":"#tienda"}}
Hashes permitidos: #tienda, #ubicacion, #inicio.`;
}

function extractText(payload) {
  if (typeof payload.output_text === 'string') return payload.output_text;
  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') parts.push(content.text);
    }
  }
  return parts.join('\n');
}

function parseJson(text) {
  try { return JSON.parse(text); } catch {}
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'Falta OPENAI_API_KEY en Vercel.' });

  try {
    const { message = '', history = [], cart = [], cartTotal = 0 } = req.body || {};
    const input = [
      ...(Array.isArray(history) ? history.slice(-10).map((item) => ({
        role: item.from === 'user' ? 'user' : 'assistant',
        content: String(item.text || '').slice(0, 700),
      })) : []),
      { role: 'user', content: String(message).slice(0, 800) },
    ];

    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions: buildPrompt(cart, cartTotal),
        input,
        temperature: 0.35,
        max_output_tokens: 420,
      }),
    });

    if (!apiResponse.ok) {
      const detail = await apiResponse.text();
      return res.status(apiResponse.status).json({ error: 'Error del proveedor IA', detail: detail.slice(0, 400) });
    }

    const payload = await apiResponse.json();
    const parsed = parseJson(extractText(payload));

    return res.status(200).json({
      reply: parsed?.reply || 'Puedo ayudarte con menú, precios, pedidos, ubicación o recomendaciones de Villa Laguna.',
      mood: ['idle', 'happy', 'thinking', 'talking', 'sleepy'].includes(parsed?.mood) ? parsed.mood : 'talking',
      action: parsed?.action?.label && parsed?.action?.hash ? parsed.action : null,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno en Lagunito', detail: error.message });
  }
}
