// Galleriet på pedagogiksidan: klick öppnar bilden stort i en <dialog>.
// Utan JS fungerar länkarna ändå, då öppnas bilden som vanlig sida.
(() => {
  const box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  const img = box.querySelector('img');
  document.querySelectorAll('.gallery a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      img.src = a.href;
      img.alt = a.querySelector('img').alt;
      box.showModal();
    });
  });
  box.addEventListener('click', e => { if (e.target === box || e.target === img) box.close(); });
})();
