// app/admin/page.tsx  ← ADMIN DASHBOARD
'use client'
import { useEffect, useState } from 'react'
import { supabase, Project, BlogPost } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import ProjectForm from '@/adminImages/ProjectForm'
import AdminProjectList from '@/adminImages/AdminProjectList'
import BlogForm from '@/adminImages/BlogForm'
import AdminBlogList from '@/adminImages/AdminBlogList'
import Link from 'next/link'

type Tab = 'projects' | 'blog'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('projects')
  const router = useRouter()

  const [projectRefreshKey, setProjectRefreshKey] = useState(0)
  const [editProject, setEditProject] = useState<Project | null>(null)

  const [blogRefreshKey, setBlogRefreshKey] = useState(0)
  const [editPost, setEditPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      setUser(session.user)
    }
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  function handleProjectSuccess() {
    setEditProject(null)
    setProjectRefreshKey(k => k + 1)
  }

  function handleBlogSuccess() {
    setEditPost(null)
    setBlogRefreshKey(k => k + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-stone-900 text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-stone-200 text-xs mt-0.5">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-stone-200 hover:text-white transition-colors">
              View Public Page
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-stone-800 hover:bg-stone-900 px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setTab('projects')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
              tab === 'projects'
                ? 'bg-white text-stone-900 border border-b-0 border-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab('blog')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
              tab === 'blog'
                ? 'bg-white text-stone-900 border border-b-0 border-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Blog
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {tab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <ProjectForm
                onSuccess={handleProjectSuccess}
                editProject={editProject}
                onCancelEdit={() => setEditProject(null)}
              />
            </div>
            <div>
              <AdminProjectList
                refreshKey={projectRefreshKey}
                onEdit={(project) => setEditProject(project)}
              />
            </div>
          </div>
        )}

        {tab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <BlogForm
                onSuccess={handleBlogSuccess}
                editPost={editPost}
                onCancelEdit={() => setEditPost(null)}
              />
            </div>
            <div>
              <AdminBlogList
                refreshKey={blogRefreshKey}
                onEdit={(post) => setEditPost(post)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
