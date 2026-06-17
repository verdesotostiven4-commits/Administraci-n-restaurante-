# Villa Laguna Restaurante

Página web profesional para restaurante con secciones institucionales y tienda virtual.

## Incluye

- Inicio con logo, frase, reseña y botones principales.
- Misión, visión, valores corporativos y objetivos.
- Organigrama empresarial en HTML responsive.
- Ubicación con enlace directo a Google Maps.
- Contacto y pedido por WhatsApp.
- Galería/video placeholder para colocar material real.
- Tienda virtual con buscador, filtros, productos, precios, descuentos, calificación, ingredientes y carrito.
- Carrito lateral con total y envío de pedido por WhatsApp.
- Animaciones con Framer Motion.
- Diseño responsive para celular, tablet y escritorio.

## Cambios rápidos pendientes

1. Reemplazar el número de WhatsApp en `src/App.jsx`:

```js
const whatsappNumber = '593999999999';
```

2. Subir el logo final sin fondo negro a la carpeta `public` con este nombre:

```txt
public/logo-villa-laguna.png
```

3. Cambiar las imágenes de productos por fotos reales del restaurante cuando las tengan disponibles.

## Instalar y correr

```bash
npm install
npm run dev
```

## Deploy en Vercel

Vercel detecta Vite automáticamente.

- Build command: `npm run build`
- Output directory: `dist`
