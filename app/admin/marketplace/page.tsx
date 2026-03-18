'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/marketplace/search-bar'
import { CategoryFilter } from '@/components/marketplace/category-filter'
import { TypeFilter } from '@/components/marketplace/type-filter'
import { AppCard } from '@/components/marketplace/app-card'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const partnerApps = [
  {
    id: '1',
    name: 'PayFlow Pro',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=payflow&backgroundColor=7c3aed',
    category: 'Payroll' as const,
    type: 'SaaS' as const,
    description:
      'Automatiza la liquidación de sueldos con integración directa a bancos y AFIP. Procesamiento masivo en minutos.',
    price: '$299',
    priceUnit: '/mes',
  },
  {
    id: '2',
    name: 'LearnHub 360',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=learnhub&backgroundColor=f59e0b',
    category: 'Training' as const,
    type: 'SaaS' as const,
    description:
      'Plataforma LMS completa con cursos interactivos, certificaciones y seguimiento de progreso en tiempo real.',
    price: '$149',
    priceUnit: '/mes',
  },
  {
    id: '3',
    name: 'BenefitBox',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=benefitbox&backgroundColor=0ea5e9',
    category: 'Benefits' as const,
    type: 'Service' as const,
    description:
      'Gestión integral de beneficios corporativos: gimnasio, salud, comidas y descuentos exclusivos para empleados.',
    price: '$89',
    priceUnit: '/empleado',
  },
  {
    id: '4',
    name: 'TalentRadar',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=talentradar&backgroundColor=ec4899',
    category: 'Recruitment' as const,
    type: 'SaaS' as const,
    description:
      'ATS con IA que automatiza el screening de CVs, coordina entrevistas y mejora tu time-to-hire un 60%.',
    price: '$449',
    priceUnit: '/mes',
  },
  {
    id: '5',
    name: 'PerformancePulse',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=pulse&backgroundColor=8b5cf6',
    category: 'Performance' as const,
    type: 'SaaS' as const,
    description:
      'OKRs, feedback 360°, one-on-ones y evaluaciones continuas. Impulsa el rendimiento de tu equipo.',
    price: '$199',
    priceUnit: '/mes',
  },
  {
    id: '6',
    name: 'WellnessPlus',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=wellness&backgroundColor=10b981',
    category: 'Benefits' as const,
    type: 'Service' as const,
    description:
      'Programa de bienestar corporativo con sesiones de mindfulness, nutrición y apoyo psicológico.',
    price: '$45',
    priceUnit: '/empleado',
  },
  {
    id: '7',
    name: 'PayGuard',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=payguard&backgroundColor=6366f1',
    category: 'Payroll' as const,
    type: 'SaaS' as const,
    description:
      'Cumplimiento normativo automatizado. Control de horas extras, licencias y reportes para auditorías.',
    price: '$179',
    priceUnit: '/mes',
  },
  {
    id: '8',
    name: 'SkillForge',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=skillforge&backgroundColor=f97316',
    category: 'Training' as const,
    type: 'Service' as const,
    description:
      'Capacitaciones in-company personalizadas. Liderazgo, comunicación, metodologías ágiles y más.',
    price: 'Consultar',
    priceUnit: '',
  },
  {
    id: '9',
    name: 'HireWise',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=hirewise&backgroundColor=be185d',
    category: 'Recruitment' as const,
    type: 'Service' as const,
    description:
      'Headhunting especializado para posiciones C-level y roles tech de alta demanda.',
    price: '20%',
    priceUnit: 'del salario',
  },
  {
    id: '10',
    name: 'GoalTracker',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=goaltracker&backgroundColor=7e22ce',
    category: 'Performance' as const,
    type: 'SaaS' as const,
    description:
      'Define, asigna y da seguimiento a objetivos con dashboards en tiempo real y alertas automáticas.',
    price: '$99',
    priceUnit: '/mes',
  },
  {
    id: '11',
    name: 'FlexiPay',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=flexipay&backgroundColor=059669',
    category: 'Benefits' as const,
    type: 'SaaS' as const,
    description:
      'Adelanto de sueldo sin intereses para empleados. Mejora la retención y reduce el estrés financiero.',
    price: '$2',
    priceUnit: '/transacción',
  },
  {
    id: '12',
    name: 'OnboardPro',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=onboard&backgroundColor=dc2626',
    category: 'Recruitment' as const,
    type: 'SaaS' as const,
    description:
      'Onboarding digital automatizado. Documentación, firma electrónica, tareas y seguimiento integrado.',
    price: '$129',
    priceUnit: '/mes',
  },
]

const categories = ['Todos', 'Payroll', 'Training', 'Benefits', 'Recruitment', 'Performance']
const types = ['Todos', 'SaaS', 'Service']

export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedType, setSelectedType] = useState('Todos')

  const filteredApps = useMemo(() => {
    return partnerApps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        selectedCategory === 'Todos' || app.category === selectedCategory
      const matchesType = selectedType === 'Todos' || app.type === selectedType
      return matchesSearch && matchesCategory && matchesType
    })
  }, [search, selectedCategory, selectedType])

  const handleActivate = (id: string) => {
    console.log(`Activating app ${id}`)
  }

  return (
    <div className="min-h-screen px-6 py-8 lg:px-8">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-accent p-8 text-primary-foreground shadow-xl shadow-primary/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <Badge
                  variant="secondary"
                  className="border-none bg-primary-foreground/20 text-primary-foreground"
                >
                  Marketplace
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Partner Apps
              </h1>
              <p className="mt-2 max-w-xl text-primary-foreground/80">
                Descubrí las mejores aplicaciones para potenciar tu gestión de recursos
                humanos. Integraciones verificadas y soporte dedicado.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                <span className="block text-2xl font-bold">{partnerApps.length}</span>
                <span className="text-primary-foreground/70">Apps disponibles</span>
              </div>
              <div className="rounded-lg bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                <span className="block text-2xl font-bold">5</span>
                <span className="text-primary-foreground/70">Categorías</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilter
              types={types}
              selected={selectedType}
              onSelect={setSelectedType}
            />
          </div>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando{' '}
            <span className="font-semibold text-foreground">{filteredApps.length}</span>{' '}
            aplicaciones
            {selectedCategory !== 'Todos' && (
              <>
                {' '}
                en{' '}
                <span className="font-semibold text-foreground">
                  {selectedCategory}
                </span>
              </>
            )}
            {selectedType !== 'Todos' && (
              <>
                {' '}
                •{' '}
                <span className="font-semibold text-foreground">{selectedType}</span>
              </>
            )}
          </p>
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} onActivate={handleActivate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No se encontraron aplicaciones
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Probá ajustando los filtros o buscando otro término
            </p>
          </div>
        )}
    </div>
  )
}
