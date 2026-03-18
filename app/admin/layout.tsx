import { SidebarProvider } from './sidebar-context'
import { UserAppProvider } from './user-app-context'
import { AdminNavbar } from './admin-navbar'
import { AdminSidebar } from '@/components/marketplace/admin-sidebar'
import { AdminMain } from './admin-main'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <UserAppProvider>
        <div className="min-h-screen">
          <AdminNavbar />
          <AdminSidebar />
          <AdminMain>{children}</AdminMain>
        </div>
      </UserAppProvider>
    </SidebarProvider>
  )
}
