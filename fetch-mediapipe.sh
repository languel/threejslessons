#!/bin/sh
# Fetches MediaPipe Tasks Vision runtime + models into vendor/mediapipe and the depth model + runtimes into vendor/depth (git-ignored, ~145 MB).
# Versions are pinned to the ones the lessons were tested with.
set -e
cd "$(dirname "$0")/vendor/mediapipe"; mkdir -p wasm models
T=$(mktemp -d); (cd "$T" && npm pack @mediapipe/tasks-vision@1.2.0 >/dev/null 2>&1 && tar xzf *.tgz)
cp "$T/package/vision_bundle.mjs" .; cp "$T/package/wasm/vision_wasm_internal."* wasm/
B=https://storage.googleapis.com/mediapipe-models; cd models
curl -sfLO $B/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task
curl -sfLO $B/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task
curl -sfLO $B/face_landmarker/face_landmarker/float16/latest/face_landmarker.task

# Depth model + transformers.js runtime for lesson 03 (vendor/depth, git-ignored, ~60 MB)
cd ../../..; D=vendor/depth; M=$D/models/onnx-community/depth-anything-v2-small; mkdir -p $M/onnx $D/ort
R=https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/main
curl -sfL $R/config.json -o $M/config.json; curl -sfL $R/preprocessor_config.json -o $M/preprocessor_config.json
curl -sfL $R/onnx/model_quantized.onnx -o $M/onnx/model_quantized.onnx
T=$(mktemp -d); (cd "$T" && npm pack @huggingface/transformers@4.3.0 >/dev/null 2>&1 && tar xzf *.tgz)
cp "$T/package/dist/transformers.min.js" $D/
(cd "$T" && npm pack onnxruntime-web@1.31.0-dev.20260914-8d85527a0 >/dev/null 2>&1 && mkdir ort && tar xzf onnxruntime-web-*.tgz -C ort)
cp "$T"/ort/package/dist/ort-wasm-simd-threaded.* $D/ort/
