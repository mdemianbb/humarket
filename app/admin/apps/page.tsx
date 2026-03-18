'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { App } from '@/lib/types'

const CATEGORIES = ['Todas', 'RRHH', 'Payroll', 'Capacitación', 'Beneficios', 'Productividad', 'Comunicación', 'Bienestar']

export default function AdminAppsPage() {
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Todas')
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.from('apps').select('*, partners(name, company)').eq('status', 'published').order('created_at', { ascending: false })
      .then(({ data }) => { setApps(data || []); setLoading(false) })
  }, [])

  const filtered = apps.filter(a => {
    const matchCat = filter === 'Todas' || a.category === filter
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Marketplace</h1>
        <p className="text-gray-500 text-sm">Apps disponibles para activar en comunidades</p>
      </div>

      <div className="flex gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar app..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${filter === c ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-gray-400">Cargando...</p>}

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(app => (
          <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
            {app.logo_url
              ? <img src={app.logo_url} alt={app.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              : <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">📦</div>
            }
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{app.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${app.type === 'saas' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {app.type === 'saas' ? '🔗 SaaS' : '🧑‍💼 Servicio'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{app.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{app.category}</span>
                <span>{app.price_model === 'commission' ? `${app.commission_pct}% comisión` : `$${app.price}/mes`}</span>
                {app.partners && <span>por {(app.partners as any).company}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">No hay apps para esta categoría.</div>
      )}
    </div>
  )
}
