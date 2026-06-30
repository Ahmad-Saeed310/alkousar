// app/admin/page.tsx  ← ADMIN DASHBOARD
'use client'
import { useEffect, useState } from 'react'
import { supabase, Project } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import ProjectForm from '@/adminImages/ProjectForm'
import AdminProjectList from '@/adminImages/AdminProjectList'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const router = useRouter()

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

  function handleSuccess() {
    setEditProject(null)
    setRefreshKey(k => k + 1)
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
      <header className="bg-indigo-700 text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-indigo-200 text-xs mt-0.5">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-indigo-200 hover:text-white transition-colors">
              View Public Page
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <ProjectForm
              onSuccess={handleSuccess}
              editProject={editProject}
              onCancelEdit={() => setEditProject(null)}
            />
          </div>
          <div>
            <AdminProjectList
              refreshKey={refreshKey}
              onEdit={(project) => setEditProject(project)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}