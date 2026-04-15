'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Clock, TrendingUp } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Diagnóstico Científico',
    description: 'Identificamos la suciedad acumulada en la porosidad profunda que la limpieza diaria ignora.',
  },
  {
    icon: Clock,
    title: 'Cero Interrupción',
    description: 'Protocolos nocturnos que garantizan la continuidad total de sus operaciones comerciales.',
  },
  {
    icon: TrendingUp,
    title: 'Máximo ROI',
    description: 'Evite gastos masivos de sustitución mediante sellado técnico especializado.',
  },
]

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-bg relative min-h-screen flex items-center pt-24 pb-16"
    >
      {/* Overlay de gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-blue/80 pointer-events-none" />

      <div className="container-corporate relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Columna Izquierda: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-block mb-5 px-3 py-1 border border-accent-blue/50 bg-accent-blue/10">
              <span className="text-xs font-bold uppercase tracking-[3px] text-accent-blue">
                Expertos en Facility Management · Guatemala
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.1] text-white mb-6">
              Proteja la inversión de sus instalaciones:{' '}
              <strong className="font-bold text-gradient-silver">
                Recupere el estándar de sus suelos
              </strong>{' '}
              sin reemplazarlos.
            </h1>

            <p className="text-lg text-silver/80 leading-relaxed mb-8 max-w-xl">
              No permita que el desgaste comprometa su imagen corporativa. Implemente protocolos
              internacionales de restauración que extienden la vida útil de su infraestructura
              y elevan el prestigio de sus espacios.
            </p>

            {/* Mini-benefit cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="card-glass p-4"
                >
                  <b.icon className="h-5 w-5 text-accent-blue mb-2" />
                  <h3 className="text-xs font-bold uppercase tracking-wide text-white mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-silver/70 leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Columna Derecha: Ebook + Formulario ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center"
            id="diagnostico"
          >
            {/* Ebook Mockup */}
            <div className="ebook-mockup w-[220px] mx-auto mb-[-56px] relative z-10 flex flex-col justify-center items-center p-7 text-center h-[260px]">
              <div className="border border-accent-blue px-3 py-1 mb-4 self-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue">
                  Guía Gratuita
                </span>
              </div>
              <div className="divider-silver mx-auto mb-4" />
              <p className="font-serif text-[17px] leading-snug text-white mb-3">
                Guía Maestra de Protección de Activos
              </p>
              <p className="text-[10px] text-silver/60 leading-relaxed">
                Sistema de Restauración para Áreas de Alto Tráfico
              </p>
              {/* Detalles decorativos */}
              <div className="absolute bottom-3 right-3 w-6 h-6 border border-silver/20" />
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent-blue/40" />
            </div>

            {/* Tarjeta del formulario */}
            <div className="w-full max-w-md bg-white px-7 pt-[80px] pb-7 shadow-glass">
              <h2 className="text-center text-[17px] font-bold text-navy mb-1">
                Descargue la Guía Técnica
              </h2>
              <p className="text-center text-xs text-slate-500 mb-5">
                y acceda a un diagnóstico de porosidad sin costo
              </p>
              <LeadForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
