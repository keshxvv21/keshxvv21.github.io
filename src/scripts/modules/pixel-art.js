// Pixel-art icons drawn as crisp SVG. Add a new icon by adding a grid below.
// Legend: '#' ink, 'o' white, 'y' yellow, 'p' pink, '.' empty.
const ART={
mac:['.##########.','#oooooooooo#','#o########o#','#o#oooooo#o#','#o#o#oo#o#o#','#o#oooooo#o#','#o#o####o#o#','#o########o#','#oooooooooo#','############'],
floppy:['###########.','#o#####ooo##','#o#####ooo##','#o#####ooo##','#oooooooooo#','#oooooooooo#','#o########o#','#o#oooooo#o#','#o#oooooo#o#','#o#oooooo#o#','#o#oooooo#o#','############'],
smile:['...######...','..#yyyyyy#..','.#yyyyyyyy#.','#yyy#yy#yyy#','#yyy#yy#yyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','#y#yyyyyy#y#','#yy#yyyy#yy#','.#yy####yy#.','..#yyyyyy#..','...######...']};
ART.folder=['.####.......','#yyyy#######','#yyyyyyyyyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','#yyyyyyyyyy#','############'];
ART.heart=['..###...###..','.#ppp#.#ppp#.','#ppppp#ppppp#','#ppppppppppp#','#ppppppppppp#','.#ppppppppp#.','..#ppppppp#..','...#ppppp#...','....#ppp#....','.....#p#.....','......#......'];

const FILL = { '#': '#121212', o: '#fff', y: '#F5C842', p: '#F0488E' };

/** Build the SVG markup for an icon. `scale` = screen pixels per art pixel. */
export function pixelSvg(name, scale) {
  const grid = ART[name];
  const w = grid[0].length;
  const h = grid.length;
  let rects = '';
  grid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (FILL[c]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${FILL[c]}"/>`;
    })
  );
  return `<svg viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

/** Replace every <i data-px="name" data-s="scale"> with its icon. */
export function initPixelArt() {
  document.querySelectorAll('[data-px]').forEach((el) => {
    el.style.display = 'inline-flex';
    el.innerHTML = pixelSvg(el.dataset.px, +(el.dataset.s || 4));
  });
}
