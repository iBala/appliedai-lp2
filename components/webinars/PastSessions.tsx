import Link from 'next/link'
import { getAllWebinarsMeta } from '@/lib/webinars'

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d)
  } catch {
    return dateStr
  }
}

export default async function PastSessions() {
  const all = await getAllWebinarsMeta()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const past = all.filter((w) => {
    const d = new Date(w.date)
    d.setHours(0, 0, 0, 0)
    return d.getTime() <= today.getTime()
  })

  // Sort: latest first. Use `order` descending primarily, fallback to date desc.
  past.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : null
    const bo = typeof b.order === 'number' ? b.order : null
    if (ao !== null && bo !== null && ao !== bo) return bo - ao
    if (ao !== null && bo === null) return -1
    if (ao === null && bo !== null) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  if (!past.length) {
    return null
  }

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left copy */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Past Sessions</h2>
              <p className="text-gray-600 max-w-md">
                We hold open webinar sessions every week. You can find the content and recordings of our past sessions here.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/webinars" className="inline-flex items-center text-sm font-semibold text-gray-900 hover:opacity-70">
                View all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right list */}
          <div className="border border-gray-100 rounded-xl">
            <div className="max-h-[420px] overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {past.map((w) => {
                  const tag = w.tags?.[0]
                  return (
                    <li key={w.slug}>
                      <Link
                        href={`/webinars/${w.slug}`}
                        className="group block px-4 sm:px-5 py-4 hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base text-black truncate group-hover:underline">
                              {w.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatDate(w.date)}
                            </span>
                            {tag ? (
                              <span
                                className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500 max-w-[120px] truncate"
                                title={tag}
                              >
                                {tag}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
