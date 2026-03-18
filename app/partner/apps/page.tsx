'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { App, Partner } from '@/lib/types'

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  pending:   'bg-yellow-100 text-yellow-700',
  rejected:  'bg-red-100 text-red-700',
}
const STATUS_LABELS: Record<string, string> = {
  published: '✅ Publicada',
  pending:   '⏳ Pendiente',
  rejected:  '❌ Rechazada',
}

export default function PartnerAppsPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('')
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.from('partners').select('*').order('name')
      .then(({ data }) => {
        if (data) {
          setPartners(data)
          if (data.length > 0) setSelectedPartnerId(data[0].id)
        }
      })
  }, [])

  useEffect(() => {
    if (!selectedPartnerId) return
    setLoading(true)
    supabase.from('apps').select('*').eq('partner_id', selectedPartnerId).order('created_at', { ascending: false })
      .then(({ data }) => {
        setApps(data || [])
        setLoading(false)
      })
  }, [selectedPartnerId])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis Apps</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Viendo como:</label>
          <select value={selectedPartnerId} onChange={e => setSelectedPartnerId(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white">
            {partners.map(p => <option key={p.id} value={p.id}>{p.name} — {p.company}</option>)}
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-400">Cargando...</p>}

      {!loading && apps.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 mb-4">Todavía no publicaste ninguna app</p>
          <Link href="/partner/apps/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            + Agregar tu primera app
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {apps.map(app => (
          <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
            {app.logo_url
              ? <img src={app.logo_url} alt={app.name} className="w-12 h-12 rounded-xl object-cover" />
              : <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">📦</div>
            }
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{app.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[app.status]}`}>
                  {STATUS_LABELS[app.status]}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {app.type === 'saas' ? '🔗 SaaS' : '🧑‍💼 Servicio'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{app.description}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p className="font-medium text-gray-700">{app.category}</p>
              <p>{app.price_model === 'commission' ? `${app.commission_pct}% comisión` : `$${app.price}/mes`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
