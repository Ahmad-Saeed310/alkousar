// components/AdminProjectList.tsx
'use client'
import { useEffect, useState } from 'react'
import { supabase, Project } from '../lib/supabase'

type Props = {
  refreshKey: number
  onEdit: (project: Project) => void
}

export default function AdminProjectList({ refreshKey, onEdit }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchAll()
  }, [refreshKey])

  async function fetchAll() {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_images(*)')
      .order('created_at', { ascending: false })

    if (!error && data) setProjects(data as Project[])
    setLoading(false)
  }

  async function togglePublish(project: Project) {
    await supabase.from('projects').update({ published: !project.published }).eq('id', project.id)
    fetchAll()
  }

  async function deleteProject(id: string) {
    if (!confirm('Delete this project and all its images? This cannot be undone.')) return
    setDeletingId(id)
    await supabase.from('projects').delete().eq('id', id) // cascades to project_images
    setDeletingId(null)
    fetchAll()
  }

  if (loading) return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl h-24 animate-pulse border border-gray-100" />)}
    </div>
  )

  if (projects.length === 0) return (
    <div className="text-center py-12 text-gray-400">
    
      <p>No projects yet. Add your first one!</p>
    </div>
  )

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 mb-4">All Projects ({projects.length})</h3>
      {projects.map(project => (
        <div key={project.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-stone-200 transition-colors">
          <div className="flex items-center gap-4">
            {/* Thumbnail strip */}
            <div className="flex -space-x-3 flex-shrink-0">
              {(project.project_images || []).slice(0, 3).map(img => (
                <div key={img.id} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white bg-gray-100">
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {(project.project_images?.length || 0) === 0 && (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">📄</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-black truncate">{project.title}</p>
              <p className="text-xs text-gray-400">
                {project.project_images?.length || 0} image{(project.project_images?.length || 0) !== 1 ? 's' : ''} ·{' '}
                {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
              project.published ? 'bg-green-100 text-black' : 'bg-gray-100 text-gray-500'
            }`}>
              {project.published ? 'Published' : 'Draft'}
            </span>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => togglePublish(project)}
                className="text-sm px-3 py-1.5 rounded-lg bg-stone-50  hover:bg-stone-100 transition-colors font-medium"
              >
                {project.published ? ' Hide' : ' Show'}
              </button>
              <button
                onClick={() => onEdit(project)}
                className="text-sm px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                disabled={deletingId === project.id}
                className="text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
              >
                {deletingId === project.id ? '...' : '🗑️ Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}