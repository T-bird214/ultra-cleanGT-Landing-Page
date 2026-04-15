'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Building2, Leaf } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Prestigio Institucional',
    body: 'Mantenga el estándar visual de las edificaciones A+ y centros comerciales de lujo. Su infraestructura comunica el nivel de su organización.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad y Normativa',
    body: 'Tratamientos antideslizantes e higiene profunda que eliminan biopelículas bacterianas en juntas y poros, bajo estándares internacionales de seguridad industrial.',
  },
  {
    icon: Building2,
    title: 'Protección de Activos',
    body: 'Protocolos de sellado técnico que evitan la porosidad y el desgaste prematuro de la piedra natural, granito, mármol y concreto pulido.',
  },
  {
    icon: Leaf,
    title: 'Sostenibilidad',
    body: 'Reducción del uso de químicos agresivos mediante maquinaria calibrada de precisión. Menor impacto ambiental, mayor eficiencia operativa.',
  },
]

export default function ValueSection() {
  return (
    <section id="valor" className="section-padding bg-navy relative overflow-hidden">

      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #C0C0C0 0, #C0C0C0 1px, transparent 0, transparent 50%)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-corporate relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Columna Izquierda: Copy principal */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="divider-silver mb-5" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-6 leading-tight">
              Su suelo es la primera impresión de su marca.
            </h2>
            <p className="text-silver/75 text-lg leading-relaxed mb-8">
              Un suelo manchado o poroso no solo es un problema estético; es un riesgo de seguridad
              y un mensaje de descuido institucional. En Ultra-CleanGT transformamos superficies
              inertes en activos de prestigio.
            </p>

            <blockquote className="border-l-2 border-accent-blue pl-5 mb-8">
              <p className="font-serif text-xl italic text-silver/90 leading-relaxed">
                &ldquo;La restauración técnica nos permitió recuperar el brillo original de 5,000 m²
                de granito sin cerrar un solo día de operación.&rdquo;
              </p>
              <cite className="mt-3 block text-xs font-bold uppercase tracking-wider text-silver/50 not-italic">
                — Administrador de Edificio Corporativo · Guatemala
              </cite>
            </blockquote>

            <a href="#diagnostico" className="btn-primary">
              Solicitar Diagnóstico Sin Costo
            </a>
          </motion.div>

          {/* Columna Derecha: Value grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-glass p-6 group hover:bg-white/8 transition-colors duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-accent-blue/15 mb-4 group-hover:bg-accent-blue/25 transition-colors">
                  <v.icon className="h-5 w-5 text-accent-blue" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-2">
                  {v.title}
                </h4>
                <p className="text-silver/65 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
