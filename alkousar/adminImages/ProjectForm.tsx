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
    orientation: 'landscape',
  }
}

export default function ProjectForm({ onSuccess, editProject, onCancelEdit }: Props) {
  const isEditing = !!editProject

  const [title, setTitle] = useState(editProject?.title || '')
  const [description, setDescription] = useState(editProject?.description || '')
  const [published, setPublished] = useState(editProject?.published ?? true)

  // ── New project detail fields ──────────────────────────────
  const [projectType, setProjectType] = useState(editProject?.project_type || '')
  const [buildTime, setBuildTime] = useState(editProject?.build_time || '')
  const [deliveredAt, setDeliveredAt] = useState(editProject?.delivered_at || '')
  const [scale, setScale] = useState(editProject?.scale || '')
  const [location, setLocation] = useState(editProject?.location || '')
  const [teamMembers, setTeamMembers] = useState<string[]>(
    editProject?.team_members?.length ? editProject.team_members : ['']
  )

  function updateTeamMember(index: number, value: string) {
    setTeamMembers(prev => prev.map((m, i) => (i === index ? value : m)))
  }

  function addTeamMember() {
    setTeamMembers(prev => [...prev, ''])
  }

  function removeTeamMember(index: number) {
    setTeamMembers(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }
  // ────────────────────────────────────────────────────────────

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
          orientation: img.orientation || 'landscape',
        }))
    }
    return [emptyImage()]
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

      // Clean team members: drop empty strings
      const cleanedTeamMembers = teamMembers.map(m => m.trim()).filter(Boolean)

      const projectPayload = {
        title,
        description,
        published,
        project_type: projectType || null,
        build_time: buildTime || null,
        delivered_at: deliveredAt || null,
        scale: scale || null,
        location: location || null,
        team_members: cleanedTeamMembers,
      }

      if (isEditing && projectId) {
        const { error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', projectId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectPayload])
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
              orientation: img.orientation,
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
              orientation: img.orientation,
              sort_order: img.sort_order,
            }])
          if (error) throw error
        }
      }

      // Reset
      setTitle('')
      setDescription('')
      setPublished(true)
      setProjectType('')
      setBuildTime('')
      setDeliveredAt('')
      setScale('')
      setLocation('')
      setTeamMembers([''])
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
        {isEditing ? ' Edit Project' : ' New Project'}
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
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project Story / Detail
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="The full story behind this project — vision, challenges, approach..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
          />
        </div>

        {/* Type / Build time / Delivered / Scale / Location grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <input
              type="text"
              value={projectType}
              onChange={e => setProjectType(e.target.value)}
              placeholder="e.g. Residential, Commercial, Interior"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Build Time
            </label>
            <input
              type="text"
              value={buildTime}
              onChange={e => setBuildTime(e.target.value)}
              placeholder="e.g. 8 months"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivered (Year / Date)
            </label>
            <input
              type="text"
              value={deliveredAt}
              onChange={e => setDeliveredAt(e.target.value)}
              placeholder="e.g. 2025 or March 2025"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Scale / Area
            </label>
            <input
              type="text"
              value={scale}
              onChange={e => setScale(e.target.value)}
              placeholder="e.g. 5,200 sq ft"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Sector C, DHA Bahawalpur"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
        </div>

        {/* Team members — dynamic list */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Team Members
          </label>
          <div className="space-y-2">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={member}
                  onChange={e => updateTeamMember(idx, e.target.value)}
                  placeholder={`Team member ${idx + 1} name`}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                <button
                  type="button"
                  onClick={() => removeTeamMember(idx)}
                  disabled={teamMembers.length === 1}
                  className="px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTeamMember}
            className="mt-2 text-sm font-medium text-stone-900 hover:text-stone-700"
          >
            + Add team member
          </button>
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
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${published ? 'bg-stone-900' : 'bg-gray-300'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${published ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Image count selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            Number of images: <span className="text-stone-900">{images.length}</span>
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
          className="flex-1 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-400 text-white font-semibold py-3 rounded-xl transition-colors"
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