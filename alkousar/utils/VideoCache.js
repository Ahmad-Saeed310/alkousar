// utils/videoCache.js
const cache = new Map(); // persists across route changes as long as the tab stays open

export function getCachedVideoUrl(src) {
  return cache.get(src) || null;
}

export async function preloadVideoAsBlob(src) {
  if (cache.has(src)) return cache.get(src);

  const response = await fetch(src);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  cache.set(src, blobUrl);
  return blobUrl;
}