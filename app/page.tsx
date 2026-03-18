import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Humarket</h1>
        <p className="text-gray-500 text-lg">Marketplace de Apps para Humand</p>
      </div>

      <div className="flex gap-6">
        <Link href="/partner/apps"
          className="flex flex-col items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl p-8 w-56 hover:border-blue-500 hover:shadow-lg transition-all">
          <span className="text-4xl">🤝</span>
          <span className="font-semibold text-lg">Partner Portal</span>
          <span className="text-sm text-gray-500 text-center">Publicá tus apps en el marketplace</span>
        </Link>

        <Link href="/admin/communities"
          className="flex flex-col items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl p-8 w-56 hover:border-purple-500 hover:shadow-lg transition-all">
          <span className="text-4xl">⚙️</span>
          <span className="font-semibold text-lg">Back-office Admin</span>
          <span className="text-sm text-gray-500 text-center">Gestioná apps por comunidad</span>
        </Link>
      </div>
    </div>
  )
}
