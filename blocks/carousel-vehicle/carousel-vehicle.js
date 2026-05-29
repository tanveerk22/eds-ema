import { moveInstrumentation } from '../../scripts/scripts.js';

function scrollStrip(strip, direction) {
  const scrollAmount = strip.clientWidth * 0.6;
  strip.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function updateNavVisibility(strip, prevBtn, nextBtn) {
  prevBtn.disabled = strip.scrollLeft <= 0;
  nextBtn.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const strip = document.createElement('div');
  strip.classList.add('carousel-vehicle-strip');

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('carousel-vehicle-card');
    moveInstrumentation(row, card);

    const cols = row.querySelectorAll(':scope > div');
    const carImgCol = cols[0];
    const logoCol = cols[1];

    if (carImgCol) {
      const carImg = carImgCol.querySelector('picture, img');
      if (carImg) {
        const imgWrap = document.createElement('div');
        imgWrap.classList.add('carousel-vehicle-card-image');
        imgWrap.append(carImg);
        card.append(imgWrap);
      }
    }

    if (logoCol) {
      const logoImg = logoCol.querySelector('picture, img');
      if (logoImg) {
        const logoWrap = document.createElement('div');
        logoWrap.classList.add('carousel-vehicle-card-logo');
        logoWrap.append(logoImg);
        card.append(logoWrap);
      }
    }

    strip.append(card);
    row.remove();
  });

  const nav = document.createElement('div');
  nav.classList.add('carousel-vehicle-nav');

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.classList.add('carousel-vehicle-prev');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.disabled = true;

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.classList.add('carousel-vehicle-next');
  nextBtn.setAttribute('aria-label', 'Next');

  nav.append(prevBtn, nextBtn);

  prevBtn.addEventListener('click', () => scrollStrip(strip, -1));
  nextBtn.addEventListener('click', () => scrollStrip(strip, 1));
  strip.addEventListener('scroll', () => updateNavVisibility(strip, prevBtn, nextBtn));

  block.append(strip, nav);

  requestAnimationFrame(() => updateNavVisibility(strip, prevBtn, nextBtn));
}
