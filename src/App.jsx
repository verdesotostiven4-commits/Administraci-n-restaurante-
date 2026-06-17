import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  ShoppingCart,
  Search,
  Star,
  Plus,
  Minus,
  X,
  ChefHat,
  Leaf,
  Clock,
  Award,
  Users,
  Heart,
  Send,
  PlayCircle,
  Menu,
  Utensils,
  Target,
  Eye,
  Gem,
} from 'lucide-react';

const logoUrl = '/logo-villa-laguna.png';
const whatsappNumber = '593999999999';
const mapsUrl = 'https://maps.app.goo.gl/2YEMvyfpp8Y15Euk9';

const products = [
  {
    id: 1,
    name: 'Cheesecake de Maracuyá',
    category: 'Postres',
    description:
      'Tarta de queso cremosa sobre base de galleta, bañada con salsa artesanal de maracuyá. Un postre fresco, cítrico y elegante.',
    difference: 'Se diferencia por su equilibrio entre dulzor, cremosidad y acidez natural de fruta tropical.',
    price: 4.99,
    oldPrice: 5.75,
    rating: 4.8,
    tag: 'Cítrico',
    images: [
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Galletas María', 'Mantequilla', 'Crema de leche', 'Leche condensada', 'Queso crema', 'Pulpa de maracuyá', 'Gelatina', 'Mermelada de maracuyá'],
    features: ['Textura cremosa', 'Salsa artesanal', 'Ideal para compartir'],
  },
  {
    id: 2,
    name: 'Higos con Queso',
    category: 'Postres',
    description:
      'Higos tiernos cocinados lentamente en almíbar de panela, canela y clavo, servidos con queso fresco.',
    difference: 'Un clásico ecuatoriano que combina tradición, dulzor natural y contraste salado.',
    price: 6,
    oldPrice: 6.8,
    rating: 4.7,
    tag: 'Tradicional',
    images: [
      'https://images.unsplash.com/photo-1601000938259-9e92002320e0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541782814459-453b99a7fae4?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Higos', 'Bicarbonato', 'Panela', 'Agua', 'Queso fresco', 'Canela', 'Clavo de olor', 'Pimienta dulce'],
    features: ['Receta tradicional', 'Almíbar artesanal', 'Queso fresco local'],
  },
  {
    id: 3,
    name: 'Torta Tres Leches',
    category: 'Postres',
    description:
      'Bizcocho de vainilla extra esponjoso bañado con tres leches, cubierto con merengue y canela.',
    difference: 'Su humedad perfecta y cobertura suave la convierten en uno de los postres favoritos de la casa.',
    price: 3.85,
    oldPrice: 4.5,
    rating: 4.9,
    tag: 'Más pedido',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Huevo', 'Azúcar', 'Harina de trigo', 'Vainilla', 'Sal', 'Tres leches', 'Jugo de limón', 'Canela', 'Frutillas'],
    features: ['Bizcocho húmedo', 'Cobertura ligera', 'Sabor familiar'],
  },
  {
    id: 4,
    name: 'Chicharrón Andino',
    category: 'Entradas',
    description:
      'Chicharrón de cerdo crocante con papas, ensalada fresca y ají artesanal molido en piedra volcánica.',
    difference: 'Su ají artesanal y hierbas de páramo le dan un carácter profundamente andino.',
    price: 5,
    oldPrice: 5.9,
    rating: 4.8,
    tag: 'Crocante',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Carne de cerdo', 'Ajo', 'Cebolla blanca', 'Comino', 'Sal', 'Ají fresco', 'Tomate de árbol', 'Lechuga', 'Cilantro', 'Hierbas locales'],
    features: ['Piel crocante', 'Ají artesanal', 'Entrada contundente'],
  },
  {
    id: 5,
    name: 'Empanadas de Queso',
    category: 'Entradas',
    description:
      'Empanadas de masa crocante rellenas de queso local fundido de Cajabamba, doradas al punto.',
    difference: 'Una entrada sencilla, cálida y perfecta para abrir el apetito con sabor local.',
    price: 2.7,
    oldPrice: 3.25,
    rating: 4.6,
    tag: 'Familiar',
    images: [
      'https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Discos de empanada', 'Queso ecuatoriano', 'Huevos', 'Agua', 'Aceite vegetal', 'Azúcar'],
    features: ['Masa crocante', 'Queso fundido', 'Precio accesible'],
  },
  {
    id: 6,
    name: 'Seco de Chivo Tradicional de la Sierra',
    category: 'Platos fuertes',
    description:
      'Trozos de chivo estofados lentamente con chicha de jora, cerveza y especias de la casa. Servido con arroz amarillo y chifles.',
    difference: 'Un plato andino de cocción lenta, aroma profundo y sabor tradicional de la Sierra.',
    price: 13,
    oldPrice: 15,
    rating: 4.9,
    tag: 'Especialidad',
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Chivo', 'Chicha de jora', 'Cerveza', 'Especias de la casa', 'Arroz amarillo', 'Plátano', 'Orégano', 'Achote', 'Cilantro'],
    features: ['Cocción lenta', 'Sabor tradicional', 'Plato completo'],
  },
  {
    id: 7,
    name: 'Cuy Asado al Horno de Leña',
    category: 'Platos fuertes',
    description:
      'Cuy marinado en finas hierbas locales y asado en horno de leña hasta lograr piel crujiente y carne jugosa.',
    difference: 'Representa la cocina tradicional andina con técnica de horno de leña y acompañamientos clásicos.',
    price: 16.5,
    oldPrice: 18.5,
    rating: 4.8,
    tag: 'Andino',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Cuy', 'Orégano', 'Papas cocidas', 'Mote', 'Tostado', 'Salsa de maní', 'Lechuga', 'Cebolla colorada', 'Ajo', 'Sal'],
    features: ['Horno de leña', 'Piel crujiente', 'Acompañamiento tradicional'],
  },
  {
    id: 8,
    name: 'Arroz con Pato al Horno',
    category: 'Platos fuertes',
    description:
      'Pato dorado sobre arroz meloso preparado con fondo concentrado, especias de la zona y detalles elegantes.',
    difference: 'Un plato sofisticado que une técnica, sabor local y presentación premium.',
    price: 15,
    oldPrice: 17,
    rating: 4.7,
    tag: 'Premium',
    images: [
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Pato', 'Fondo de ave', 'Especias', 'Pimiento tatemado', 'Huevos de codorniz', 'Orégano', 'Flores comestibles', 'Arroz', 'Ajo', 'Achote'],
    features: ['Piel dorada', 'Arroz meloso', 'Presentación elegante'],
  },
  {
    id: 9,
    name: 'Lomo de Cerdo Agridulce',
    category: 'Platos fuertes',
    description:
      'Medallones de lomo de cerdo grillados con reducción agridulce de mortiño, puré de zanahoria blanca y decoración gourmet.',
    difference: 'Fusiona proteína grillada con frutos locales para un sabor dulce, ácido y profundo.',
    price: 9,
    oldPrice: 10.5,
    rating: 4.6,
    tag: 'Creativo',
    images: [
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Lomo de cerdo', 'Mortiño', 'Zanahoria blanca', 'Crema de leche', 'Mantequilla', 'Ajo', 'Vino tinto', 'Panela', 'Vinagre de manzana', 'Caldo de carne'],
    features: ['Salsa de mortiño', 'Toque gourmet', 'Buen balance de sabores'],
  },
  {
    id: 10,
    name: 'Lomo Saltado de la Villa',
    category: 'Platos fuertes',
    description:
      'Lomo de res salteado en paila de cobre con cebollas moradas, pimientos, tomates y ají de la zona. Servido con arroz y papas.',
    difference: 'Versión de la casa con técnica de salteado intenso y acompañamiento clásico.',
    price: 12,
    oldPrice: 14,
    rating: 4.8,
    tag: 'De la casa',
    images: [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Lomo de res', 'Cebollas moradas', 'Pimientos', 'Tomates', 'Ají', 'Arroz blanco', 'Papas', 'Vino tinto', 'Perejil', 'Orégano'],
    features: ['Salteado al momento', 'Porción completa', 'Sabor intenso'],
  },
];

const values = [
  ['Disciplina', 'Seguridad, orden y excelencia en cada proceso del restaurante.'],
  ['Liderazgo', 'Mantener una visión clara para ser un referente gastronómico local.'],
  ['Integridad', 'Actuar con ética en cada operación, decisión y servicio.'],
  ['Armonía', 'Crear una experiencia cálida desde la llegada hasta el último bocado.'],
  ['Felicidad', 'Un equipo feliz transmite una experiencia memorable al cliente.'],
  ['Pasión', 'Trabajar con entusiasmo y propósito en cada plato.'],
  ['Centrado en el cliente', 'Adaptarnos a las necesidades y expectativas de cada comensal.'],
];

const org = [
  ['Gerente', ['Administrador', 'Alimentos y bebidas', 'Servicio de limpieza', 'Seguridad']],
  ['Administrador', ['Contador', 'Community Manager']],
  ['Alimentos y bebidas', ['Chef ejecutivo', 'Jefe de cocina', 'Cocinero en línea', 'Pastelero', 'Panadero', 'Steward/Lavaplatos', 'Almacenista', 'Jefe de sala y maître', 'Recepcionista', 'Cajero', 'Barman', 'Mesero', 'Repartidor']],
  ['Servicio de limpieza', ['Personal de limpieza']],
  ['Seguridad', ['Guardia']],
];

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = ['Todos', ...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category;
      const text = `${product.name} ${product.description} ${product.ingredients.join(' ')}`.toLowerCase();
      return matchesCategory && text.includes(normalized);
    });
  }, [query, category]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const sendOrder = () => {
    const details = cart
      .map((item) => `• ${item.name} x${item.quantity} = ${formatMoney(item.price * item.quantity)}`)
      .join('%0A');
    const message = `Hola Villa Laguna, deseo hacer este pedido:%0A%0A${details}%0A%0ATotal: ${formatMoney(cartTotal)}%0A%0AMe ayudan con más información, por favor.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="app">
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main>
        <section id="inicio" className="hero section-pad">
          <div className="hero-bg" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="logo-frame">
              <img src={logoUrl} alt="Villa Laguna Restaurante" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <div className="logo-fallback">Villa Laguna</div>
            </div>
            <p className="eyebrow">Restaurante • Cajabamba</p>
            <h1>Sabores tradicionales con alma de laguna</h1>
            <p className="hero-copy">
              Experiencias gastronómicas auténticas, ingredientes locales de alta calidad y un ambiente acogedor inspirado en la riqueza natural de Cajabamba.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#tienda">Ver tienda virtual</a>
              <a className="btn ghost" href={mapsUrl} target="_blank" rel="noreferrer">Cómo llegar</a>
            </div>
          </motion.div>
        </section>

        <section id="nosotros" className="section-pad about-section">
          <div className="section-title">
            <p className="eyebrow">Nuestra esencia</p>
            <h2>Villa Laguna nace para unir paisaje, tradición y hospitalidad</h2>
            <p>
              El nombre representa la calidez de una villa y la frescura de la laguna, creando una experiencia culinaria con identidad local, armonía y compromiso sostenible.
            </p>
          </div>

          <div className="cards three">
            <InfoCard icon={<Target />} title="Misión" text="Ofrecer experiencias gastronómicas auténticas y memorables con ingredientes locales de alta calidad, servicio cálido y un ambiente acogedor." />
            <InfoCard icon={<Eye />} title="Visión" text="Ser reconocidos para 2030 como restaurante líder en Cajabamba por nuestra comida tradicional, innovación y sostenibilidad." />
            <InfoCard icon={<Heart />} title="Frase" text="La felicidad es el ingrediente secreto de una experiencia memorable." />
          </div>
        </section>

        <section className="section-pad values-section">
          <div className="split">
            <div>
              <p className="eyebrow">Cultura corporativa</p>
              <h2>Valores que se sienten en cada plato</h2>
              <p>
                Cada valor guía el servicio, la cocina y la relación con nuestros clientes para construir una marca confiable y memorable.
              </p>
            </div>
            <div className="values-grid">
              {values.map(([title, text], index) => (
                <motion.div className="value-pill" key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <Gem size={18} />
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad objectives">
          <div className="section-title compact">
            <p className="eyebrow">Objetivos</p>
            <h2>Metas claras para crecer con calidad</h2>
          </div>
          <div className="cards three">
            <InfoCard icon={<Award />} title="Rentabilidad" text="Alcanzar un margen de utilidad neta del 20% al cierre del primer año y retorno de inversión en 24 meses." />
            <InfoCard icon={<Clock />} title="Servicio eficiente" text="Estandarizar procesos con fichas técnicas y manuales para entregar platos en menos de 15 minutos." />
            <InfoCard icon={<Star />} title="Calidad digital" text="Mantener costos controlados y lograr una calificación promedio de 4.6/5 en plataformas digitales." />
          </div>
        </section>

        <section className="section-pad organigram">
          <div className="section-title compact">
            <p className="eyebrow">Organización</p>
            <h2>Organigrama empresarial</h2>
          </div>
          <div className="org-chart">
            <div className="org-main"><Users size={18} /> Gerente</div>
            <div className="org-grid">
              {org.slice(1).map(([area, roles]) => (
                <div className="org-column" key={area}>
                  <h3>{area}</h3>
                  {roles.map((role) => <span key={role}>{role}</span>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ubicacion" className="section-pad experience-section">
          <div className="split align-center">
            <div>
              <p className="eyebrow">Visítanos</p>
              <h2>Ubicación, contacto y experiencia visual</h2>
              <p>Cajabamba – Ecuador. Un espacio pensado para disfrutar comida tradicional, paisajes naturales y atención cercana.</p>
              <div className="contact-list">
                <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin /> Ver ubicación en Google Maps</a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Phone /> Pedidos por WhatsApp</a>
              </div>
            </div>
            <div className="media-card">
              <div className="video-placeholder">
                <PlayCircle size={64} />
                <h3>Video interactivo del restaurante</h3>
                <p>Espacio listo para colocar un video real o fotografías de Villa Laguna.</p>
              </div>
            </div>
          </div>
          <div className="reviews">
            {['Sabor tradicional con presentación elegante.', 'Excelente atención y platos abundantes.', 'Un lugar perfecto para comer con vista natural.'].map((review) => (
              <div className="review" key={review}>
                <div>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p>{review}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="tienda" className="section-pad shop-section">
          <div className="section-title">
            <p className="eyebrow">Tienda virtual</p>
            <h2>Elige tus platos favoritos y arma tu pedido</h2>
            <p>Busca por nombre, ingrediente o categoría. Cada producto incluye descripción, ingredientes, precio, descuento y reputación.</p>
          </div>

          <div className="shop-tools">
            <label className="search-box">
              <Search size={18} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto, ingrediente o plato..." />
            </label>
            <div className="filters">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} onDetails={setSelectedProduct} />
            ))}
          </div>
        </section>
      </main>

      <button className="floating-cart" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">
        <ShoppingCart />
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} changeQuantity={changeQuantity} total={cartTotal} sendOrder={sendOrder} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
    </div>
  );
}

function Header({ cartCount, onCart, mobileOpen, setMobileOpen }) {
  const links = [
    ['Inicio', '#inicio'],
    ['Nosotros', '#nosotros'],
    ['Ubicación', '#ubicacion'],
    ['Tienda', '#tienda'],
  ];

  return (
    <header className="header">
      <a className="brand" href="#inicio">
        <img src={logoUrl} alt="Villa Laguna" onError={(e) => (e.currentTarget.style.display = 'none')} />
        <span>Villa Laguna</span>
      </a>
      <nav className={mobileOpen ? 'open' : ''}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="cart-btn" onClick={onCart}><ShoppingCart size={20} /> <span>{cartCount}</span></button>
        <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button>
      </div>
    </header>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <motion.article className="info-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}

function ProductCard({ product, onAdd, onDetails }) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <motion.article className="product-card" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} />
        <span className="badge">-{discount}%</span>
        <span className="tag">{product.tag}</span>
      </div>
      <div className="product-body">
        <div className="rating"><Star size={16} fill="currentColor" /> {product.rating}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>{formatMoney(product.price)}</strong>
          <span>{formatMoney(product.oldPrice)}</span>
        </div>
        <div className="product-actions">
          <button onClick={() => onDetails(product)}>Ver detalles</button>
          <button className="add" onClick={() => onAdd(product)}><Plus size={18} /> Agregar</button>
        </div>
      </div>
    </motion.article>
  );
}

function CartDrawer({ open, setOpen, cart, changeQuantity, total, sendOrder }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26, stiffness: 220 }}>
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Tu pedido</p>
                <h2>Carrito</h2>
              </div>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={52} />
                <h3>Tu carrito está vacío</h3>
                <p>Agrega platos desde la tienda virtual.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.images[0]} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <span>{formatMoney(item.price)}</span>
                        <div className="qty">
                          <button onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button>
                          <b>{item.quantity}</b>
                          <button onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div><span>Total</span><strong>{formatMoney(total)}</strong></div>
                  <button className="btn primary full" onClick={sendOrder}><Send size={18} /> Enviar pedido por WhatsApp</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="modal" initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 24 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <div className="modal-images">
              {product.images.map((image, index) => <img key={image} src={image} alt={`${product.name} ${index + 1}`} />)}
            </div>
            <div className="modal-body">
              <p className="eyebrow">{product.category}</p>
              <h2>{product.name}</h2>
              <div className="rating"><Star size={16} fill="currentColor" /> {product.rating} de reputación</div>
              <p>{product.description}</p>
              <p><strong>¿Por qué se diferencia?</strong> {product.difference}</p>
              <h3>Características</h3>
              <div className="feature-list">{product.features.map((item) => <span key={item}><Leaf size={14} /> {item}</span>)}</div>
              <h3>Ingredientes</h3>
              <div className="ingredients">{product.ingredients.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="price-row large"><strong>{formatMoney(product.price)}</strong><span>{formatMoney(product.oldPrice)}</span></div>
              <button className="btn primary full" onClick={() => onAdd(product)}><Plus size={18} /> Agregar al carrito</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default App;
