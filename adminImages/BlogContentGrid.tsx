// hooks/useBlogPosts.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase, BlogPost } from '@/lib/supabase'

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    if (data) setPosts(data)

    setLoading(false)
  }

  return { posts, loading }
}
