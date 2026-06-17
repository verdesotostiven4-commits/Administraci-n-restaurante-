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
  Leaf,
  Clock,
  Award,
  Users,
  Heart,
  Send,
  PlayCircle,
  Menu,
  Target,
  Eye,
  Gem,
  Sparkles,
  ChefHat,
  Navigation,
  MessageCircle,
} from 'lucide-react';

const brand = {
  full: 'https://blogger.googleusercontent.com/img/a/AVvXsEjdp5iDroYSocGlCDL9cboxWc_8JtG-KoPtdsVrzv-yafIKVE86OZyAv0hiPV7isOhJNkhGGR58uaLCSNcqt5BVX5cqLtnBvQ2VzkG1TmrnRmReFuoTyAWnXvM_xJ0pe-8qTUHiOcD422V1foflebe1m8wYkJ67_C5iwN-iZvR6a9mw-860VESVuCHEwo4',
  icon: 'https://blogger.googleusercontent.com/img/a/AVvXsEhDw-0oBlrpawZHRqqBTzVEh16xmnQ_AX80O2acX0vnAckJqNRzmGunCxOGqwcbri5Dslhr4c3DSbSb7YvwxB6jzs3TGYWLqk7yixz_wE1j_f36TesK9eefXVXgCrzZ7eRD4rgytl6VjIRyTW62tepO8xKA6P3jvK1EoFUdfUhVeyUFHSnvK0Op08-Ml9c',
  word: 'https://blogger.googleusercontent.com/img/a/AVvXsEgDmbv-06787hDQr6hl00cYCrYogOfuzZ-S8BHYA1JTSARbt7m6S1N7D08zVyi5Y-NU4y6LNsDD5UhEjnPE4ZDoAYku7Es00PYf9ps6TB_4dUDHoo4oaxO5FI8x3jkqE38_0--e1G_Kk2NbGdTTlsKBFxa2ogP-_dVy080z7pxDx5jqEinJeCZs-BuEBag',
  horizontal: 'https://blogger.googleusercontent.com/img/a/AVvXsEg6759--HKCrx3xOaYthRW4dFBWKz35Nfp6CwGdbJ0pXbWz4qdQfnN8C9K0fa0veXINlhG7uM2ro4w3qA4mZ48cHNPOZQ1pOvtEIirKQU3FoKe9d40G3isa79shCQ-C5KtiG8fVqCdLC2FCp6Tw4KcjpYUqErm0MNi8S9KrlKIcQFjFwxCUIYzpcC4V2aE',
};

const whatsappNumber = '593999999999';
const mapsUrl = 'https://maps.app.goo.gl/2YEMvyfpp8Y15Euk9';

