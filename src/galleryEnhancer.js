const galleryImages = [
  'https://blogger.googleusercontent.com/img/a/AVvXsEiTKpQAs4uqaQb_ybJrQWWJU_FcAXv5KyZLfu4a0qSe8ZFJrEOz5PyYsJSHEveHn-HLXZySF2W7aNozW1uIlAc5fxFbPTLqiYvDg9BU3rqAucyya201ZbYxEtIvZGniNbp-9fJj5m2pJuWCIbJfYlNEFZcNIrZZlmoDSw0kf04UgpIQJ3k-eCyxRTxHGlY',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiQYDDuof7bOOY4v3WwrD5yWtw_X1DYcn3NC23YmIBE1Y6xwAOBGr-Veax0N8BN5XVzsBsqkW9dS3ugMiKL3nG9_qH_NDMhano_1bV3MoNvEyZ_8yzcHkK6PJTv9x9JPGHKZ52WcxTV67aYZcEw8mJ9dDEMQH-lv7kXFOKIslZiDwWZ_tLlxZUnp_BWIm8',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhdwiwKkPpRsS7fwZS_gIkvF7WYURut_eQYZ5QYLbS2H3zJoEPxYs6tjIleS_7qqcPlfne7ISW9U7S3JfBM5ZGlSBzfbdTpNGu9B5yDIxGu-0wVFh7Ej8LALYCYMiGiOgtHRsaX3zlfQ7Ho9LxhF0E-8Y-OnnBNSKYg-mWoS8lgvIc2FT-ZbKXQfLAz3dU',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgCWQH1-FTBCSjwOAaASYIVB-mIz8r29MNsix7qg-7wwbEfMb8eu06KElbFDgztZlv9bS6-gd3CfqpHRUPjjog-mC3zgahWtrdGP8KovTpx_3DAqBNKdTovFXIJo6BgrwAG8fSO1aS4jFTGVPTXLYjsEEmJvF-CRrf6AqV2WCTY_6LrPNTTAcHawJiiAvA',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhDL7bKRwtj1HYvtqbLFCCtaEJ3egzk1Tu0EWsEN90aShFOlOVQVcWwOxbuaEXrIAM64lK6Mq-WSqV_3Qa-Ou7B0JylLbtI7Fv1j8xIBiQBP2U9ucMc2TpzGC903DZHFbZFRuMrdOvMf5ef_i10yTpBFuEr2cRXHfK6RI8TzQfDI-o0NP5hbiY9AstxNBA',
  'https://blogger.googleusercontent.com/img/a/AVvXsEj0QZKs8t0QAon2hNl_KaC311cXOA1OQtYQ0WOdKs_bDo8P1ah_IgLLy6jwY0s7MgzwnzNINBl6aTndloNVNb7SqqyYYyFTNiKnmcRBQ4mW2zgmR7JtcHytRqb0U_hE7V76jXTrGAHMt9xF1eQP2muZUEYOVtwIijMtfJIKs06Ro4rSdb6-aKGwjuv8Eow'
];

