
'use client'

import { useEffect, useState } from 'react'
import { supabase, Project } from '@/lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })

    console.log(data)
    console.log(error)

    if (data) setProjects(data)

    setLoading(false)
  }

  return { projects, loading, }
}