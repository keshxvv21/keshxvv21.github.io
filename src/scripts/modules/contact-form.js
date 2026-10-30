// Contact form: validates, then either posts to a form service (if configured)
// or opens the visitor's email app with the message filled in.
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config.js';
import { burst } from '../playground/confetti.js';

const RULES = {
  name: (v) => (v.trim() ? '' : 'Please enter your name.'),
  email: (v) => (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Please write at least a short message.'),
};

function validate(form) {
  let ok = true;
  for (const key in RULES) {
    const field = form.elements[key];
    const error = RULES[key](field.value);
    document.getElementById('e-' + key).textContent = error;
    field.setAttribute('aria-invalid', error ? 'true' : 'false');
    if (error) ok = false;
  }
  return ok;
}

function openMailClient(form) {
  const f = form.elements;
  const body = encodeURIComponent(f.message.value + '\n\n' + f.name.value + '\n' + f.email.value);
  const subject = encodeURIComponent('Portfolio message from ' + f.name.value);
  location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

async function sendToService(form) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
  });
  if (!res.ok) throw new Error('Form service returned ' + res.status);
}

export function initContactForm() {
  const form = document.getElementById('contact');
  if (!form) return;
  const out = form.querySelector('.fmsg');
  const button = form.querySelector('button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate(form)) {
      out.textContent = 'Fix the highlighted fields and try again.';
      return;
    }
    const r = button.getBoundingClientRect();
    const celebrate = () => burst(r.left + r.width / 2, r.top, 44);

    if (!FORM_ENDPOINT) {
      out.textContent = 'Opening your email app with the message filled in.';
      celebrate();
      openMailClient(form);
      return;
    }

    button.disabled = true;
    out.textContent = 'Sending...';
    try {
      await sendToService(form);
      out.textContent = 'Thanks, your message was sent.';
      form.reset();
      celebrate();
    } catch (err) {
      out.textContent = `Could not send. Please email me at ${CONTACT_EMAIL} instead.`;
    } finally {
      button.disabled = false;
    }
  });
}