function installGallery() {
  if (document.getElementById('vl-gallery-enhancer')) return;
  const style = document.createElement('style');
  style.id = 'vl-gallery-enhancer';
  style.textContent = `.gallery-preview-grid{display:grid!important;grid-template-columns:repeat(6,1fr)!important;grid-auto-rows:116px!important;gap:10px!important}.gallery-placeholder{cursor:zoom-in!important;min-height:0!important;padding:0!important;display:block!important;position:relative!important;overflow:hidden!important;border-radius:24px!important;border:1px solid rgba(229,189,102,.42)!important;background-size:cover!important;background-position:center!important;box-shadow:0 16px 34px rgba(8,45,45,.18)!important}.gallery-placeholder span,.gallery-placeholder strong{display:none!important}.gallery-placeholder:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,45,45,.02),rgba(8,45,45,.22))}.gallery-placeholder:nth-child(1){grid-column:span 3!important;grid-row:span 2!important;background-image:url('${galleryImages[0]}')!important}.gallery-placeholder:nth-child(2){grid-column:span 3!important;background-image:url('${galleryImages[1]}')!important}.gallery-placeholder:nth-child(3){grid-column:span 3!important;background-image:url('${galleryImages[2]}')!important}.gallery-placeholder:nth-child(4){grid-column:span 2!important;background-image:url('${galleryImages[3]}')!important}.gallery-placeholder:nth-child(5){grid-column:span 2!important;background-image:url('${galleryImages[4]}')!important}.gallery-placeholder:nth-child(6){grid-column:span 2!important;display:block!important;background-image:url('${galleryImages[5]}')!important}.vl-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(3,18,18,.92);display:grid;place-items:center;padding:32px}.vl-lightbox img{max-width:min(1180px,92vw);max-height:86vh;border-radius:26px;object-fit:contain;box-shadow:0 36px 90px rgba(0,0,0,.55);border:1px solid rgba(229,189,102,.42)}.vl-lightbox button{position:absolute;border:0;border-radius:999px;background:rgba(255,250,241,.92);color:#082d2d;font-size:2rem;font-weight:900;width:54px;height:54px;display:grid;place-items:center;cursor:pointer}.vl-lightbox .close{right:28px;top:24px}.vl-lightbox .prev{left:28px;top:50%;transform:translateY(-50%)}.vl-lightbox .next{right:28px;top:50%;transform:translateY(-50%)}.vl-count{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);color:#fffaf1;font-weight:900;background:rgba(8,45,45,.65);border-radius:999px;padding:8px 15px}@media(max-width:900px){.gallery-preview-grid{grid-template-columns:1fr!important;grid-auto-rows:180px!important}.gallery-placeholder{grid-column:auto!important;grid-row:auto!important}}`;
  document.head.appendChild(style);
}

function openGallery(startIndex) {
  let current = startIndex;
  let startX = 0;
  const viewer = document.createElement('div');
  viewer.className = 'vl-lightbox';
  viewer.innerHTML = '<button class="close">×</button><button class="prev">‹</button><img alt="Galería Villa Laguna"/><button class="next">›</button><div class="vl-count"></div>';
  document.body.appendChild(viewer);
  const img = viewer.querySelector('img');
  const count = viewer.querySelector('.vl-count');
  const render = () => { img.src = galleryImages[current]; count.textContent = `${current + 1} / ${galleryImages.length}`; };
  const move = (step) => { current = (current + step + galleryImages.length) % galleryImages.length; render(); };
  viewer.querySelector('.close').onclick = () => viewer.remove();
  viewer.querySelector('.prev').onclick = (event) => { event.stopPropagation(); move(-1); };
  viewer.querySelector('.next').onclick = (event) => { event.stopPropagation(); move(1); };
  viewer.onclick = (event) => { if (event.target === viewer) viewer.remove(); };
  viewer.ontouchstart = (event) => { startX = event.touches[0].clientX; };
  viewer.ontouchend = (event) => { const diff = event.changedTouches[0].clientX - startX; if (Math.abs(diff) > 55) move(diff > 0 ? -1 : 1); };
  render();
}

installGallery();
document.addEventListener('click', (event) => {
  const card = event.target.closest('.gallery-placeholder');
  if (!card) return;
  const cards = [...card.parentElement.querySelectorAll('.gallery-placeholder')];
  const index = cards.indexOf(card);
  openGallery(index < 0 ? 0 : index);
});
document.addEventListener('keydown', (event) => {
  const viewer = document.querySelector('.vl-lightbox');
  if (!viewer) return;
  if (event.key === 'Escape') viewer.remove();
  if (event.key === 'ArrowRight') viewer.querySelector('.next').click();
  if (event.key === 'ArrowLeft') viewer.querySelector('.prev').click();
});
