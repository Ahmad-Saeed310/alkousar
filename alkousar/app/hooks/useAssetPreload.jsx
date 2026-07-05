// hooks/useAssetPreload.js
"use client";
import { useEffect, useState } from "react";

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
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // don't hang the loader if one 404s
    });
  }, [assetPaths, minDuration]);

  return { progress, isDone };
}