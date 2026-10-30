import { CONFETTI_COLORS } from '../config.js';
import { prefersReducedMotion } from '../lib/env.js';

const layer = document.getElementById('fx');

/** Throw `count` pieces of confetti from viewport coordinates (x, y). */
export function burst(x, y, count) {
  if (prefersReducedMotion || !layer) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('i');
    const size = 5 + Math.random() * 6;
    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 130;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const rot = (Math.random() - 0.5) * 540;
    el.className = 'cf';
    el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]}`;
    layer.appendChild(el);
    const anim = el.animate(
      [
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${dx}px,${dy - 70}px) rotate(${rot / 2}deg)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${dx * 1.3}px,${dy + 170}px) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.6,.4,1)' }
    );
    anim.onfinish = () => el.remove();
  }
}
