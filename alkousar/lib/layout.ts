// lib/layout.ts
import { Layout } from './supabase'

export const LAYOUT_OPTIONS: { value: Layout; label: string; ratioClass: string; icon: string }[] = [
  { value: 'square',    label: 'Square',      ratioClass: 'aspect-square',  icon: '⬜' },
  { value: 'landscape', label: 'Landscape',   ratioClass: 'aspect-[4/3]',   icon: '▭' },
  { value: 'portrait',  label: 'Portrait',    ratioClass: 'aspect-[3/4]',   icon: '▯' },
  { value: 'wide',      label: 'Wide banner', ratioClass: 'aspect-[16/6]', icon: '▬' },
]

export function getRatioClass(layout: Layout): string {
  return LAYOUT_OPTIONS.find(o => o.value === layout)?.ratioClass || 'aspect-square'
}

// Wide images span the full grid width; others sit in the grid normally
export function getSpanClass(layout: Layout): string {
  return layout === 'wide' ? 'col-span-full' : ''
}