const products = [
  {
    id: 1,
    name: 'Cheesecake de Maracuyá',
    category: 'Postres',
    description: 'Tarta de queso cremosa sobre base de galleta, bañada con salsa artesanal de maracuyá.',
    difference: 'Se diferencia por su equilibrio entre dulzor, cremosidad y acidez tropical.',
    price: 4.99,
    oldPrice: 5.75,
    rating: 4.8,
    tag: 'Cítrico',
    images: [
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Galletas María', 'Mantequilla', 'Crema de leche', 'Leche condensada', 'Queso crema', 'Pulpa de maracuyá', 'Gelatina', 'Mermelada de maracuyá'],
    features: ['Textura cremosa', 'Salsa artesanal', 'Fruta tropical'],
  },
  {
    id: 2,
    name: 'Higos con Queso',
    category: 'Postres',
    description: 'Higos tiernos cocinados en almíbar de panela, canela y clavo, servidos con queso fresco.',
    difference: 'Un clásico ecuatoriano con contraste perfecto entre dulce tradicional y queso local.',
    price: 6,
    oldPrice: 6.8,
    rating: 4.7,
    tag: 'Tradicional',
    images: [
      'https://images.unsplash.com/photo-1601000938259-9e92002320e0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541782814459-453b99a7fae4?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Higos', 'Bicarbonato', 'Panela', 'Agua', 'Queso fresco', 'Canela', 'Clavo de olor', 'Pimienta dulce'],
    features: ['Receta local', 'Almíbar artesanal', 'Queso fresco'],
  },
  {
    id: 3,
    name: 'Torta Tres Leches',
    category: 'Postres',
    description: 'Bizcocho de vainilla bañado con tres leches, cubierto con merengue y canela.',
    difference: 'Su humedad perfecta y cobertura suave la convierten en uno de los postres favoritos.',
    price: 3.85,
    oldPrice: 4.5,
    rating: 4.9,
    tag: 'Más pedido',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Huevo', 'Azúcar', 'Harina de trigo', 'Vainilla', 'Tres leches', 'Jugo de limón', 'Canela', 'Frutillas'],
    features: ['Bizcocho húmedo', 'Cobertura ligera', 'Sabor familiar'],
  },
  {
    id: 4,
    name: 'Chicharrón Andino',
    category: 'Entradas',
    description: 'Chicharrón de cerdo crocante con papas, ensalada fresca y ají artesanal molido en piedra.',
    difference: 'Su ají artesanal y hierbas locales le dan un carácter profundamente andino.',
    price: 5,
    oldPrice: 5.9,
    rating: 4.8,
    tag: 'Crocante',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Carne de cerdo', 'Ajo', 'Cebolla blanca', 'Comino', 'Ají fresco', 'Tomate de árbol', 'Lechuga', 'Cilantro', 'Hierbas locales'],
    features: ['Piel crocante', 'Ají artesanal', 'Entrada contundente'],
  },
  {
    id: 5,
    name: 'Empanadas de Queso',
    category: 'Entradas',
    description: 'Empanadas de masa crocante rellenas de queso local fundido de Cajabamba.',
    difference: 'Una entrada cálida, económica y perfecta para abrir el apetito con sabor local.',
    price: 2.7,
    oldPrice: 3.25,
    rating: 4.6,
    tag: 'Familiar',
    images: [
      'https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Discos de empanada', 'Queso ecuatoriano', 'Huevos', 'Agua', 'Aceite vegetal', 'Azúcar'],
    features: ['Masa crocante', 'Queso fundido', 'Ideal para compartir'],
  },
  {
    id: 6,
    name: 'Seco de Chivo Tradicional de la Sierra',
    category: 'Platos fuertes',
    description: 'Trozos de chivo estofados lentamente con chicha de jora, cerveza y especias de la casa.',
    difference: 'Un plato andino de cocción lenta, aroma profundo y sabor tradicional de la Sierra.',
    price: 13,
    oldPrice: 15,
    rating: 4.9,
    tag: 'Especialidad',
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Chivo', 'Chicha de jora', 'Cerveza', 'Especias', 'Arroz amarillo', 'Plátano', 'Orégano', 'Achote', 'Cilantro'],
    features: ['Cocción lenta', 'Sabor tradicional', 'Plato completo'],
  },
  {
    id: 7,
    name: 'Cuy Asado al Horno de Leña',
    category: 'Platos fuertes',
    description: 'Cuy marinado en hierbas locales y asado en horno de leña hasta lograr piel crujiente.',
    difference: 'Representa la cocina tradicional andina con técnica de horno de leña.',
    price: 16.5,
    oldPrice: 18.5,
    rating: 4.8,
    tag: 'Andino',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Cuy', 'Orégano', 'Papas cocidas', 'Mote', 'Tostado', 'Salsa de maní', 'Lechuga', 'Cebolla colorada', 'Ajo'],
    features: ['Horno de leña', 'Piel crujiente', 'Acompañamiento tradicional'],
  },
  {
    id: 8,
    name: 'Arroz con Pato al Horno',
    category: 'Platos fuertes',
    description: 'Pato dorado sobre arroz meloso preparado con fondo concentrado y especias de la zona.',
    difference: 'Une técnica, sabor local y presentación premium en un plato elegante.',
    price: 15,
    oldPrice: 17,
    rating: 4.7,
    tag: 'Premium',
    images: [
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Pato', 'Fondo de ave', 'Especias', 'Pimiento tatemado', 'Huevos de codorniz', 'Orégano', 'Flores comestibles', 'Arroz', 'Ajo'],
    features: ['Piel dorada', 'Arroz meloso', 'Presentación elegante'],
  },
  {
    id: 9,
    name: 'Lomo de Cerdo Agridulce',
    category: 'Platos fuertes',
    description: 'Medallones de cerdo grillados con reducción agridulce de mortiño y puré de zanahoria blanca.',
    difference: 'Fusiona proteína grillada con frutos locales para un sabor dulce, ácido y profundo.',
    price: 9,
    oldPrice: 10.5,
    rating: 4.6,
    tag: 'Creativo',
    images: [
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Lomo de cerdo', 'Mortiño', 'Zanahoria blanca', 'Crema de leche', 'Mantequilla', 'Ajo', 'Vino tinto', 'Panela', 'Vinagre'],
    features: ['Salsa de mortiño', 'Toque gourmet', 'Balance de sabores'],
  },
  {
    id: 10,
    name: 'Lomo Saltado de la Villa',
    category: 'Platos fuertes',
    description: 'Lomo de res salteado en paila con cebollas moradas, pimientos, tomates y ají de la zona.',
    difference: 'Versión de la casa con técnica de salteado intenso y acompañamiento clásico.',
    price: 12,
    oldPrice: 14,
    rating: 4.8,
    tag: 'De la casa',
    images: [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    ],
    ingredients: ['Lomo de res', 'Cebolla morada', 'Pimientos', 'Tomates', 'Ají', 'Arroz blanco', 'Papas', 'Vino tinto', 'Perejil'],
    features: ['Salteado al momento', 'Porción completa', 'Sabor intenso'],
  },
];

const values = [
  ['Disciplina', 'Orden, precisión y seguridad alimentaria en cada proceso.'],
  ['Liderazgo', 'Una visión clara para ser referente gastronómico en Cajabamba.'],
  ['Integridad', 'Ética y transparencia en el servicio, cocina y administración.'],
  ['Armonía', 'Un ambiente cálido desde la llegada hasta el último bocado.'],
  ['Felicidad', 'La alegría del equipo se transforma en experiencia memorable.'],
  ['Pasión', 'Cocinar con entusiasmo, identidad local y propósito.'],
  ['Centrado en el cliente', 'Escuchar, adaptarnos y superar expectativas.'],
];

const orgDepartments = [
  { title: 'Administrador', roles: ['Contador', 'Community Manager'] },
  { title: 'Alimentos y bebidas', roles: ['Chef ejecutivo', 'Jefe de cocina', 'Cocinero en línea', 'Pastelero', 'Panadero', 'Ayudante de cocina', 'Steward / Lavaplatos', 'Almacenista', 'Jefe de sala y Maître', 'Recepcionista', 'Cajero', 'Barman', 'Mesero', 'Repartidor'] },
  { title: 'Servicio de limpieza', roles: ['Personal de limpieza'] },
  { title: 'Seguridad', roles: ['Guardia'] },
];

const money = (value) => `$${value.toFixed(2)}`;

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ['Todos', ...new Set(products.map((p) => p.category))];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const haystack = `${p.name} ${p.category} ${p.description} ${p.ingredients.join(' ')}`.toLowerCase();
      return (category === 'Todos' || p.category === category) && haystack.includes(q);
    });
  }, [query, category]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id, amount) => {
    setCart((current) => current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item)).filter((item) => item.quantity > 0));
  };

  const sendOrder = () => {
    const order = cart.map((item) => `• ${item.name} x${item.quantity} = ${money(item.price * item.quantity)}`).join('%0A');
    window.open(`https://wa.me/${whatsappNumber}?text=Hola Villa Laguna, deseo hacer este pedido:%0A%0A${order}%0A%0ATotal: ${money(cartTotal)}`, '_blank');
  };

  return (
    <div className="site-shell">
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <BrandStrip />
      <About />
      <Values />
      <Objectives />
      <Organigram />
      <Location />
      <Shop
        products={filtered}
        categories={categories}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
        addToCart={addToCart}
        setSelectedProduct={setSelectedProduct}
      />
      <Footer />

      <button className="floating-cart" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">
        <ShoppingCart />
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} changeQuantity={changeQuantity} total={cartTotal} sendOrder={sendOrder} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
    </div>
  );
}

