/**
 * animations.js — tasteskill-guided motion layer
 *
 * Motion budget (taste-skill §1):
 *   1. Hero signature: namebox border-draw + staggered stage entrance
 *   2. Section entrances: heading → text → picture, staggered 70–90 ms, 20px rise
 *   3. Feedback: magnetic cards, hover press on buttons, social spring
 *   4. One moving loop: sparks float continuously, status dot pulses
 *
 * Curves from motion.md §4:
 *   expo-out for reveals, ease-out for UI, ease-in-out for wipes
 */

import { prefersReducedMotion } from '../lib/env.js';

/* ── 1. Namebox border-draw (signature move) ──────────────────────── */
function initNameboxDraw() {
  const box = document.querySelector('.namebox');
  if (!box || prefersReducedMotion) return;

  // The border starts invisible and "draws" in via clip-path
  box.style.clipPath = 'inset(0 100% 0 0)';
  box.style.transition = 'clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.style.clipPath = 'inset(0 0% 0 0)';
    });
  });

  // Corner markers scale in after the border
  const corners = box.querySelectorAll('i');
  corners.forEach((c, i) => {
    c.style.transform = 'scale(0)';
    c.style.transition = `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${1.0 + i * 0.07}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        c.style.transform = '';
      });
    });
  });
}

/* ── 2. Staggered section entrances ───────────────────────────────── */
function initSectionEntrances() {
  if (prefersReducedMotion) return;

  // Project cards: enter alternating from left/right, staggered
  const cards = document.querySelectorAll('.pt');
  const cardIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in');
      cardIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  cards.forEach((card, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    card.style.setProperty('--slide-x', `${dir * 28}px`);
    card.style.opacity = '0';
    card.style.transform = `translateX(${dir * 28}px) translateY(12px)`;
    card.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`;
    cardIO.observe(card);
  });

  // Skill items: stagger row by row
  const skillItems = document.querySelectorAll('.sk');
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in');
      skillIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -5% 0px' });

  skillItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(14px)';
    item.style.transition = `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${(i % 8) * 60}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${(i % 8) * 60}ms`;
    skillIO.observe(item);
  });

  // Skill groups (h3 headers): slide in from left
  const skillGroups = document.querySelectorAll('.skgroup');
  const groupIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in-group');
      groupIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -5% 0px' });

  skillGroups.forEach((g, i) => {
    g.style.opacity = '0';
    g.style.transform = 'translateY(18px)';
    g.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`;
    groupIO.observe(g);
  });

  // Experience notes: slide in
  const notes = document.querySelectorAll('.note.xp');
  const noteIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in');
      noteIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -5% 0px' });

  notes.forEach((n) => {
    n.style.opacity = '0';
    n.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)';
    noteIO.observe(n);
  });

  // Contact cards
  const contactCards = document.querySelectorAll('.lets .card');
  const cardContactIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in');
      cardContactIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -5% 0px' });

  contactCards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(22px)';
    c.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`;
    cardContactIO.observe(c);
  });

  // About section polaroids — only fade in (they have their own rotation)
  const polaroids = document.querySelectorAll('.about .polaroid');
  const polIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in-pol');
      polIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -5% 0px' });

  polaroids.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`;
    polIO.observe(p);
  });

  // About chips — only fade in (they already have rotate(--r) transform)
  const chips = document.querySelectorAll('.chip');
  const chipIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('anim-in');
      chipIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -3% 0px' });

  chips.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transition = `opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`;
    chipIO.observe(c);
  });
}

/* ── 3. anim-in shared handler (MutationObserver-free approach) ───── */
// We use direct class toggling instead; the transition is already set inline.
// Attach a one-shot observer that applies the "visible" state when class is added.
function watchAnimIn() {
  // cards, notes, skills, etc.
  const style = document.createElement('style');
  style.textContent = `
    /* Project cards and skill items: both opacity + transform reset */
    .pt.anim-in,
    .sk.anim-in,
    .skgroup.anim-in-group {
      opacity: 1 !important;
      transform: none !important;
    }
    /* Elements with permanent rotations: only opacity */
    .note.anim-in,
    .card.anim-in,
    .chip.anim-in,
    .polaroid.anim-in-pol {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
}

/* ── 4. Magnetic project cards ────────────────────────────────────── */
function initMagneticCards() {
  if (prefersReducedMotion) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.pt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── 5. Tape bands auto-play on scroll proximity ──────────────────── */
function initTapeBandAutoPlay() {
  if (prefersReducedMotion) return;

  const bands = document.querySelectorAll('.tape-band');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const trk = e.target.querySelector('.trk');
      if (!trk) return;
      trk.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
    });
  }, { rootMargin: '200px 0px 200px 0px' });

  bands.forEach((b) => io.observe(b));
}

/* ── 6. Pulsing status dot ─────────────────────────────────────────── */
function initStatusDot() {
  const status = document.querySelector('.status');
  if (!status) return;

  const dot = document.createElement('span');
  dot.setAttribute('aria-hidden', 'true');
  dot.className = 'status-pulse';
  status.prepend(dot);
}

/* ── 7. Floating tag hover lift ───────────────────────────────────── */
function initTagHover() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.tag.float, .mob .tag').forEach((tag) => {
    tag.style.transition = 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1)';
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = `rotate(0deg) translateY(-4px)`;
      tag.style.boxShadow = '3px 4px 0 rgba(18,18,18,.25)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
      tag.style.boxShadow = '';
    });
  });
}

/* ── 8. Button press feedback ─────────────────────────────────────── */
function initButtonFeedback() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.btn, .cta').forEach((btn) => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translate(2px, 2px) scale(0.98)';
    });
    ['mouseup', 'mouseleave'].forEach((ev) => {
      btn.addEventListener(ev, () => {
        btn.style.transform = '';
      });
    });
  });
}

/* ── 9. Spark continuous float ─────────────────────────────────────── */
function initSparkFloat() {
  if (prefersReducedMotion) return;

  const sparks = document.querySelectorAll('.spark');
  sparks.forEach((s, i) => {
    const delay = i * 0.4;
    const dur = 3.5 + i * 0.7;
    s.style.animation = `sparkFloat ${dur}s cubic-bezier(0.45, 0, 0.55, 1) ${delay}s infinite`;
  });
}

/* ── 10. Squiggle / SVG path "draw" enhancement ───────────────────── */
// Already handled by reveal.js + dividers.css, but we add a colour flash
function initSquiggleFlash() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.sq path').forEach((path) => {
    path.style.transition += ', stroke 0.4s ease 1.3s';
  });
}

/* ── Init all ──────────────────────────────────────────────────────── */
export function initAnimations() {
  watchAnimIn();
  initNameboxDraw();
  initSectionEntrances();
  initMagneticCards();
  initTapeBandAutoPlay();
  initStatusDot();
  initTagHover();
  initButtonFeedback();
  initSparkFloat();
  initSquiggleFlash();
}
