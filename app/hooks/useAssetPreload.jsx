// hooks/useAssetPreload.js
"use client";
import { useEffect, useState } from "react";

// const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
const isVideo = (src) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

export function useAssetPreload(assetPaths = [], minDuration = 1200) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (assetPaths.length === 0) {
      setProgress(100);
      setIsDone(true);
      return;
    }

    let loadedCount = 0;
    const startTime = Date.now();

    const updateProgress = () => {
      loadedCount += 1;
      const pct = Math.round((loadedCount / assetPaths.length) * 100);
      setProgress(pct);
      if (loadedCount === assetPaths.length) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(minDuration - elapsed, 0);
        setTimeout(() => setIsDone(true), remaining);
      }
    };

    assetPaths.forEach((src) => {
      if (isVideo(src)) {
        const vid = document.createElement("video");
        vid.src = src;
        vid.preload = "auto";
        vid.oncanplaythrough = updateProgress;
        vid.onloadeddata = updateProgress; // fires first, guards slow networks
        vid.onerror = updateProgress;
        // avoid double-count if both events fire
        let fired = false;
        const once = () => {
          if (fired) return;
          fired = true;
          updateProgress();
        };
        vid.oncanplaythrough = once;
        vid.onloadeddata = once;
        vid.onerror = once;
      } else {
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    });
  }, [assetPaths, minDuration]);

  return { progress, isDone };
}