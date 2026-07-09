// components/ImageSlotEditor.tsx
'use client'
import { DraftImage, Layout } from '../lib/supabase'
import LayoutPicker from './LayoutPicker'

export default function ImageSlotEditor({
  index,
  image,
  onChange,
  onRemove,
}: {
  index: number
  image: DraftImage
  onChange: (updated: DraftImage) => void
  onRemove: () => void
}) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange({
      ...image,
      file,
      previewUrl: URL.createObjectURL(file),
    })
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 relative">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200">
          Image {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
        >
          ✕ Remove
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
        {/* Image upload / preview */}
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center relative overflow-hidden bg-white hover:border-indigo-400 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {image.previewUrl ? (
              <img src={image.previewUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">🖼️</span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 text-center">
            Click to {image.previewUrl ? 'change' : 'upload'}
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Image title"
            value={image.title}
            onChange={e => onChange({ ...image, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Short description"
            value={image.description}
            onChange={e => onChange({ ...image, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Additional text (optional, longer notes)"
            value={image.extra_text}
            onChange={e => onChange({ ...image, extra_text: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* Orientation picker */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-600 mb-2">Image orientation</p>
        <div className="flex gap-2">
          {(['landscape', 'portrait'] as const).map((option) => {
            const isSelected = image.orientation === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...image, orientation: option })}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all
                  ${isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
              >
                {/* Visual icon hinting at orientation */}
                <span
                  className={`
                    inline-block rounded-sm border-2 shrink-0
                    ${isSelected ? 'border-indigo-400' : 'border-gray-300'}
                    ${option === 'landscape' ? 'w-6 h-4' : 'w-4 h-6'}
                  `}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Layout picker */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-600 mb-2">Layout proportion</p>
        <LayoutPicker
          value={image.layout}
          onChange={(layout: Layout) => onChange({ ...image, layout })}
        />
      </div>
    </div>
  )
}