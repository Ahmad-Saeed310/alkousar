// 'use client'
// import { useEffect, useState } from 'react'
// import { supabase, Content } from '../lib/supabase'
// import ContentCard from './ContentCard'

// export default function ContentGrid() {
//   const [items, setItems] = useState<Content[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string>('')

//   useEffect(() => {
//     fetchContent()
//   }, [])

//   async function fetchContent() {
//     console.log('Fetching from Supabase...')
//     console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

//     const { data, error } = await supabase
//       .from('content')
//       .select('*')
//       .eq('published', true)
//       .order('created_at', { ascending: false })

//     console.log('DATA:', data)
//     console.log('ERROR:', error)

//     if (error) setError(error.message)
//     if (data) setItems(data)
//     setLoading(false)
//   }

//   // if (loading) return <p className="text-white p-8">Loading...</p>

//   // if (error) return (
//   //   <div className="bg-red-100 text-red-700 p-6 rounded-xl">
//   //     <p className="font-bold">Supabase Error:</p>
//   //     <p>{error}</p>
//   //   </div>
//   // )

//   // if (items.length === 0) return (
//   //   <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl">
//   //     <p className="font-bold">No content found.</p>
//   //     <p className="text-sm mt-1">Table is empty or RLS is blocking reads.</p>
//   //   </div>
//   // )

//   // return (
//   //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   //     {items.map(item => (
//   //       <ContentCard key={item.id} item={item} />
//   //     ))}
//   //   </div>
//   // )
// }

// hooks/useProjects.ts

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