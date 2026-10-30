// State shared between the drag and stamp features.

/** Elements that can be picked up and thrown around. */
export const DRAGGABLE = '.polaroid,.postit,.tag,.note,.chip,.mini,.sk';

export const state = { moved: false };

/** Fade out the "drag the stickers" hint after the first interaction. */
export function hideHint() {
  const hint = document.querySelector('.hint');
  if (hint) hint.classList.add('gone');
}
