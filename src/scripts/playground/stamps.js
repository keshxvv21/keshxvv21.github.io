// Click empty paper to stamp a pixel sticker (keeps the newest 24).
import { pixelSvg } from '../modules/pixel-art.js';
import { burst } from './confetti.js';
import { DRAGGABLE, state, hideHint } from './state.js';

const KINDS = ['heart', 'smile', 'mac', 'folder', 'floppy'];
const MAX_STAMPS = 24;
const IGNORE = DRAGGABLE + ',a,button,input,textarea,label,nav,.sq,.tape-band,.skip';

export function initStamps() {
  const stamps = [];
  document.addEventListener('click', (e) => {
    if (state.moved) { state.moved = false; return; }
    if (e.target.closest(IGNORE)) return;

    const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
    const el = document.createElement('div');
    el.className = 'stamp';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = pixelSvg(kind, 4);
    el.style.setProperty('--r', (Math.random() * 40 - 20).toFixed(0) + 'deg');
    document.body.appendChild(el);
    el.style.left = e.pageX - el.offsetWidth / 2 + 'px';
    el.style.top = e.pageY - el.offsetHeight / 2 + 'px';

    stamps.push(el);
    if (stamps.length > MAX_STAMPS) stamps.shift().remove();
    burst(e.clientX, e.clientY, 7);
    hideHint();
  });
}
