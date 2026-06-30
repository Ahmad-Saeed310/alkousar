// components/LayoutPicker.tsx
'use client'
import { Layout } from '../lib/supabase'
import { LAYOUT_OPTIONS } from '../lib/layout'

export default function LayoutPicker({
  value,
  onChange,
}: {
  value: Layout
  onChange: (l: Layout) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {LAYOUT_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-colors ${
            value === opt.value
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
          }`}
        >
          {/* Mini visual swatch of the ratio */}
          <div className="w-8 h-8 flex items-center justify-center">
            <div
              className={`bg-current opacity-70 rounded-sm ${
                opt.value === 'square' ? 'w-5 h-5' :
                opt.value === 'landscape' ? 'w-7 h-5' :
                opt.value === 'portrait' ? 'w-5 h-7' :
                'w-7 h-3'
              }`}
            />
          </div>
          <span className="text-[11px] font-medium leading-none">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}