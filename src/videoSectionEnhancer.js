function installVideoSection() {
  if (document.getElementById('vl-video-style')) return;
  const style = document.createElement('style');
  style.id = 'vl-video-style';
  style.textContent = `
    .vl-video-section{position:relative;margin:34px 0 0;padding:0 0 18px;z-index:2}
    .vl-video-card{position:relative;overflow:hidden;border-radius:34px;border:1px solid rgba(229,189,102,.34);background:linear-gradient(135deg,rgba(8,45,45,.94),rgba(11,55,51,.78));box-shadow:0 28px 80px rgba(0,0,0,.22);display:grid;grid-template-columns:.95fr 1.35fr;gap:24px;align-items:center;padding:28px}
    .vl-video-card:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 18% 15%,rgba(229,189,102,.20),transparent 34%),linear-gradient(90deg,rgba(255,250,241,.06),transparent);pointer-events:none}
    .vl-video-copy{position:relative;z-index:1;color:#fffaf1}.vl-video-copy .eyebrow{color:#e5bd66;margin-bottom:8px}.vl-video-copy h3{font-family:Cinzel,Georgia,serif;font-size:clamp(2rem,3.3vw,3.6rem);line-height:1.02;margin:0 0 12px}.vl-video-copy p{color:rgba(255,250,241,.84);font-size:1.02rem;line-height:1.6;margin:0 0 18px}.vl-video-copy span{display:inline-flex;align-items:center;gap:8px;border-radius:999px;background:rgba(255,250,241,.09);border:1px solid rgba(229,189,102,.28);padding:9px 14px;font-weight:900;color:#e5bd66}
    .vl-video-frame{position:relative;z-index:1;aspect-ratio:16/9;border-radius:28px;overflow:hidden;background:linear-gradient(135deg,rgba(255,250,241,.13),rgba(255,250,241,.04));border:1px solid rgba(229,189,102,.34);display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
    .vl-video-frame video,.vl-video-frame iframe{width:100%;height:100%;object-fit:cover;border:0;display:block}.vl-video-placeholder{text-align:center;color:#fffaf1;padding:24px}.vl-video-play{width:74px;height:74px;border-radius:50%;display:grid;place-items:center;margin:0 auto 14px;background:linear-gradient(135deg,#c5942d,#e5bd66);color:#082d2d;font-size:2rem;font-weight:900;box-shadow:0 16px 34px rgba(229,189,102,.25)}.vl-video-placeholder strong{display:block;font-size:1.1rem;margin-bottom:7px}.vl-video-placeholder small{display:block;color:rgba(255,250,241,.72);font-weight:700;line-height:1.45}
    @media(max-width:900px){.vl-video-card{grid-template-columns:1fr;padding:20px;border-radius:28px}.vl-video-copy h3{font-size:2rem}}
  `;
  document.head.appendChild(style);
}

function createVideoSection() {
  if (document.querySelector('.vl-video-section')) return;
  const location = document.querySelector('.location-section');
  if (!location) return;
  const reviewStrip = location.querySelector('.review-strip');
  const section = document.createElement('div');
  section.className = 'vl-video-section';
  section.innerHTML = `
    <div class="vl-video-card">
      <div class="vl-video-copy">
        <p class="eyebrow">Video promocional</p>
        <h3>Conoce Villa Laguna en movimiento</h3>
        <p>Espacio listo para colocar el video editado en CapCut. Aquí se mostrará el recorrido, la experiencia, los platos y el llamado a visitar o pedir por WhatsApp.</p>
        <span>🎬 Video final listo para insertar</span>
      </div>
      <div class="vl-video-frame">
        <div class="vl-video-placeholder">
          <div class="vl-video-play">▶</div>
          <strong>Video promocional pendiente</strong>
          <small>Cuando tengas el link del video, se reemplaza este bloque por el reproductor real.</small>
        </div>
      </div>
    </div>
  `;
  if (reviewStrip) location.insertBefore(section, reviewStrip);
  else location.appendChild(section);
}

installVideoSection();
window.addEventListener('load', createVideoSection);
setTimeout(createVideoSection, 600);
setTimeout(createVideoSection, 1600);
