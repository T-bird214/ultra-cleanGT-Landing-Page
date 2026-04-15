'use client'

import { motion } from 'framer-motion'

const clients = [
  { name: 'Casa de Dios', category: 'Complejo Corporativo' },
  { name: 'Edificio Gaura', category: 'Torre Empresarial' },
  { name: 'Edificio Meraki 10', category: 'Edificio de Oficinas' },
  { name: 'Centro Comercial', category: 'Área de Alto Tráfico' },
  { name: 'Planta Industrial', category: 'Sector Industrial' },
]

const stats = [
  { value: '50,000+', label: 'M² restaurados' },
  { value: '8+', label: 'Años de experiencia' },
  { value: '100%', label: 'Sin cierre operativo' },
  { value: '3x', label: 'Vida útil extendida' },
]

export default function SocialProofSection() {
  return (
    <section id="clientes" className="section-padding bg-slate-50">
      <div className="container-corporate">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="divider-silver mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            Aliados en el mantenimiento de infraestructuras de Clase A.
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Organizaciones líderes en Guatemala confían en nuestros protocolos técnicos
            para proteger su imagen y sus activos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-8 text-center"
            >
              <span className="block font-serif text-4xl font-bold text-navy mb-1">{s.value}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Client logos — grayscale */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-slate-400 text-center mb-8">
            Confían en Nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {clients.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 opacity-40 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
              >
                {/* Logo placeholder — se reemplaza con <Image> cuando tenga los archivos */}
                <div className="h-12 w-36 bg-navy flex items-center justify-center px-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wide text-center leading-tight">
                    {c.name}
                  </span>
                </div>
                <span className="text-[9px] tracking-wider uppercase text-slate-400">{c.category}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Before / After CTA strip */}
        <div className="relative overflow-hidden bg-navy p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-24 h-full border-r border-accent-blue/20 pointer-events-none" />

          <div>
            <div className="text-xs font-bold uppercase tracking-[3px] text-accent-blue mb-3">
              Resultados Verificables
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
              Vea el antes y después en sus propias instalaciones.
            </h3>
            <p className="text-silver/70 text-sm max-w-md">
              Realizamos una prueba de resultado en sus propias instalaciones antes de cualquier
              decisión comercial. Sin costo. Sin compromiso.
            </p>
          </div>

          <a href="#diagnostico" className="btn-primary flex-shrink-0">
            Solicitar Prueba Gratuita
          </a>
        </div>

      </div>
    </section>
  )
}
