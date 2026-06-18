const promoVideoDriveId = '1ZGandiBXnhUPywozS6HVfrkp9_nKN93V';
const promoVideoPreview = `https://drive.google.com/file/d/${promoVideoDriveId}/preview`;

function installVideoSection() {
  if (document.getElementById('vl-video-style')) return;
  const style = document.createElement('style');
  style.id = 'vl-video-style';
  style.textContent = `
    .vl-video-section{position:relative;margin:0 0 38px;padding:0;z-index:4;grid-column:1/-1}
    .vl-video-card{position:relative;overflow:hidden;border-radius:42px;border:1px solid rgba(229,189,102,.48);background:linear-gradient(135deg,rgba(8,45,45,.97),rgba(10,58,54,.84));box-shadow:0 34px 95px rgba(0,0,0,.28);display:grid;grid-template-columns:.82fr 1.48fr;gap:30px;align-items:center;padding:34px}
    .vl-video-card:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 14% 12%,rgba(229,189,102,.24),transparent 34%),radial-gradient(circle at 88% 18%,rgba(255,250,241,.12),transparent 28%),linear-gradient(90deg,rgba(255,250,241,.06),transparent);pointer-events:none}
    .vl-video-card:after{content:'Villa Laguna';position:absolute;right:34px;bottom:-12px;font-family:Cinzel,Georgia,serif;font-size:clamp(4rem,9vw,9rem);line-height:1;color:rgba(255,250,241,.045);pointer-events:none}
    .vl-video-copy{position:relative;z-index:1;color:#fffaf1}.vl-video-copy .eyebrow{color:#e5bd66;margin-bottom:10px;letter-spacing:.18em}.vl-video-copy h3{font-family:Cinzel,Georgia,serif;font-size:clamp(2.4rem,4.6vw,5rem);line-height:1;margin:0 0 14px;text-shadow:0 18px 42px rgba(0,0,0,.28)}.vl-video-copy p{color:rgba(255,250,241,.86);font-size:1.08rem;line-height:1.65;margin:0 0 20px;max-width:620px}.vl-video-copy span{display:inline-flex;align-items:center;gap:8px;border-radius:999px;background:rgba(255,250,241,.09);border:1px solid rgba(229,189,102,.34);padding:10px 16px;font-weight:950;color:#e5bd66}
    .vl-video-frame{position:relative;z-index:1;aspect-ratio:16/9;border-radius:32px;overflow:hidden;background:#031818;border:1px solid rgba(229,189,102,.42);display:block;box-shadow:0 24px 62px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.08)}
    .vl-video-frame iframe{width:100%;height:100%;border:0;display:block;background:#031818}
    .vl-video-frame:before{content:'';position:absolute;inset:0;border-radius:32px;box-shadow:inset 0 0 0 1px rgba(255,250,241,.08),inset 0 -42px 80px rgba(3,24,24,.22);pointer-events:none;z-index:2}
    .location-grid{align-items:start}.restaurant-gallery-card{transform:scale(.96);transform-origin:top center;opacity:.96}.restaurant-gallery-card .gallery-head h3{font-size:clamp(1.55rem,2.35vw,2.35rem)!important}.restaurant-gallery-card .gallery-head{margin-bottom:14px!important}
    @media(max-width:900px){.vl-video-section{margin-bottom:24px}.vl-video-card{grid-template-columns:1fr;padding:22px;border-radius:30px}.vl-video-copy h3{font-size:2.25rem}.restaurant-gallery-card{transform:none}}
  `;
  document.head.appendChild(style);
}

function createVideoSection() {
  if (document.querySelector('.vl-video-section')) return;
  const location = document.querySelector('.location-section');
  if (!location) return;
  const locationGrid = location.querySelector('.location-grid');
  const section = document.createElement('div');
  section.className = 'vl-video-section';
  section.innerHTML = `
    <div class="vl-video-card">
      <div class="vl-video-copy">
        <p class="eyebrow">Video promocional</p>
        <h3>La experiencia Villa Laguna en video</h3>
        <p>Conoce el ambiente, los sabores tradicionales, la atención y la experiencia de Villa Laguna en Cajabamba.</p>
        <span>🎬 Video principal del restaurante</span>
      </div>
      <div class="vl-video-frame">
        <iframe src="${promoVideoPreview}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>
      </div>
    </div>
  `;
  if (locationGrid) location.insertBefore(section, locationGrid);
  else location.prepend(section);
}

installVideoSection();
window.addEventListener('load', createVideoSection);
setTimeout(createVideoSection, 600);
setTimeout(createVideoSection, 1600);
