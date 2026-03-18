export type AppType = 'saas' | 'service'
export type AppStatus = 'pending' | 'published' | 'rejected'
export type InstallationStatus = 'active' | 'inactive' | 'connecting' | 'syncing'
export type PriceModel = 'monthly' | 'per_seat' | 'commission'

export interface Partner {
  id: string
  name: string
  company: string
  email: string
  created_at: string
}

export interface App {
  id: string
  partner_id: string
  name: string
  description: string
  category: string
  type: AppType
  logo_url: string
  website_url: string
  price: number
  price_model: PriceModel
  commission_pct: number
  status: AppStatus
  tags: string[]
  created_at: string
  partners?: Partner
}

export interface Community {
  id: string
  name: string
  industry: string
  employees: number
  plan: string
  logo_url: string
  created_at: string
}

export interface Installation {
  id: string
  community_id: string
  app_id: string
  status: InstallationStatus
  installed_at: string
  config: Record<string, unknown>
  apps?: App
}
