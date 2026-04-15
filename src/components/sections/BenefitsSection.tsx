'use client'

import { motion } from 'framer-motion'
import { Microscope, Clock, TrendingUp } from 'lucide-react'

const cards = [
  {
    icon: Microscope,
    label: 'Protocolo 01',
    title: 'Diagnóstico Científico de Porosidad',
    body: 'Identificamos la saturación de suciedad en la microporosidad del material que los métodos de limpieza diaria ignoran. Atacamos la raíz del opacamiento, no solo la superficie.',
    metric: '+95%',
    metricLabel: 'Recuperación de brillo original',
  },
  {
    icon: Clock,
    label: 'Protocolo 02',
    title: 'Operatividad con Cero Interrupción',
    body: 'Entendemos su dinámica comercial. Nuestros protocolos están diseñados para ejecutarse en horarios nocturnos, garantizando la continuidad del tráfico y la seguridad del usuario.',
    metric: '0 hrs',
    metricLabel: 'Tiempo de cierre operativo',
  },
  {
    icon: TrendingUp,
    label: 'Protocolo 03',
    title: 'Maximización del Retorno de Inversión',
    body: 'El reemplazo de suelos representa un gasto de capital masivo. Nuestra restauración y sellado técnico protege el activo, posponiendo la inversión de sustitución por años.',
    metric: '3–7x',
    metricLabel: 'Extensión de vida útil del activo',
  },
]

export default function BenefitsSection() {
  return (
    <section id="protocolos" className="section-padding bg-white">
      <div className="container-corporate">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="divider-silver mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            Ingeniería de Limpieza: Más allá de la estética superficial.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Tres protocolos técnicos diseñados para la durabilidad, la mínima interrupción
            operativa y la protección real del patrimonio inmobiliario.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`card-benefit relative ${i < 2 ? 'md:border-r border-slate-100' : ''}`}
            >
              {/* Protocol label */}
              <div className="text-[10px] font-bold tracking-[3px] uppercase text-accent-blue mb-5">
                {card.label}
              </div>

              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center bg-navy/5 mb-5">
                <card.icon className="h-5 w-5 text-navy" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{card.body}</p>

              {/* Metric */}
              <div className="mt-auto pt-5 border-t border-slate-100">
                <span className="block text-3xl font-bold text-accent-blue tracking-tight">
                  {card.metric}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {card.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
