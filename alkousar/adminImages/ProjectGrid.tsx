// components/ProjectGrid.tsx
'use client'
import { useEffect, useState } from 'react'
import { supabase, Project } from '../lib/supabase'
import ProjectCard from './ProjectCard'

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()

    const channel = supabase
      .channel('project-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchProjects)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_images' }, fetchProjects)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_images(*)')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (!error && data) setProjects(data as Project[])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-medium">No projects published yet.</p>
        <p className="text-sm mt-2">Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}