// components/BlogForm.tsx
'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { supabase, BlogPost } from '../lib/supabase'

type Props = {
  onSuccess: () => void
  editPost?: BlogPost | null
  onCancelEdit?: () => void
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogForm({ onSuccess, editPost, onCancelEdit }: Props) {
  const isEditing = !!editPost

  const [title, setTitle] = useState(editPost?.title || '')
  const [slug, setSlug] = useState(editPost?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [excerpt, setExcerpt] = useState(editPost?.excerpt || '')
  const [content, setContent] = useState(editPost?.content || '')
  const [author, setAuthor] = useState(editPost?.author || '')
  const [tagsInput, setTagsInput] = useState((editPost?.tags || []).join(', '))
  const [published, setPublished] = useState(editPost?.published ?? true)
  const [showPreview, setShowPreview] = useState(false)

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState(editPost?.cover_image_url || '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true)
    setSlug(slugify(value))
  }

  function handleCoverChange(file: File | null) {
    setCoverFile(file)
    if (file) setCoverPreview(URL.createObjectURL(file))
  }

  async function uploadCover(file: File): Promise<string> {
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from('content-images').upload(fileName, file)
    if (error) throw new Error('Cover image upload failed: ' + error.message)
    const { data } = supabase.storage.from('content-images').getPublicUrl(fileName)
    return data.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Post title is required'); return }
    if (!slug.trim()) { setError('Slug is required'); return }
    if (!coverFile && !coverPreview) { setError('A cover image is required'); return }

    setLoading(true)
    setError('')

    try {
      const cover_image_url = coverFile ? await uploadCover(coverFile) : coverPreview

      const cleanedTags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const postPayload = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image_url,
        author: author || null,
        tags: cleanedTags,
        published,
        published_at: published ? (editPost?.published_at ?? new Date().toISOString()) : null,
      }

      if (isEditing && editPost?.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postPayload)
          .eq('id', editPost.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postPayload])
        if (error) throw error
      }

      // Reset
      setTitle('')
      setSlug('')
      setSlugTouched(false)
      setExcerpt('')
      setContent('')
      setAuthor('')
      setTagsInput('')
      setPublished(true)
      setCoverFile(null)
      setCoverPreview('')
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
        {isEditing ? ' Edit Post' : ' New Post'}
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4 pb-6 border-b border-gray-100">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="e.g. 5 Things to Check Before Buying a Plot in DHA"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="5-things-to-check-before-buying-a-plot"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <p className="text-xs text-gray-400 mt-1">Used in the URL: /blog/{slug || 'your-slug'}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="One or two sentences shown on the blog listing page"
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(v => !v)}
              className="text-xs font-medium text-stone-900 hover:text-stone-700"
            >
              {showPreview ? '✏️ Edit' : '👁️ Preview'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            Markdown supported — headings, **bold**, lists, &gt; quotes, tables, and images.
          </p>

          {showPreview ? (
            <div className="w-full min-h-[240px] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 space-y-3 overflow-auto">
              {content.trim() ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => <h1 className="text-xl font-bold text-gray-900" {...props} />,
                    h2: (props) => <h2 className="text-lg font-bold text-gray-900" {...props} />,
                    h3: (props) => <h3 className="text-base font-bold text-gray-900" {...props} />,
                    p: (props) => <p className="text-sm text-gray-700 leading-relaxed" {...props} />,
                    a: (props) => <a className="text-stone-900 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    ul: (props) => <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1" {...props} />,
                    blockquote: (props) => <blockquote className="border-l-2 border-gray-300 pl-3 italic text-gray-500" {...props} />,
                    // eslint-disable-next-line @next/next/no-img-element
                    img: ({ alt, ...props }) => <img alt={alt || ''} className="w-full h-auto rounded-lg" {...props} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400 text-sm italic">Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={'## A short intro\n\nWrite your post in markdown — **bold**, *italic*, [links](https://example.com), lists, and ![captions](image-url) all work.'}
              rows={10}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="e.g. Kashif Rehmat"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="Investment, DHA Bahawalpur, Guide"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleCoverChange(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-stone-50 file:text-stone-900 file:font-medium hover:file:bg-stone-100"
          />
          {coverPreview && (
            <img src={coverPreview} alt="" className="mt-3 h-32 w-full object-cover rounded-xl border border-gray-100" />
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-semibold text-gray-800 text-sm">Publish immediately</p>
            <p className="text-xs text-gray-500">Visible on /blog as soon as this is saved</p>
          </div>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${published ? 'bg-stone-900' : 'bg-stone-300'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${published ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-stone-900 hover:bg-stone-900 disabled:bg-stone-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
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
