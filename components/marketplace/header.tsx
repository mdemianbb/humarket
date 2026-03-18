'use client'

import { Bell, ChevronDown, Menu, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>

          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Humarket
                </h1>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Partner Apps
                </p>
              </div>
            </Link>
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
          <Button variant="ghost" className="bg-primary/10 text-primary" asChild>
            <Link href="/admin/marketplace">Marketplace</Link>
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link href="/admin/apps">Mis Apps</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notificaciones</span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Configuración</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-2 gap-2 pl-2 pr-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline-block">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Facturación</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