function Header({ cartCount, onCart, menuOpen, setMenuOpen }) {
  const links = [['Inicio', '#inicio'], ['Nosotros', '#nosotros'], ['Ubicación', '#ubicacion'], ['Tienda', '#tienda']];
  return (
    <header className="main-header">
      <a href="#inicio" className="brand-mark">
        <img src={brand.horizontal} alt="Villa Laguna Restaurante" />
      </a>
      <nav className={menuOpen ? 'is-open' : ''}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="header-cart" onClick={onCart}><ShoppingCart size={19} /><span>{cartCount}</span></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-pro">
      <div className="hero-media" />
      <motion.div className="hero-panel" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
        <img className="hero-logo" src={brand.full} alt="Villa Laguna Restaurante" />
        <p className="micro-label"><Sparkles size={15} /> Restaurante • Cajabamba</p>
        <h1>Sabores tradicionales con alma de laguna</h1>
        <p>Comida tradicional, ingredientes locales y una experiencia cálida inspirada en la serenidad natural de Cajabamba.</p>
        <div className="hero-buttons">
          <a href="#tienda" className="btn btn-gold"><ShoppingCart size={18} /> Ver tienda</a>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-glass"><Navigation size={18} /> Cómo llegar</a>
        </div>
      </motion.div>
      <div className="hero-card-stack">
        <div><ChefHat /><strong>Cocina local</strong><span>Recetas de la Sierra con identidad propia.</span></div>
        <div><Leaf /><strong>Ingredientes frescos</strong><span>Productos de la zona y preparación cuidadosa.</span></div>
        <div><Heart /><strong>Servicio cálido</strong><span>Una experiencia pensada para recordar.</span></div>
      </div>
    </section>
  );
}

