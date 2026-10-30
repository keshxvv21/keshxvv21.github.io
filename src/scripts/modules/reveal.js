// Scroll-triggered reveals: fade-up blocks, heading wipes, tape bands, squiggles.

function watch(selector, rootMargin, { prepare } = {}) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin }
  );
  document.querySelectorAll(selector).forEach((el) => {
    if (prepare) prepare(el);
    io.observe(el);
  });
}

export function initReveal() {
  // Fade-up blocks
  watch('.head,.about .words,.lets h2,.lets .smile', '0px 0px 15% 0px', {
    prepare: (el) => el.classList.add('rv'),
  });

  // Big headings slide up from behind a mask
  document.querySelectorAll('h2.pix').forEach((h) => {
    h.innerHTML = '<span class="wipe"><span>' + h.innerHTML + '</span></span>';
  });

  // Squiggle dividers draw themselves in
  watch('.sq', '0px 0px 10% 0px');

  // Tape bands start fully clipped, and browsers never report a fully clipped
  // element as visible. So we watch an empty marker placed just before each band.
  const bandIO = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target._band.classList.add('in');
        bandIO.unobserve(e.target);
      }),
    { rootMargin: '0px 0px 10% 0px' }
  );
  document.querySelectorAll('.tape-band').forEach((band) => {
    const marker = document.createElement('div');
    marker.setAttribute('aria-hidden', 'true');
    marker._band = band;
    band.before(marker);
    bandIO.observe(marker);
  });
}