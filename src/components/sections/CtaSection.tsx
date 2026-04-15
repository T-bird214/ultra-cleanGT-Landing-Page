'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'

export default function CtaSection() {
  return (
    <section id="cta-final" className="section-padding bg-deep-blue relative overflow-hidden">

      {/* Fondo con patrón de rejilla */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#C0C0C0 1px,transparent 0),linear-gradient(90deg,#C0C0C0 1px,transparent 0)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-corporate relative z-10">

        {/* Before / After imagen conceptual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 overflow-hidden"
          style={{ maxWidth: 900, margin: '0 auto 4rem' }}
        >
          <div className="grid grid-cols-2 h-[260px] md:h-[340px]">
            {/* ANTES */}
            <div
              className="relative flex items-end p-6"
              style={{
                background: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=70&auto=format) center/cover',
                filter: 'saturate(0.3) brightness(0.7)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <span className="relative z-10 text-xs font-bold uppercase tracking-[3px] text-white/60 border border-white/20 px-3 py-1">
                Antes
              </span>
            </div>

            {/* DESPUÉS */}
            <div
              className="relative flex items-end p-6"
              style={{
                background: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format) center/cover',
              }}
            >
              <div className="absolute inset-0 bg-navy/20" />
              <span className="relative z-10 text-xs font-bold uppercase tracking-[3px] text-white border border-white/40 px-3 py-1">
                Después
              </span>
            </div>

            {/* Línea divisoria central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-silver/60 transform -translate-x-1/2 z-20" />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-deep-blue border border-silver/50 w-10 h-10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-silver rotate-0" />
            </div>
          </div>
        </motion.div>

        {/* Copy final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="divider-silver mx-auto mb-6" />

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[46px] font-bold text-white leading-tight mb-6">
            Transforme la imagen de sus instalaciones de manera definitiva.
          </h2>

          <p className="text-silver/70 text-lg leading-relaxed mb-10">
            Obtenga la hoja de ruta técnica que los expertos en Facility Management utilizan
            para mantener edificios de alto rendimiento en Guatemala.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#diagnostico"
              className="btn-primary text-base px-10 py-5"
            >
              <Download className="h-5 w-5" />
              Solicitar Mi Guía y Diagnóstico
            </a>
            <a
              href="https://wa.me/50230560456?text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20de%20suelos%20para%20mis%20instalaciones."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-10 py-5"
            >
              Contactar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-xs text-silver/40 tracking-wider uppercase">
            Sin compromiso comercial · Evaluación en sus instalaciones · Respuesta en 24 horas
          </p>
        </motion.div>

      </div>
    </section>
  )
}
