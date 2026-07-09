  // lib/supabase.ts
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  export const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // ── Types ──────────────────────────────────────

  export type Layout = 'square' | 'landscape' | 'portrait' | 'wide'

  export type ProjectImage = {
    id: string
    project_id: string
    image_url: string
    title: string | null
    description: string | null
    extra_text: string | null
    layout: Layout
    orientation: 'landscape' | 'portrait'
    sort_order: number
    created_at: string
  }

export type Project = {
  id: string
  title: string
  description: string | null
  published: boolean
  created_at: string
  project_type: string | null
  build_time: string | null
  delivered_at: string | null
  scale: string | null
  location: string | null
  team_members: string[]
  project_images?: ProjectImage[]
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  author: string | null
  tags: string[]
  published: boolean
  created_at: string
  published_at: string | null
}

  // Used while building a project in the admin form, before saving
  export type DraftImage = {
    tempId: string          // local-only id for React keys before saving
    id?: string             // real DB id, present when editing existing image
    file: File | null       // new file to upload (null if unchanged existing image)
    previewUrl: string      // local object URL or existing image_url
    existingUrl: string | null // image_url already in DB, if editing
    title: string
    description: string
    extra_text: string
    layout: Layout
    orientation: 'landscape' | 'portrait'
  }