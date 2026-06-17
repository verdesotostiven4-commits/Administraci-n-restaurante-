import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, ShoppingCart, Search, Star, Plus, Minus, X, Leaf, Clock, Award, Heart, Send, PlayCircle, Menu, Target, Eye, Gem, Sparkles, ChefHat, Navigation, MessageCircle } from 'lucide-react';
import './styles.css';

const brand = {
  full: 'https://blogger.googleusercontent.com/img/a/AVvXsEgZakzPPpdXiP8lGx-ZT4azhtgPx9tOML4GB45Yc5q-OiuWdkVFxK8lA0gv1eqSSei2weOqr4OpYqwuzmrAYouBkK4MWgXPN_SI7Il3BumyjHI3NzmJyyoAYLYuTzO9ZkvaraaIZaN8TK5TxE2s9rDkEmAHXeVM-PtuSGSsPHpnNmHOj7rcOen43SOOIfE',
  icon: 'https://blogger.googleusercontent.com/img/a/AVvXsEhDw-0oBlrpawZHRqqBTzVEh16xmnQ_AX80O2acX0vnAckJqNRzmGunCxOGqwcbri5Dslhr4c3DSbSb7YvwxB6jzs3TGYWLqk7yixz_wE1j_f36TesK9eefXVXgCrzZ7eRD4rgytl6VjIRyTW62tepO8xKA6P3jvK1EoFUdfUhVeyUFHSnvK0Op08-Ml9c',
  horizontal: 'https://blogger.googleusercontent.com/img/a/AVvXsEg6759--HKCrx3xOaYthRW4dFBWKz35Nfp6CwGdbJ0pXbWz4qdQfnN8C9K0fa0veXINlhG7uM2ro4w3qA4mZ48cHNPOZQ1pOvtEIirKQU3FoKe9d40G3isa79shCQ-C5KtiG8fVqCdLC2FCp6Tw4KcjpYUqErm0MNi8S9KrlKIcQFjFwxCUIYzpcC4V2aE',
};

const heroBackground = 'https://blogger.googleusercontent.com/img/a/AVvXsEioL5ITOpJTxzGC6Go7Jhn6kPCRp1adkZ9wv2ST12waGKqeA7MfzZnelXhTEtfa6QESmniagY85kAbrDDqb-ANTz2PLySZNG35ljd30yPRzhAlF6ydbl_ujtxtXK69AczZK2lBTIyztfJaKFBrrIvQnP2EcN2r7ZqrqsrpfU8i9cXvI_o_lCpTI_SMnpu0';
const orgChartImage = 'https://blogger.googleusercontent.com/img/a/AVvXsEiMPwjxuARp9UecjMAqLUTv0q8hEIN01E3ax1jHu-QUac1Mg8voNYa-0sled9cU4jfJBPYvQxssLE66L7eOwyl5tfr279dc_2v6ase9estz0OgZmWjmJuwl0xdSbAG1Za45Uu-RgduuvtZS-jXuXxAs4EQE7dXahf5KL-42KoMq_dId5g3diVGJ5-W0UHQ';
const whatsappNumber = '593999999999';
const mapsUrl = 'https://maps.app.goo.gl/2YEMvyfpp8Y15Euk9';

