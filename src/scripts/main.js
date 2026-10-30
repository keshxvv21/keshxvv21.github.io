// Entry point: wires up every feature. Each module is independent.
import { initPixelArt } from './modules/pixel-art.js';
import { initReveal } from './modules/reveal.js';
import { initTheme } from './modules/theme.js';
import { initContactForm } from './modules/contact-form.js';
import { initScrollEffects } from './modules/scroll-effects.js';
import { initActiveNav } from './modules/nav.js';
import { initPlayground } from './playground/index.js';
import { initAnimations } from './modules/animations.js';

initPixelArt();
initReveal();
initTheme();
initContactForm();
initScrollEffects();
initPlayground();
initActiveNav();
initAnimations();
