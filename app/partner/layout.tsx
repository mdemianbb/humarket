import Link from 'next/link'

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-200 hover:text-white text-sm">← Inicio</Link>
          <span className="font-bold text-lg">🤝 Partner Portal</span>
        </div>
        <Link href="/partner/apps/new"
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 text-sm">
          + Nueva App
        </Link>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
}
