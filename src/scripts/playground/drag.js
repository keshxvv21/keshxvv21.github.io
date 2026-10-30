// Draggable stickers with a little throw and bounce.
import { prefersReducedMotion } from '../lib/env.js';
import { DRAGGABLE, state, hideHint } from './state.js';

export function initDrag() {
  document.querySelectorAll(DRAGGABLE).forEach((el) => el.classList.add('draggable'));
  let z = 5;

  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest(DRAGGABLE);
    if (!el || e.button !== 0) return;
    e.preventDefault();
    state.moved = false;
    cancelAnimationFrame(el._raf);

    const start = { px: e.clientX, py: e.clientY, x: el._x || 0, y: el._y || 0 };
    let lastX = e.clientX, lastY = e.clientY, lastT = performance.now(), vx = 0, vy = 0;

    el.classList.add('grab');
    el.style.zIndex = Math.min(++z, 28);
    el.style.scale = '1.06';
    el.setPointerCapture(e.pointerId);

    const move = (ev) => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 8);
      el._x = start.x + ev.clientX - start.px;
      el._y = start.y + ev.clientY - start.py;
      vx = vx * 0.6 + ((ev.clientX - lastX) / dt * 16) * 0.4;
      vy = vy * 0.6 + ((ev.clientY - lastY) / dt * 16) * 0.4;
      lastX = ev.clientX; lastY = ev.clientY; lastT = now;
      if (Math.abs(ev.clientX - start.px) + Math.abs(ev.clientY - start.py) > 4) {
        state.moved = true;
        hideHint();
      }
      el.style.translate = el._x + 'px ' + el._y + 'px';
      el.style.rotate = Math.max(-10, Math.min(10, vx * 0.7)) + 'deg';
    };

    const release = () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', release);
      el.removeEventListener('pointercancel', release);
      el.classList.remove('grab');
      try {
        el.animate(
          { rotate: [el.style.rotate || '0deg', '0deg'], scale: ['1.06', '1'] },
          { duration: 520, easing: 'cubic-bezier(.34,1.56,.64,1)' }
        );
      } catch (_) {}
      el.style.rotate = '0deg';
      el.style.scale = '1';

      const glide = () => {
        vx *= 0.92; vy *= 0.92;
        el._x += vx; el._y += vy;
        const r = el.getBoundingClientRect();
        if (r.left < 0) { el._x -= r.left; vx = Math.abs(vx) * 0.5; }
        else if (r.right > innerWidth) { el._x -= r.right - innerWidth; vx = -Math.abs(vx) * 0.5; }
        el.style.translate = el._x + 'px ' + el._y + 'px';
        if (Math.abs(vx) + Math.abs(vy) > 0.3) el._raf = requestAnimationFrame(glide);
      };
      if (state.moved && !prefersReducedMotion && Math.abs(vx) + Math.abs(vy) > 1) {
        el._raf = requestAnimationFrame(glide);
      }
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
  });
}
