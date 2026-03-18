'use client'

import { cn } from '@/lib/utils'
import {
  Banknote,
  GraduationCap,
  Heart,
  Users,
  TrendingUp,
  LayoutGrid,
} from 'lucide-react'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  Todos: <LayoutGrid className="h-4 w-4" />,
  Payroll: <Banknote className="h-4 w-4" />,
  Training: <GraduationCap className="h-4 w-4" />,
  Benefits: <Heart className="h-4 w-4" />,
  Recruitment: <Users className="h-4 w-4" />,
  Performance: <TrendingUp className="h-4 w-4" />,
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            selected === category
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
              : 'bg-card text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground'
          )}
        >
          {categoryIcons[category]}
          <span>{category}</span>
        </button>
      ))}
    </div>
  )
}