function BrandStrip() {
  return (
    <section className="brand-strip">
      <span>Tradición</span><i />
      <span>Laguna</span><i />
      <span>Cajabamba</span><i />
      <span>Hospitalidad</span>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="section about-premium">
      <div className="section-heading center">
        <img src={brand.icon} alt="Símbolo Villa Laguna" />
        <p className="eyebrow">Nuestra esencia</p>
        <h2>Una villa gastronómica entre paisaje, tradición y calidez</h2>
        <p>El nombre Villa Laguna fusiona hospitalidad, frescura natural y orgullo culinario. Nuestra propuesta celebra los sabores locales con una presentación moderna y un ambiente acogedor.</p>
      </div>
      <div className="manifest-grid">
        <InfoCard icon={<Target />} title="Misión" text="Ofrecer experiencias gastronómicas auténticas y memorables con ingredientes locales de alta calidad, servicio cálido y ambiente acogedor." />
        <InfoCard icon={<Eye />} title="Visión" text="Ser reconocidos para 2030 como restaurante líder en Cajabamba por nuestra comida tradicional, innovación y sostenibilidad." />
        <InfoCard icon={<Heart />} title="Frase" text="La felicidad es el ingrediente secreto de una experiencia memorable." />
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section values-premium">
      <div className="split-layout">
        <div className="sticky-copy">
          <p className="eyebrow">Cultura corporativa</p>
          <h2>Valores que se sienten en cada detalle</h2>
          <p>La marca se sostiene en disciplina, pasión y servicio. Cada valor se transforma en una experiencia visible para el cliente.</p>
        </div>
        <div className="value-list">
          {values.map(([title, text], index) => (
            <motion.article key={title} className="value-row" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.035 }}>
              <Gem size={19} />
              <div><strong>{title}</strong><span>{text}</span></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <section className="section objectives-premium">
      <div className="section-heading center compact">
        <p className="eyebrow">Objetivos</p>
        <h2>Metas claras para crecer con calidad</h2>
      </div>
      <div className="manifest-grid">
        <InfoCard icon={<Award />} title="Rentabilidad" text="Alcanzar un margen de utilidad neta del 20% al cierre del primer año y retorno de inversión dentro de 24 meses." />
        <InfoCard icon={<Clock />} title="Servicio eficiente" text="Estandarizar procesos con fichas técnicas y manuales para entregar platos en menos de 15 minutos." />
        <InfoCard icon={<Star />} title="Calidad digital" text="Mantener costos controlados y lograr una calificación promedio de 4.6/5 en plataformas digitales." />
      </div>
    </section>
  );
}

function Organigram() {
  return (
    <section className="section org-section">
      <div className="section-heading center compact">
        <p className="eyebrow">Organización</p>
        <h2>Organigrama empresarial</h2>
        <p>Rediseñado con la estructura del restaurante y una estética coherente con Villa Laguna.</p>
      </div>
      <div className="org-board">
        <div className="org-top"><Users size={19} /> Gerente</div>
        <div className="org-line" />
        <div className="org-departments">
          {orgDepartments.map((dept) => (
            <article className="org-dept" key={dept.title}>
              <h3>{dept.title}</h3>
              <div className="role-list">
                {dept.roles.map((role) => <span key={role}>{role}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="ubicacion" className="section location-section">
      <div className="location-grid">
        <div>
          <p className="eyebrow">Visítanos</p>
          <h2>Ubicación, contacto y experiencia visual</h2>
          <p>Cajabamba – Ecuador. Un espacio pensado para disfrutar comida tradicional, paisajes naturales y atención cercana.</p>
          <div className="contact-actions">
            <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin /> Ver ubicación en Google Maps</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Phone /> Pedidos por WhatsApp</a>
          </div>
        </div>
        <div className="video-card">
          <PlayCircle size={66} />
          <h3>Video interactivo del restaurante</h3>
          <p>Espacio listo para agregar video real, recorrido o fotografías del local.</p>
        </div>
      </div>
      <div className="review-strip">
        {['Sabor tradicional con presentación elegante.', 'Excelente atención y platos abundantes.', 'Perfecto para comer con vista natural.'].map((review) => (
          <article key={review}><span>★★★★★</span><p>{review}</p></article>
        ))}
      </div>
    </section>
  );
}

function Shop({ products, categories, category, setCategory, query, setQuery, addToCart, setSelectedProduct }) {
  return (
    <section id="tienda" className="section shop-premium">
      <div className="section-heading center compact">
        <p className="eyebrow">Tienda virtual</p>
        <h2>Elige tus platos favoritos y arma tu pedido</h2>
        <p>Busca productos, revisa ingredientes, precios, descuentos y calificaciones antes de agregarlos al carrito.</p>
      </div>
      <div className="shop-tools">
        <label className="search-box"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto, ingrediente o plato..." /></label>
        <div className="filters">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onDetails={setSelectedProduct} />)}</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-pro">
      <img src={brand.horizontal} alt="Villa Laguna" />
      <p>Villa Laguna Restaurante • Cajabamba, Ecuador</p>
      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pedir por WhatsApp</a>
    </footer>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <motion.article className="info-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="info-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}

function ProductCard({ product, onAdd, onDetails }) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <motion.article className="product-card" whileHover={{ y: -8 }}>
      <div className="product-photo">
        <img src={product.images[0]} alt={product.name} />
        <span className="discount">-{discount}%</span>
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-content">
        <div className="rating"><Star size={16} fill="currentColor" /> {product.rating}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-line"><strong>{money(product.price)}</strong><span>{money(product.oldPrice)}</span></div>
        <div className="product-actions"><button onClick={() => onDetails(product)}>Ver detalles</button><button className="add" onClick={() => onAdd(product)}><Plus size={18} /> Agregar</button></div>
      </div>
    </motion.article>
  );
}

function CartDrawer({ open, setOpen, cart, changeQuantity, total, sendOrder }) {
  return (
    <AnimatePresence>
      {open && <>
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
        <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28 }}>
          <div className="drawer-head"><div><p className="eyebrow">Tu pedido</p><h2>Carrito</h2></div><button onClick={() => setOpen(false)}><X /></button></div>
          {cart.length === 0 ? <div className="empty-cart"><ShoppingCart size={54} /><h3>Tu carrito está vacío</h3><p>Agrega platos desde la tienda virtual.</p></div> : <>
            <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.images[0]} alt={item.name} /><div><h4>{item.name}</h4><span>{money(item.price)}</span><div className="qty"><button onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><b>{item.quantity}</b><button onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div></div>)}</div>
            <div className="cart-footer"><div><span>Total</span><strong>{money(total)}</strong></div><button className="btn btn-gold full" onClick={sendOrder}><Send size={18} /> Enviar pedido por WhatsApp</button></div>
          </>}
        </motion.aside>
      </>}
    </AnimatePresence>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {product && <>
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div className="modal" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }}>
          <button className="modal-close" onClick={onClose}><X /></button>
          <div className="modal-gallery">{product.images.map((img, i) => <img key={img} src={img} alt={`${product.name} ${i + 1}`} />)}</div>
          <div className="modal-body"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="rating"><Star size={16} fill="currentColor" /> {product.rating} de reputación</div><p>{product.description}</p><p><strong>¿Por qué se diferencia?</strong> {product.difference}</p><h3>Características</h3><div className="chips">{product.features.map((f) => <span key={f}><Leaf size={14} /> {f}</span>)}</div><h3>Ingredientes</h3><div className="chips muted">{product.ingredients.map((ing) => <span key={ing}>{ing}</span>)}</div><div className="price-line big"><strong>{money(product.price)}</strong><span>{money(product.oldPrice)}</span></div><button className="btn btn-gold full" onClick={() => onAdd(product)}><Plus size={18} /> Agregar al carrito</button></div>
        </motion.div>
      </>}
    </AnimatePresence>
  );
}
