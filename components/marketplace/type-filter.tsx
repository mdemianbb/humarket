'use client'

import { cn } from '@/lib/utils'
import { Cloud, Briefcase } from 'lucide-react'

interface TypeFilterProps {
  types: string[]
  selected: string
  onSelect: (type: string) => void
}

const typeIcons: Record<string, React.ReactNode> = {
  Todos: null,
  SaaS: <Cloud className="h-3.5 w-3.5" />,
  Service: <Briefcase className="h-3.5 w-3.5" />,
}

export function TypeFilter({ types, selected, onSelect }: TypeFilterProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-muted/50 p-1 ring-1 ring-border/50">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onSelect(type)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200',
            selected === type
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {typeIcons[type]}
          <span>{type}</span>
        </button>
      ))}
    </div>
  )
}
