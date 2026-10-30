// The playful layer: logo confetti always; drag + stamps only for mouse users.
import { hasFinePointer } from '../lib/env.js';
import { burst } from './confetti.js';
import { initDrag } from './drag.js';
import { initStamps } from './stamps.js';

export function initPlayground() {
  const logo = document.querySelector('.brandmark');
  if (logo) {
    logo.addEventListener('click', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 36);
    });
  }
  if (hasFinePointer) {
    initDrag();
    initStamps();
  }
}
