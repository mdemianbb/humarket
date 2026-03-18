import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Humarket',
  description: 'Marketplace de Apps para Humand',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  )
}
