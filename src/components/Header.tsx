import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-sm border-b border-white/5">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Ultra-CleanGT S.A."
            width={120}
            height={60}
            priority
            className="h-10 w-auto object-contain"
          />
        </div>
      </Link>

      {/* Desktop: Tagline + CTA */}
      <div className="hidden md:flex items-center gap-6">
        <span className="text-xs font-bold tracking-[3px] uppercase text-silver/60">
          Facility Management · Guatemala
        </span>
        <a
          href="#diagnostico"
          className="btn-secondary text-xs"
        >
          Solicitar Diagnóstico Sin Costo
        </a>
      </div>

      {/* Mobile: Solo CTA */}
      <a
        href="#diagnostico"
        className="md:hidden text-xs font-bold uppercase tracking-wider text-accent-blue border border-accent-blue/50 px-4 py-2"
      >
        Diagnóstico Gratis
      </a>
    </header>
  )
}
