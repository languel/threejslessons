// Webcam and film-clip sources for a <video>. Calls onStart(mirror) once frames are flowing.
import { MT, CLIPS, playClip } from './clips.js';

export function bindSources({ video, camBtn, clipSel, load, onStart, status }) {
  camBtn.onclick = async () => {
    try {
      await load();
      clearInterval(video._still); video.src = ''; video.srcObject = await navigator.mediaDevices.getUserMedia({ video: { width: 960, height: 720 } });
      await video.play(); onStart(true, 'webcam');
    } catch (e) { status('webcam: ' + e.message); }
  };
  clipSel.add(new Option('clip…', ''));
  for (const [n, id] of Object.entries(CLIPS)) clipSel.add(new Option(n, id));
  clipSel.onchange = async () => {
    if (!clipSel.value) return;
    try {
      await load();
      await playClip(video, clipSel.value);
      onStart(false, clipSel.selectedOptions[0].text);
    } catch (e) { status('clip: ' + e.message); console.error(e); }
  };
}
