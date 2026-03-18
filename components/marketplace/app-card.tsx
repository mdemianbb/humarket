'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AppCardProps {
  app: {
    id: string
    name: string
    logo: string
    category: 'Payroll' | 'Training' | 'Benefits' | 'Recruitment' | 'Performance'
    type: 'SaaS' | 'Service'
    description: string
    price: string
    priceUnit?: string
  }
  onActivate: (id: string) => void
}

const categoryColors: Record<string, string> = {
  Payroll: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Training: 'bg-amber-100 text-amber-700 border-amber-200',
  Benefits: 'bg-sky-100 text-sky-700 border-sky-200',
  Recruitment: 'bg-rose-100 text-rose-700 border-rose-200',
  Performance: 'bg-violet-100 text-violet-700 border-violet-200',
}

export function AppCard({ app, onActivate }: AppCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-accent to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted/50 p-2 ring-1 ring-border/50 transition-all duration-300 group-hover:ring-primary/20">
          <img
            src={app.logo}
            alt={`${app.name} logo`}
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <h3 className="font-semibold leading-tight text-card-foreground">
            {app.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                'text-[10px] font-medium uppercase tracking-wide',
                categoryColors[app.category]
              )}
            >
              {app.category}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'text-[10px] font-medium uppercase tracking-wide',
                app.type === 'SaaS'
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-muted text-muted-foreground border-border'
              )}
            >
              {app.type}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {app.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-card-foreground">{app.price}</span>
          {app.priceUnit && (
            <span className="text-xs text-muted-foreground">{app.priceUnit}</span>
          )}
        </div>
        <Button
          onClick={() => onActivate(app.id)}
          className="bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
        >
          Activar
        </Button>
      </CardFooter>
    </Card>
  )
}