const products = [
  ['Cheesecake de Maracuyá', 'Postres', 4.99, 5.75, 4.8, 'Cítrico', 'Tarta de queso cremosa con salsa artesanal de maracuyá.', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80'],
  ['Higos con Queso', 'Postres', 6, 6.8, 4.7, 'Tradicional', 'Higos en almíbar de panela, canela y clavo con queso fresco.', 'https://images.unsplash.com/photo-1541782814459-453b99a7fae4?auto=format&fit=crop&w=900&q=80'],
  ['Torta Tres Leches', 'Postres', 3.85, 4.5, 4.9, 'Más pedido', 'Bizcocho húmedo de vainilla bañado con tres leches.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80'],
  ['Chicharrón Andino', 'Entradas', 5, 5.9, 4.8, 'Crocante', 'Cerdo crocante con papas, ensalada fresca y ají artesanal.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'],
  ['Empanadas de Queso', 'Entradas', 2.7, 3.25, 4.6, 'Familiar', 'Masa crocante rellena de queso local fundido de Cajabamba.', 'https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?auto=format&fit=crop&w=900&q=80'],
  ['Seco de Chivo Tradicional de la Sierra', 'Platos fuertes', 13, 15, 4.9, 'Especialidad', 'Chivo estofado lentamente con chicha de jora y especias.', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'],
  ['Cuy Asado al Horno de Leña', 'Platos fuertes', 16.5, 18.5, 4.8, 'Andino', 'Cuy marinado en hierbas locales y asado en horno de leña.', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80'],
  ['Arroz con Pato al Horno', 'Platos fuertes', 15, 17, 4.7, 'Premium', 'Pato dorado sobre arroz meloso con especias de la zona.', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'],
  ['Lomo de Cerdo Agridulce', 'Platos fuertes', 9, 10.5, 4.6, 'Creativo', 'Medallones de cerdo con reducción agridulce de mortiño.', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80'],
  ['Lomo Saltado de la Villa', 'Platos fuertes', 12, 14, 4.8, 'De la casa', 'Lomo de res salteado con cebolla, pimientos, tomate y ají.', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80'],
].map(([name, category, price, oldPrice, rating, tag, description, image], index) => ({
  id: index + 1,
  name, category, price, oldPrice, rating, tag, description,
  difference: 'Se diferencia por su preparación cuidadosa, sabor local y presentación cálida de la casa.',
  images: [image, image],
  ingredients: ['Ingredientes locales', 'Especias de la casa', 'Preparación artesanal', 'Toque Villa Laguna'],
  features: ['Receta de la casa', 'Sabor tradicional', 'Presentación cuidada'],
}));

const values = [
  ['Disciplina', 'Orden, precisión y seguridad alimentaria en cada proceso.'],
  ['Liderazgo', 'Visión clara para ser referente gastronómico en Cajabamba.'],
  ['Integridad', 'Ética y transparencia en el servicio, cocina y administración.'],
  ['Armonía', 'Ambiente cálido desde la llegada hasta el último bocado.'],
  ['Felicidad', 'La alegría del equipo se transforma en experiencia memorable.'],
  ['Pasión', 'Cocinar con entusiasmo, identidad local y propósito.'],
  ['Centrado en el cliente', 'Escuchar, adaptarnos y superar expectativas.'],
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
    return products.filter((p) => (category === 'Todos' || p.category === category) && `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q));
  }, [query, category]);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const changeQuantity = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const sendOrder = () => {
    const order = cart.map((item) => `• ${item.name} x${item.quantity} = ${money(item.price * item.quantity)}`).join('%0A');
    window.open(`https://wa.me/${whatsappNumber}?text=Hola Villa Laguna, deseo hacer este pedido:%0A%0A${order}%0A%0ATotal: ${money(cartTotal)}`, '_blank');
  };

  return <div className="site-shell">
    <Header cartCount={cartCount} onCart={() => setCartOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Hero />
    <BrandStrip />
    <About />
    <Values />
    <Objectives />
    <Organigram />
    <Location />
    <Shop products={filtered} categories={categories} category={category} setCategory={setCategory} query={query} setQuery={setQuery} addToCart={addToCart} setSelectedProduct={setSelectedProduct} />
    <Footer />
    <button className="floating-cart" onClick={() => setCartOpen(true)}><ShoppingCart />{cartCount > 0 && <span>{cartCount}</span>}</button>
    <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} changeQuantity={changeQuantity} total={cartTotal} sendOrder={sendOrder} />
    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
  </div>;
}

function Header({ cartCount, onCart, menuOpen, setMenuOpen }) {
  const links = [['Inicio', '#inicio'], ['Nosotros', '#nosotros'], ['Ubicación', '#ubicacion'], ['Tienda', '#tienda']];
  return <header className="main-header">
    <a href="#inicio" className="brand-mark"><img src={brand.horizontal} alt="Villa Laguna Restaurante" /></a>
    <nav className={menuOpen ? 'is-open' : ''}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
    <div className="header-actions"><button className="header-cart" onClick={onCart}><ShoppingCart size={19} /><span>{cartCount}</span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button></div>
  </header>;
}

function Hero() {
  return <section id="inicio" className="hero-pro">
    <div className="hero-media" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,24,24,.96) 0%, rgba(4,24,24,.78) 32%, rgba(4,24,24,.24) 68%), linear-gradient(0deg, rgba(4,24,24,.55), rgba(4,24,24,.02) 48%), url('${heroBackground}')` }} />
    <motion.div className="hero-panel" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
      <div className="hero-brand-lockup">
        <img src={brand.icon} alt="Villa Laguna" />
        <div>
          <strong>Villa Laguna</strong>
          <span>Restaurante • Cajabamba</span>
        </div>
      </div>
      <p className="micro-label"><Sparkles size={15} /> Restaurante • Cajabamba</p>
      <h1>Sabores tradicionales<br />con vista a la laguna</h1>
      <p>Una experiencia gastronómica cálida, elegante y natural, inspirada en la riqueza de Cajabamba y la serenidad de la Laguna de Colta.</p>
      <div className="hero-buttons"><a href="#tienda" className="btn btn-gold"><ShoppingCart size={18} /> Ver tienda</a><a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-glass"><Navigation size={18} /> Cómo llegar</a></div>
    </motion.div>
    <div className="hero-card-stack"><div><ChefHat /><strong>Cocina local</strong><span>Recetas de la Sierra con identidad propia.</span></div><div><Leaf /><strong>Ingredientes frescos</strong><span>Productos de la zona y preparación cuidadosa.</span></div><div><Heart /><strong>Servicio cálido</strong><span>Una experiencia pensada para recordar.</span></div></div>
  </section>;
}

function BrandStrip() { return <section className="brand-strip"><span>Tradición</span><i /><span>Laguna</span><i /><span>Cajabamba</span><i /><span>Hospitalidad</span></section>; }

function About() { return <section id="nosotros" className="section about-premium"><div className="section-heading center"><img src={brand.icon} alt="Símbolo Villa Laguna" /><p className="eyebrow">Nuestra esencia</p><h2>Una villa gastronómica entre paisaje, tradición y calidez</h2><p>Villa Laguna fusiona hospitalidad, frescura natural y orgullo culinario. Celebramos sabores locales con una presentación moderna y un ambiente acogedor.</p></div><div className="manifest-grid"><InfoCard icon={<Target />} title="Misión" text="Ofrecer experiencias gastronómicas auténticas y memorables con ingredientes locales, servicio cálido y ambiente acogedor." /><InfoCard icon={<Eye />} title="Visión" text="Ser reconocidos para 2030 como restaurante líder en Cajabamba por comida tradicional, innovación y sostenibilidad." /><InfoCard icon={<Heart />} title="Frase" text="La felicidad es el ingrediente secreto de una experiencia memorable." /></div></section>; }

function Values() { return <section className="section values-premium"><div className="split-layout"><div className="sticky-copy"><p className="eyebrow">Cultura corporativa</p><h2>Valores que se sienten en cada detalle</h2><p>La marca se sostiene en disciplina, pasión y servicio. Cada valor se transforma en una experiencia visible para el cliente.</p></div><div className="value-list">{values.map(([title, text], index) => <motion.article key={title} className="value-row" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .035 }}><Gem size={19} /><div><strong>{title}</strong><span>{text}</span></div></motion.article>)}</div></div></section>; }

function Objectives() { return <section className="section objectives-premium"><div className="section-heading center compact"><p className="eyebrow">Objetivos</p><h2>Metas claras para crecer con calidad</h2></div><div className="manifest-grid"><InfoCard icon={<Award />} title="Rentabilidad" text="Alcanzar utilidad neta del 20% al cierre del primer año y retorno de inversión dentro de 24 meses." /><InfoCard icon={<Clock />} title="Servicio eficiente" text="Estandarizar procesos para entregar platos en menos de 15 minutos." /><InfoCard icon={<Star />} title="Calidad digital" text="Lograr una calificación promedio de 4.6/5 en plataformas digitales." /></div></section>; }

function Organigram() { return <section className="section org-section"><div className="section-heading center compact"><p className="eyebrow">Organización</p><h2>Organigrama empresarial</h2><p>Organigrama final adaptado a la identidad visual Villa Laguna.</p></div><div className="org-image-card"><img src={orgChartImage} alt="Organigrama empresarial Villa Laguna" /></div></section>; }

function Location() { return <section id="ubicacion" className="section location-section"><div className="location-grid"><div><p className="eyebrow">Visítanos</p><h2>Ubicación, contacto y experiencia visual</h2><p>Cajabamba – Ecuador. Un espacio pensado para disfrutar comida tradicional, paisajes naturales y atención cercana.</p><div className="contact-actions"><a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin /> Ver ubicación en Google Maps</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Phone /> Pedidos por WhatsApp</a></div></div><div className="video-card"><PlayCircle size={66} /><h3>Video interactivo del restaurante</h3><p>Espacio listo para agregar video real, recorrido o fotografías del local.</p></div></div><div className="review-strip">{['Sabor tradicional con presentación elegante.', 'Excelente atención y platos abundantes.', 'Perfecto para comer con vista natural.'].map((r) => <article key={r}><span>★★★★★</span><p>{r}</p></article>)}</div></section>; }

function Shop({ products, categories, category, setCategory, query, setQuery, addToCart, setSelectedProduct }) { return <section id="tienda" className="section shop-premium"><div className="section-heading center compact"><p className="eyebrow">Tienda virtual</p><h2>Elige tus platos favoritos y arma tu pedido</h2><p>Busca productos, revisa ingredientes, precios, descuentos y calificaciones.</p></div><div className="shop-tools"><label className="search-box"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto, ingrediente o plato..." /></label><div className="filters">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="product-grid">{products.map((p) => <ProductCard key={p.id} product={p} onAdd={addToCart} onDetails={setSelectedProduct} />)}</div></section>; }

function Footer() { return <footer className="footer-pro"><img src={brand.horizontal} alt="Villa Laguna" /><p>Villa Laguna Restaurante • Cajabamba, Ecuador</p><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pedir por WhatsApp</a></footer>; }

function InfoCard({ icon, title, text }) { return <motion.article className="info-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="info-icon">{icon}</div><h3>{title}</h3><p>{text}</p></motion.article>; }

function ProductCard({ product, onAdd, onDetails }) { const discount = Math.round((1 - product.price / product.oldPrice) * 100); return <motion.article className="product-card" whileHover={{ y: -8 }}><div className="product-photo"><img src={product.images[0]} alt={product.name} /><span className="discount">-{discount}%</span><span className="product-tag">{product.tag}</span></div><div className="product-content"><div className="rating"><Star size={16} fill="currentColor" /> {product.rating}</div><h3>{product.name}</h3><p>{product.description}</p><div className="price-line"><strong>{money(product.price)}</strong><span>{money(product.oldPrice)}</span></div><div className="product-actions"><button onClick={() => onDetails(product)}>Ver detalles</button><button className="add" onClick={() => onAdd(product)}><Plus size={18} /> Agregar</button></div></div></motion.article>; }

function CartDrawer({ open, setOpen, cart, changeQuantity, total, sendOrder }) { return <AnimatePresence>{open && <><motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} /><motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}><div className="drawer-head"><div><p className="eyebrow">Tu pedido</p><h2>Carrito</h2></div><button onClick={() => setOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingCart size={54} /><h3>Tu carrito está vacío</h3><p>Agrega platos desde la tienda virtual.</p></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.images[0]} alt={item.name} /><div><h4>{item.name}</h4><span>{money(item.price)}</span><div className="qty"><button onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><b>{item.quantity}</b><button onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div></div>)}</div><div className="cart-footer"><div><span>Total</span><strong>{money(total)}</strong></div><button className="btn btn-gold full" onClick={sendOrder}><Send size={18} /> Enviar pedido por WhatsApp</button></div></>}</motion.aside></>}</AnimatePresence>; }

function ProductModal({ product, onClose, onAdd }) { return <AnimatePresence>{product && <><motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} /><motion.div className="modal" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94, y: 20 }}><button className="modal-close" onClick={onClose}><X /></button><div className="modal-gallery"><img src={product.images[0]} alt={product.name} /><img src={product.images[1]} alt={product.name} /></div><div className="modal-body"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="rating"><Star size={16} fill="currentColor" /> {product.rating} de reputación</div><p>{product.description}</p><p><strong>¿Por qué se diferencia?</strong> {product.difference}</p><h3>Características</h3><div className="chips">{product.features.map((f) => <span key={f}><Leaf size={14} /> {f}</span>)}</div><h3>Ingredientes</h3><div className="chips muted">{product.ingredients.map((ing) => <span key={ing}>{ing}</span>)}</div><div className="price-line big"><strong>{money(product.price)}</strong><span>{money(product.oldPrice)}</span></div><button className="btn btn-gold full" onClick={() => onAdd(product)}><Plus size={18} /> Agregar al carrito</button></div></motion.div></>}</AnimatePresence>; }
