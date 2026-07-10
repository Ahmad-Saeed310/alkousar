// components/AdminBlogList.tsx
'use client'
import { useEffect, useState } from 'react'
import { supabase, BlogPost } from '../lib/supabase'

type Props = {
  refreshKey: number
  onEdit: (post: BlogPost) => void
}

export default function AdminBlogList({ refreshKey, onEdit }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchAll()
  }, [refreshKey])

  async function fetchAll() {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setPosts(data as BlogPost[])
    setLoading(false)
  }

  async function togglePublish(post: BlogPost) {
    const nextPublished = !post.published
    await supabase
      .from('blog_posts')
      .update({
        published: nextPublished,
        published_at: nextPublished ? (post.published_at ?? new Date().toISOString()) : post.published_at,
      })
      .eq('id', post.id)
    fetchAll()
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeletingId(id)
    await supabase.from('blog_posts').delete().eq('id', id)
    setDeletingId(null)
    fetchAll()
  }

  if (loading) return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl h-24 animate-pulse border border-gray-100" />)}
    </div>
  )

  if (posts.length === 0) return (
    <div className="text-center py-12 text-gray-400">
      
      <p>No posts yet. Write your first one!</p>
    </div>
  )

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-black mb-4">All Posts ({posts.length})</h3>
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-xl p-4 border border-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white bg-gray-100 flex-shrink-0">
              {post.cover_image_url ? (
                <img src={post.cover_image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">📄</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-black truncate">{post.title}</p>
              <p className="text-xs text-gray-400 truncate">
                /blog/{post.slug} ·{' '}
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
              post.published ? 'bg-green-100 text-black' : 'bg-gray-100 text-gray-500'
            }`}>
              {post.published ? 'Published' : 'Draft'}
            </span>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => togglePublish(post)}
                className="text-sm px-3 py-1.5 rounded-lg bg-stone-50  hover:bg-stone-100 transition-colors font-medium"
              >
                {post.published ? ' Hide' : ' Show'}
              </button>
              <button
                onClick={() => onEdit(post)}
                className="text-sm px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                disabled={deletingId === post.id}
                className="text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
              >
                {deletingId === post.id ? '...' : '🗑️ Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
