'use client'

import { useSidebar } from './sidebar-context'

export function AdminMain({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebar()
  const sidebarWidth = sidebar?.collapsed ? 72 : 256

  return (
    <main
      className="min-h-screen w-full transition-[margin-left,width] duration-300"
      style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }}
    >
      {children}
    </main>
  )
}
