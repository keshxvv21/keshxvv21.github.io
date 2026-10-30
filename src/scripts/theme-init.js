// Runs before first paint (classic script, loaded in <head>) so the page
// never flashes the wrong theme. The toggle itself lives in modules/theme.js.
try {
  var t = localStorage.getItem('theme');
  if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
