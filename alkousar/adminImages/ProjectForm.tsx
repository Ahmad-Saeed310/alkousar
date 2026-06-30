// components/ProjectForm.tsx
'use client'
import { useState } from 'react'
import { supabase, Project, DraftImage } from '../lib/supabase'
import ImageSlotEditor from './ImageSlotEditor'

type Props = {
  onSuccess: () => void
  editProject?: Project | null
  onCancelEdit?: () => void
}

function emptyImage(): DraftImage {
  return {
    tempId: crypto.randomUUID(),
    file: null,
    previewUrl: '',
    existingUrl: null,
    title: '',
    description: '',
    extra_text: '',
    layout: 'square',
  }
}

export default function ProjectForm({ onSuccess, editProject, onCancelEdit }: Props) {
  const isEditing = !!editProject

  const [title, setTitle] = useState(editProject?.title || '')
  const [description, setDescription] = useState(editProject?.description || '')
  const [published, setPublished] = useState(editProject?.published ?? true)
  const [images, setImages] = useState<DraftImage[]>(() => {
    if (editProject?.project_images?.length) {
      return editProject.project_images
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => ({
          tempId: crypto.randomUUID(),
          id: img.id,
          file: null,
          previewUrl: img.image_url,
          existingUrl: img.image_url,
          title: img.title || '',
          description: img.description || '',
          extra_text: img.extra_text || '',
          layout: img.layout,
        }))
    }
    return [emptyImage()]
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // How many image slots the admin wants (1-20)
  function setImageCount(count: number) {
    setImages(prev => {
      const next = [...prev]
      while (next.length < count) next.push(emptyImage())
      while (next.length > count) next.pop()
      return next
    })
  }

  function updateImage(tempId: string, updated: DraftImage) {
    setImages(prev => prev.map(img => img.tempId === tempId ? updated : img))
  }

  function removeImage(tempId: string) {
    setImages(prev => prev.length > 1 ? prev.filter(img => img.tempId !== tempId) : prev)
  }

  function addImage() {
    if (images.length >= 20) return
    setImages(prev => [...prev, emptyImage()])
  }

  async function uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from('content-images').upload(fileName, file)
    if (error) throw new Error('Image upload failed: ' + error.message)
    const { data } = supabase.storage.from('content-images').getPublicUrl(fileName)
    return data.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Project title is required'); return }
    if (images.some(img => !img.file && !img.existingUrl)) {
      setError('Every image slot needs an image uploaded')
      return
    }

    setLoading(true)
    setError('')

    try {
      let projectId = editProject?.id

      if (isEditing && projectId) {
        const { error } = await supabase
          .from('projects')
          .update({ title, description, published })
          .eq('id', projectId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([{ title, description, published }])
          .select()
          .single()
        if (error) throw error
        projectId = data.id
      }

      // Upload any new files first
      const resolvedImages = await Promise.all(
        images.map(async (img, idx) => {
          const image_url = img.file ? await uploadImage(img.file) : img.existingUrl!
          return { ...img, image_url, sort_order: idx }
        })
      )

      // Remove images that existed before but were deleted from the form
      if (isEditing && editProject?.project_images) {
        const keptIds = resolvedImages.filter(i => i.id).map(i => i.id)
        const toDelete = editProject.project_images
          .filter(orig => !keptIds.includes(orig.id))
          .map(orig => orig.id)
        if (toDelete.length) {
          await supabase.from('project_images').delete().in('id', toDelete)
        }
      }

      // Upsert each image row
      for (const img of resolvedImages) {
        if (img.id) {
          const { error } = await supabase
            .from('project_images')
            .update({
              image_url: img.image_url,
              title: img.title,
              description: img.description,
              extra_text: img.extra_text,
              layout: img.layout,
              sort_order: img.sort_order,
            })
            .eq('id', img.id)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('project_images')
            .insert([{
              project_id: projectId,
              image_url: img.image_url,
              title: img.title,
              description: img.description,
              extra_text: img.extra_text,
              layout: img.layout,
              sort_order: img.sort_order,
            }])
          if (error) throw error
        }
      }

      // Reset
      setTitle('')
      setDescription('')
      setPublished(true)
      setImages([emptyImage()])
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEditing ? '✏️ Edit Project' : '➕ New Project'}
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Project-level fields */}
      <div className="space-y-4 pb-6 border-b border-gray-100">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Downtown Office Renovation"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project Details
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Overall description of this project..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-semibold text-gray-800 text-sm">Publish immediately</p>
            <p className="text-xs text-gray-500">Users will see this on the public page</p>
          </div>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${published ? 'bg-indigo-600' : 'bg-gray-300'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${published ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Image count selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            Number of images: <span className="text-indigo-600">{images.length}</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setImageCount(Math.max(1, images.length - 1))}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={20}
              value={images.length}
              onChange={e => setImageCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
              className="w-14 text-center border border-gray-200 rounded-lg py-1.5 text-sm"
            />
            <button
              type="button"
              onClick={addImage}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Image slots */}
      <div className="space-y-4">
        {images.map((img, idx) => (
          <ImageSlotEditor
            key={img.tempId}
            index={idx}
            image={img}
            onChange={(updated) => updateImage(img.tempId, updated)}
            onRemove={() => removeImage(img.tempId)}
          />
        ))}
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Publish Project'}
        </button>
        {isEditing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}