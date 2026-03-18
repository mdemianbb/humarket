'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Community } from '@/lib/types'

const PLAN_STYLES: Record<string, string> = {
  basic:      'bg-gray-100 text-gray-600',
  pro:        'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [installCounts, setInstallCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('communities').select('*').order('name'),
      supabase.from('installations').select('community_id').eq('status', 'active'),
    ]).then(([{ data: comms }, { data: installs }]) => {
      setCommunities(comms || [])
      const counts: Record<string, number> = {}
      installs?.forEach(i => { counts[i.community_id] = (counts[i.community_id] || 0) + 1 })
      setInstallCounts(counts)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Comunidades</h1>
        <p className="text-gray-500 text-sm">Seleccioná una comunidad para gestionar sus apps activas</p>
      </div>

      {loading && <p className="text-gray-400">Cargando...</p>}

      <div className="grid grid-cols-1 gap-3">
        {communities.map(c => (
          <Link key={c.id} href={`/admin/communities/${c.id}`}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-purple-400 hover:shadow-sm transition-all">
            {c.logo_url
              ? <img src={c.logo_url} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
              : <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">🏢</div>
            }
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{c.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLAN_STYLES[c.plan] || PLAN_STYLES.basic}`}>
                  {c.plan}
                </span>
              </div>
              <p className="text-sm text-gray-500">{c.industry} · {c.employees?.toLocaleString()} empleados</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{installCounts[c.id] || 0}</p>
              <p className="text-xs text-gray-400">apps activas</p>
            </div>
            <span className="text-gray-300 text-xl">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
