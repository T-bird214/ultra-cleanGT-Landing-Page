import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark border-t border-white/5">

      {/* Main footer */}
      <div className="container-corporate section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div>
            <div className="logo-container inline-flex mb-5">
              <Image
                src="/logo.png"
                alt="Ultra-CleanGT S.A."
                width={110}
                height={55}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-silver/60 text-sm leading-relaxed max-w-xs">
              Protocolos internacionales de restauración y mantenimiento de suelos
              para infraestructuras de Clase A en Guatemala.
            </p>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['ISO Certificado', 'Normas Industriales', 'Químicos Seguros'].map((cert) => (
                <span
                  key={cert}
                  className="text-[9px] font-bold uppercase tracking-wider border border-silver/20 text-silver/50 px-2 py-1"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-silver/40 mb-5">
              Servicios
            </h4>
            <ul className="space-y-3 text-sm text-silver/60">
              {[
                'Restauración de Suelos',
                'Sellado Técnico de Piedra',
                'Diagnóstico de Porosidad',
                'Mantenimiento Preventivo',
                'Tratamientos Antideslizantes',
                'Higiene Profunda Industrial',
              ].map((s) => (
                <li key={s} className="hover:text-silver transition-colors cursor-default">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-silver/40 mb-5">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-silver/60">
              <li>
                <a
                  href="mailto:servicios@ultra-cleangt.com"
                  className="flex items-center gap-3 hover:text-silver transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent-blue flex-shrink-0" />
                  servicios@ultra-cleangt.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+50230560456"
                  className="flex items-center gap-3 hover:text-silver transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-blue flex-shrink-0" />
                  +502 3056-0456
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent-blue flex-shrink-0 mt-0.5" />
                <span>Ciudad de Guatemala, Guatemala</span>
              </li>
            </ul>

            <a
              href="https://wa.me/50230560456?text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20de%20suelos."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-secondary inline-flex"
            >
              WhatsApp Directo
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-4">
        <div className="container-corporate flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-silver/35">
          <span>© {year} Ultra-CleanGT S.A. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-silver/70 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-silver/70 transition-colors">Términos</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
