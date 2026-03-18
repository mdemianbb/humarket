import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-purple-700 text-white px-6 py-4 flex items-center gap-6">
        <Link href="/" className="text-purple-300 hover:text-white text-sm">← Inicio</Link>
        <span className="font-bold text-lg">⚙️ Humarket — Back-office</span>
        <div className="flex gap-4 ml-4">
          <Link href="/admin/communities" className="text-purple-200 hover:text-white text-sm font-medium">Comunidades</Link>
          <Link href="/admin/apps" className="text-purple-200 hover:text-white text-sm font-medium">Marketplace</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
}
