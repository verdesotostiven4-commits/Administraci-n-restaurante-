const promoVideoDriveId = '1ZGandiBXnhUPywozS6HVfrkp9_nKN93V';
const promoVideoDirect = `https://drive.google.com/uc?export=download&id=${promoVideoDriveId}`;
const promoVideoView = `https://drive.google.com/file/d/${promoVideoDriveId}/view`;

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
    .vl-video-frame{position:relative;z-index:1;aspect-ratio:16/9;border-radius:32px;overflow:hidden;background:#031818;border:1px solid rgba(229,189,102,.42);display:block;box-shadow:0 24px 62px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.08);cursor:pointer}
    .vl-video-frame video{width:100%;height:100%;object-fit:contain;border:0;display:block;background:#031818}
    .vl-custom-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:94px;height:94px;border:0;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#c5942d,#e5bd66);color:#082d2d;font-size:2.55rem;font-weight:950;box-shadow:0 24px 54px rgba(229,189,102,.35);cursor:pointer;transition:.25s ease;z-index:3}.vl-video-frame.is-playing .vl-custom-play{opacity:0;transform:translate(-50%,-50%) scale(.82);pointer-events:none}.vl-video-frame:hover .vl-custom-play{opacity:1;transform:translate(-50%,-50%) scale(1)}.vl-video-frame.is-playing:hover .vl-custom-play{opacity:.88}
    .vl-video-top-label{position:absolute;left:18px;top:16px;z-index:2;border-radius:999px;padding:8px 12px;background:rgba(3,24,24,.72);border:1px solid rgba(229,189,102,.34);color:#fffaf1;font-size:.78rem;font-weight:950;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(10px)}
    .vl-video-open{position:absolute;right:16px;bottom:14px;z-index:4;display:inline-flex!important;text-decoration:none!important;color:#082d2d!important;background:rgba(255,250,241,.92)!important;border:1px solid rgba(229,189,102,.55)!important;border-radius:999px!important;padding:9px 14px!important;font-weight:950!important;box-shadow:0 14px 30px rgba(0,0,0,.22)!important}.vl-video-open:hover{transform:translateY(-2px)}
    .vl-video-error{display:none;position:absolute;inset:0;z-index:5;place-items:center;text-align:center;padding:26px;color:#fffaf1;background:linear-gradient(135deg,rgba(3,24,24,.92),rgba(8,45,45,.84))}.vl-video-frame.has-error .vl-video-error{display:grid}.vl-video-error strong{display:block;font-size:1.12rem;margin-bottom:8px}.vl-video-error small{display:block;color:rgba(255,250,241,.72);line-height:1.45}
    .location-grid{align-items:start}.restaurant-gallery-card{transform:scale(.96);transform-origin:top center;opacity:.96}.restaurant-gallery-card .gallery-head h3{font-size:clamp(1.55rem,2.35vw,2.35rem)!important}.restaurant-gallery-card .gallery-head{margin-bottom:14px!important}
    @media(max-width:900px){.vl-video-section{margin-bottom:24px}.vl-video-card{grid-template-columns:1fr;padding:22px;border-radius:30px}.vl-video-copy h3{font-size:2.25rem}.restaurant-gallery-card{transform:none}.vl-custom-play{width:74px;height:74px;font-size:2rem}.vl-video-open{position:static!important;margin:12px!important}}
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
        <span class="vl-video-top-label">Video oficial</span>
        <video class="vl-promo-video" playsinline preload="metadata" src="${promoVideoDirect}"></video>
        <button class="vl-custom-play" type="button" aria-label="Reproducir video">▶</button>
        <a class="vl-video-open" href="${promoVideoView}" target="_blank" rel="noreferrer">Abrir HD</a>
        <div class="vl-video-error"><div><strong>No se pudo reproducir aquí</strong><small>Abre el video en HD desde Drive o pásame un enlace directo .mp4 para dejarlo perfecto.</small></div></div>
      </div>
    </div>
  `;
  if (locationGrid) location.insertBefore(section, locationGrid);
  else location.prepend(section);
  wireVideoPlayer(section);
}

function wireVideoPlayer(section) {
  const frame = section.querySelector('.vl-video-frame');
  const video = section.querySelector('.vl-promo-video');
  const play = section.querySelector('.vl-custom-play');
  if (!frame || !video || !play) return;
  const toggle = (event) => {
    if (event.target.closest('a')) return;
    event.preventDefault();
    if (video.paused) video.play();
    else video.pause();
  };
  frame.addEventListener('click', toggle);
  video.addEventListener('play', () => frame.classList.add('is-playing'));
  video.addEventListener('pause', () => frame.classList.remove('is-playing'));
  video.addEventListener('ended', () => frame.classList.remove('is-playing'));
  video.addEventListener('error', () => frame.classList.add('has-error'));
}

installVideoSection();
window.addEventListener('load', createVideoSection);
setTimeout(createVideoSection, 600);
setTimeout(createVideoSection, 1600);
