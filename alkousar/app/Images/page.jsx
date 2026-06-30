// app/page.tsx  ← PUBLIC USER PAGE
// import ProjectGrid from '../..//components/ProjectGrid'
import ProjectGrid from "../../adminImages/ProjectGrid"
import Link from 'next/link'

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100  top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Content Hub</h1>
            <p className="text-sm text-gray-500">Latest projects and updates</p>
          </div>
          <Link href="/admin" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            Admin →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto  py-12">
        <ProjectGrid />
      </main>

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} My Content Hub
      </footer>
    </div>
  )
}