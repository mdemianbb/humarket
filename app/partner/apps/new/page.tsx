'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/lib/types'

const CATEGORIES = ['RRHH', 'Payroll', 'Capacitación', 'Beneficios', 'Productividad', 'Comunicación', 'Bienestar', 'Otro']

export default function NewAppPage() {
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    partner_id: '',
    name: '',
    description: '',
    category: 'RRHH',
    type: 'saas',
    logo_url: '',
    website_url: '',
    price: '',
    price_model: 'monthly',
    commission_pct: '',
  })

  useEffect(() => {
    supabase.from('partners').select('*').order('name')
      .then(({ data }) => {
        if (data) {
          setPartners(data)
          if (data.length > 0) setForm(f => ({ ...f, partner_id: data[0].id }))
        }
      })
  }, [])

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.description || !form.partner_id) {
      setError('Completá los campos obligatorios.')
      return
    }
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('apps').insert({
      partner_id: form.partner_id,
      name: form.name,
      description: form.description,
      category: form.category,
      type: form.type,
      logo_url: form.logo_url || null,
      website_url: form.website_url || null,
      price: form.price ? parseFloat(form.price) : 0,
      price_model: form.price_model,
      commission_pct: form.commission_pct ? parseFloat(form.commission_pct) : 0,
      status: 'pending',
    })
    setSaving(false)
    if (err) { setError(err.message); return }
    router.push('/partner/apps')
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Nueva App</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">

        <div>
          <label className={labelClass}>Partner *</label>
          <select value={form.partner_id} onChange={e => set('partner_id', e.target.value)} className={inputClass}>
            {partners.map(p => <option key={p.id} value={p.id}>{p.name} — {p.company}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Nombre de la app *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej: PayFlex" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Descripción *</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Describí qué hace tu app y qué problema resuelve..." rows={3} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Categoría</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tipo</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} className={inputClass}>
              <option value="saas">🔗 SaaS (integración técnica)</option>
              <option value="service">🧑‍💼 Servicio (coordinación manual)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>URL del logo</label>
            <input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sitio web</label>
            <input value={form.website_url} onChange={e => set('website_url', e.target.value)} placeholder="https://..." className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Modelo de precio</label>
            <select value={form.price_model} onChange={e => set('price_model', e.target.value)} className={inputClass}>
              <option value="monthly">Mensual fijo</option>
              <option value="per_seat">Por usuario</option>
              <option value="commission">Comisión %</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Precio (USD/mes)</label>
            <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="200" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Comisión (%)</label>
            <input type="number" value={form.commission_pct} onChange={e => set('commission_pct', e.target.value)} placeholder="15" className={inputClass} />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Publicar App'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
