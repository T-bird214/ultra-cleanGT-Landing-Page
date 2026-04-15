import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ultra-CleanGT | Restauración Técnica de Suelos Corporativos',
  description:
    'Proteja la inversión de sus instalaciones con protocolos internacionales de restauración de suelos. Diagnóstico sin costo para edificios corporativos, centros comerciales e industria en Guatemala.',
  keywords: [
    'restauración de suelos Guatemala',
    'limpieza industrial corporativa Guatemala',
    'facility management Guatemala',
    'pulido de mármol Guatemala',
    'Ultra-Clean',
    'mantenimiento de pisos corporativos',
  ],
  openGraph: {
    title: 'Ultra-CleanGT | Restauración Técnica de Suelos',
    description: 'Protocolos internacionales de restauración para áreas de alto tráfico en Guatemala.',
    url: 'https://www.ultra-cleangt.com',
    siteName: 'Ultra-CleanGT',
    locale: 'es_GT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultra-CleanGT | Restauración Técnica de Suelos',
    description: 'Protección y restauración de suelos corporativos en Guatemala.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#001529" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-deep-blue text-white antialiased">
        {children}
      </body>
    </html>
  )
}
