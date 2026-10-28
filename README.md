# Three.js for body and sound

Ten small, readable three.js programs, from a spinning cube to a body you can play and paint with. Each page has the live scene, controls, the key code highlighted, and a code view of the whole commented source. It exports three ways (see `tutorial-export.html`): one HTML file with everything inside, a `.zip` of plain ES modules with an import map to a CDN, or, for a real project, npm and a bundler.

| | |
|---|---|
| 00 | A spinning cube: the whole program |
| 01 | Anatomy of a scene: scene, camera, objects, materials, light |
| 02 | A body in the scene: MediaPipe landmarks live, from clips, or recorded |
| 03 | Pinboard: person mask and monocular depth drive a pin screen |
| 04 | The body in metres: depth and pose fused into one metric space |
| 05 | Laser harp: beams at measured distances, fingertips pluck notes (after Jean-Michel Jarre) |
| 06 | Body drum: pads on your own body (after Laurie Anderson) |
| 07 | Triadic costumes, with motion cleaning for performance (after Oskar Schlemmer) |
| 08 | One line: a face or figure drawn without lifting the pen (after Picasso) |
| 09 | Paint marks: points on the body leave strokes in space (after Ghostcatching) |
| ⇩ | Tutorial: one file you can double-click |

## Run

```
npm run models     # once: MediaPipe + depth models (about 145 MB, git-ignored)
npm start          # http://localhost:5199/
npm test           # the pure-logic modules (harp, body drum, motion, one-line, painter)
```

No model files are stored in this repository. `npm run models` fetches them (`fetch-mediapipe.sh`); the index page lists each file, where it goes and where it comes from, with a dot for whether it is present. Lessons 00 and 01 need nothing. Everything runs on your machine; nothing leaves it. Any static server works if it sends `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` (the depth model is faster with them); `serve.py` does.

three.js (r186) is vendored in `vendor/` so the pages run without a bundler or a network. `PLAN.md` holds the lesson conventions and the per-lesson findings.

## Sources

Webcam, public-domain films from the [Mediathèque](https://languel.github.io/mediatheque/), or recorded landmarks (no camera needed). Includes Demenÿ's « Je vous aime » (1891, a close-up of a face, for lesson 08) and a photograph of Hugo Ball in his cardboard costume (1916, for the costumes in lesson 07: the pose model cannot see a body inside a cylinder, so the picture comes with a pose written by hand).

## With Artist–Model Studio

[Artist–Model Studio](https://github.com/languel/artistmodelstudio) has a three.js board kind: a board whose code is a three.js sketch (an ES module that imports `three` and common addons), running live beside p5.js and studio-script boards. The sketches in these lessons are written to move there: `lib/` holds the reusable parts.
