// components/ProjectCard.tsx
import { Project } from '../lib/supabase'
import { getRatioClass, getSpanClass } from '../lib/layout'

export default function ProjectCard({ project }: { project: Project }) {
  const images = (project.project_images || []).sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className=" overflow-hidden shadow-md border bg-red-400 b">
      {/* Project header */}
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
        {project.description && (
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{project.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-3">
          {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Image grid - respects each image's chosen layout */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          {images.map(img => (
            <figure key={img.id} className={`${getSpanClass(img.layout)} rounded-xl overflow-hidden bg-gray-50 group`}>
              <div className={`${getRatioClass(img.layout)} overflow-hidden`}>
                <img
                  src={img.image_url}
                  alt={img.title || project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {(img.title || img.description || img.extra_text) && (
                <figcaption className="p-4 space-y-1">
                  {img.title && <p className="font-semibold text-gray-900 text-sm">{img.title}</p>}
                  {img.description && <p className="text-gray-600 text-sm">{img.description}</p>}
                  {img.extra_text && <p className="text-gray-500 text-xs whitespace-pre-wrap">{img.extra_text}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}