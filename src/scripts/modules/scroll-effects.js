// Scroll progress line in the nav + gentle parallax on the hero decorations.
import { prefersReducedMotion } from '../lib/env.js';

const FACTORS = [0.06, 0.12, 0.09, 0.15, 0.07, 0.11, 0.13, 0.08];

export function initScrollEffects() {
  const bar = document.querySelector('.prog');
  const layers = [...document.querySelectorAll('.side,.spark')].map((el, i) => [el, FACTORS[i % FACTORS.length]]);
  let ticking = false;

  function update() {
    ticking = false;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? Math.min(y / max, 1) : 0;
    if (bar) bar.style.transform = 'scaleX(' + progress + ')';
    if (!prefersReducedMotion && y < innerHeight * 1.3) {
      layers.forEach(([el, f]) => (el.style.transform = 'translate3d(0,' + (-y * f).toFixed(1) + 'px,0)'));
    }
  }

  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}
