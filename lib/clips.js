import { Playback } from './body.js';
// Public-domain films from the Mediathèque (languel/mediatheque), streamed over CORS.
export const MT = 'https://languel.github.io/mediatheque/items/';
export const CLIPS = { 'danse serpentine (Lumière 1897)': 'danse-serpentine-lumiere-1897', 'Sandow (1894)': 'sandow-1894', 'the kiss (Edison 1896)': 'edison-may-irwin-kiss-1896',
  '« Je vous aime » face (Demenÿ 1891)': 'animdemeny-je-vous-aime-planche',
  'Hugo Ball, Karawane (1916, a photograph)': 'hugo-ball',
  'hurdles (Marey 1900)': 'marey-alvin-kraenzlein-haies-1900', 'discus (Marey 1900)': 'lancement-du-disque-par-l-athlete-americain-mccraken-1900' };

// Items that are a photograph, not a film: shown to a <video> as a stream of that one picture, so the tracker and every lesson treat it like a clip.
export const STILLS = { 'hugo-ball': 'media.webp' };
// A photograph the pose model cannot read (a cardboard costume hides the body) comes with a pose written by hand from the picture, in the recording format.
export const STILL_POSES = { 'hugo-ball': 'data/hugo-ball.pose.json' };

/** Put a Mediathèque item into a <video>: its film, or (for a photograph) a canvas stream of the picture. Resolves once it is playing. */
export async function playClip(video, id) {
  clearInterval(video._still); video._recorded = null;
  if (!(id in STILLS)) { video.srcObject = null; video.src = MT + id + '/proxy.webm'; await video.play(); return; }
  const img = new Image(); img.crossOrigin = 'anonymous'; img.src = MT + id + '/' + STILLS[id];
  await img.decode();
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext('2d'), draw = () => g.drawImage(img, 0, 0);
  draw(); clearInterval(video._still); video._still = setInterval(draw, 40);   // redrawn so the stream keeps delivering frames
  if (STILL_POSES[id]) video._recorded = new Playback(await (await fetch(STILL_POSES[id])).json());   // the tracker reads this instead of looking at the picture
  video.removeAttribute('src'); video.srcObject = c.captureStream(25); await video.play();
}
