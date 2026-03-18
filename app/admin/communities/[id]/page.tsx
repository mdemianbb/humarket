'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { App, Community, Installation } from '@/lib/types'

type ActivationState = 'idle' | 'connecting' | 'syncing' | 'done'

const ACTIVATION_STEPS: Record<ActivationState, string> = {
  idle:       '',
  connecting: '🔄 Conectando...',
  syncing:    '⚡ Sincronizando datos...',
  done:       '✅ Conectada',
}

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [community, setCommunity] = useState<Community | null>(null)
  const [installations, setInstallations] = useState<Installation[]>([])
  const [availableApps, setAvailableApps] = useState<App[]>([])
  const [activating, setActivating] = useState<Record<string, ActivationState>>({})

  const load = useCallback(async () => {
    const [{ data: comm }, { data: installs }, { data: allApps }] = await Promise.all([
      supabase.from('communities').select('*').eq('id', id).single(),
      supabase.from('installations').select('*, apps(*, partners(name,company))').eq('community_id', id).eq('status', 'active'),
      supabase.from('apps').select('*, partners(name,company)').eq('status', 'published'),
    ])
    setCommunity(comm)
    setInstallations(installs || [])

    const installedIds = new Set((installs || []).map((i: Installation) => i.app_id))
    setAvailableApps((allApps || []).filter((a: App) => !installedIds.has(a.id)))
  }, [id])

  useEffect(() => { load() }, [load])

  const activate = async (app: App) => {
    setActivating(s => ({ ...s, [app.id]: 'connecting' }))
    await new Promise(r => setTimeout(r, 1500))
    setActivating(s => ({ ...s, [app.id]: 'syncing' }))
    await new Promise(r => setTimeout(r, 2000))

    await supabase.from('installations').insert({
      community_id: id, app_id: app.id, status: 'active',
      config: { synced_employees: Math.floor(Math.random() * 900) + 100 },
    })

    setActivating(s => ({ ...s, [app.id]: 'done' }))
    await new Promise(r => setTimeout(r, 1000))
    setActivating(s => { const n = { ...s }; delete n[app.id]; return n })
    load()
  }

  const deactivate = async (installation: Installation) => {
    if (!confirm('¿Desactivar esta app para esta comunidad?')) return
    await supabase.from('installations').update({ status: 'inactive' }).eq('id', installation.id)
    load()
  }

  if (!community) return <p className="text-gray-400 p-6">Cargando...</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/communities" className="text-purple-600 hover:underline text-sm">← Comunidades</Link>
        <div className="flex items-center gap-3">
          {community.logo_url
            ? <img src={community.logo_url} alt={community.name} className="w-12 h-12 rounded-xl object-cover" />
            : <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">🏢</div>
          }
          <div>
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="text-gray-500 text-sm">{community.industry} · {community.employees?.toLocaleString()} empleados · Plan {community.plan}</p>
          </div>
        </div>
      </div>

      {/* Installed Apps */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">
          Apps activas <span className="text-purple-600 font-bold">{installations.length}</span>
        </h2>
        {installations.length === 0 && (
          <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center">
            No hay apps activas todavía. Activá una desde el marketplace abajo.
          </p>
        )}
        <div className="grid grid-cols-1 gap-3">
          {installations.map(inst => {
            const app = inst.apps as App | undefined
            const cfg = inst.config as any
            return (
              <div key={inst.id} className="bg-white border border-green-200 rounded-xl p-4 flex items-center gap-4">
                {app?.logo_url
                  ? <img src={app.logo_url} alt={app.name} className="w-10 h-10 rounded-lg object-cover" />
                  : <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">📦</div>
                }
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{app?.name}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✅ Conectada</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {cfg?.synced_employees ? `${cfg.synced_employees} empleados sincronizados · ` : ''}
                    Activada el {new Date(inst.installed_at).toLocaleDateString('es-AR')}
                  </p>
                </div>
                <button onClick={() => deactivate(inst)}
                  className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50">
                  Desactivar
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Available Apps */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Apps disponibles para activar</h2>
        {availableApps.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-6">Todas las apps publicadas ya están activas.</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {availableApps.map(app => {
            const state = activating[app.id] || 'idle'
            const isLoading = state === 'connecting' || state === 'syncing'
            return (
              <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3">
                {app.logo_url
                  ? <img src={app.logo_url} alt={app.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">📦</div>
                }
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm">{app.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${app.type === 'saas' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      {app.type === 'saas' ? 'SaaS' : 'Servicio'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{app.description}</p>

                  {state !== 'idle' && (
                    <p className={`text-xs mt-2 font-medium ${state === 'done' ? 'text-green-600' : 'text-blue-600 animate-pulse'}`}>
                      {ACTIVATION_STEPS[state]}
                    </p>
                  )}

                  <button onClick={() => activate(app)} disabled={isLoading}
                    className="mt-2 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 disabled:opacity-50 w-full font-medium">
                    {isLoading ? 'Activando...' : '+ Activar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
