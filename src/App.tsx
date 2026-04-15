/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Award,
  Microscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function App() {
  return (
    <div className="min-h-screen bg-deep-blue font-sans text-white selection:bg-accent-blue selection:text-white">
      {/* Navigation */}
      <header className="flex items-center justify-between px-[60px] py-[24px] bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-2">
          <div className="text-[22px] font-black tracking-[1px] text-white">
            ULTRA-CLEAN<span className="text-accent-blue">GT</span>
          </div>
        </div>
        <div className="text-[12px] text-silver font-bold tracking-wider">
          SOLUCIONES CORPORATIVAS
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="flex min-h-[calc(768px-80px-80px)] items-center gap-[40px] px-[60px] pb-[40px]">
          <div className="flex-[1.2]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-[16px] text-[12px] font-bold uppercase tracking-[3px] text-accent-blue">
                Expertos en Facility Management
              </div>
              <h1 className="font-serif text-[42px] font-normal leading-[1.1] text-white mb-[20px]">
                Proteja la inversión de sus instalaciones: <strong className="font-bold">Recupere el estándar de sus suelos</strong> sin reemplazarlos.
              </h1>
              <p className="mb-[32px] max-w-[540px] text-[18px] leading-[1.5] text-silver">
                Descargue nuestra guía técnica y descubra cómo los protocolos internacionales de restauración extienden la vida útil de su infraestructura y elevan su imagen de marca.
              </p>
              
              <div className="grid grid-cols-3 gap-[16px] mt-[20px]">
                {[
                  {
                    title: "Diagnóstico Científico",
                    description: "Identificamos la suciedad acumulada en la porosidad profunda.",
                  },
                  {
                    title: "Cero Interrupción",
                    description: "Protocolos nocturnos que garantizan continuidad comercial.",
                  },
                  {
                    title: "Máximo ROI",
                    description: "Evite gastos de sustitución mediante sellado especializado.",
                  }
                ].map((benefit, i) => (
                  <div key={i} className="bg-glass border-t border-white/10 p-[16px] rounded-[4px]">
                    <h3 className="text-[13px] font-bold uppercase tracking-[1px] text-accent-blue mb-[8px]">{benefit.title}</h3>
                    <p className="text-[12px] leading-[1.4] text-silver">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex-[0.8] flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              {/* Ebook Mockup */}
              <div className="mx-auto mb-[-60px] relative z-10 flex h-[280px] w-[220px] flex-col justify-center rounded-[4px_12px_12px_4px] border border-white/10 bg-gradient-to-br from-[#001529] to-[#003366] p-[24px] text-center shadow-[20px_20px_40px_rgba(0,0,0,0.5)]">
                <div className="mb-[10px] inline-block border border-accent-blue p-[4px] text-[10px] font-bold uppercase text-accent-blue self-center">
                  Guía Gratuita
                </div>
                <div className="font-serif text-[20px] leading-[1.2] text-white mb-[10px]">
                  Guía Maestra de Protección de Activos
                </div>
                <div className="text-[10px] opacity-70">
                  Sistema de Restauración para Áreas de Alto Tráfico
                </div>
              </div>

              <Card className="rounded-[8px] border-none bg-white p-[80px_32px_32px_32px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <CardContent className="p-0">
                  <h2 className="mb-[20px] text-center text-[18px] font-bold text-navy">Descargar Guía Técnica</h2>
                  
                  <form className="space-y-[12px]" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-[4px]">
                      <Label htmlFor="name" className="text-[11px] font-bold uppercase text-slate-500">Nombre Completo</Label>
                      <Input id="name" placeholder="Ej. Ricardo Méndez" className="h-[40px] rounded-[4px] border-slate-200 text-navy placeholder:text-slate-400" />
                    </div>
                    <div className="flex gap-[10px]">
                      <div className="flex-1 space-y-[4px]">
                        <Label htmlFor="role" className="text-[11px] font-bold uppercase text-slate-500">Cargo</Label>
                        <Input id="role" placeholder="Gerente de Op." className="h-[40px] rounded-[4px] border-slate-200 text-navy placeholder:text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-[4px]">
                        <Label htmlFor="company" className="text-[11px] font-bold uppercase text-slate-500">Empresa</Label>
                        <Input id="company" placeholder="Corporación X" className="h-[40px] rounded-[4px] border-slate-200 text-navy placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-[4px]">
                      <Label htmlFor="email" className="text-[11px] font-bold uppercase text-slate-500">Email Corporativo</Label>
                      <Input id="email" type="email" placeholder="r.mendez@empresa.gt" className="h-[40px] rounded-[4px] border-slate-200 text-navy placeholder:text-slate-400" />
                    </div>
                    <Button className="mt-[10px] h-[48px] w-full rounded-[4px] bg-navy text-[14px] font-bold uppercase tracking-[1px] text-white hover:bg-navy/90">
                      Obtener Guía + Prueba Sin Costo
                    </Button>
                    <p className="mt-[12px] text-center text-[11px] leading-[1.4] text-slate-400">
                      *Evaluamos el resultado en su propio suelo antes de cualquier decisión comercial.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Ingeniería en Restauración de Superficies
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                Protocolos técnicos diseñados para la durabilidad y la mínima interrupción operativa.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Diagnóstico Científico",
                  description: "Identificamos la suciedad acumulada en la porosidad que la limpieza diaria ignora mediante análisis técnico.",
                  icon: Microscope,
                },
                {
                  title: "Cero Interrupción",
                  description: "Operamos con protocolos que garantizan la continuidad de su tráfico comercial, sin afectar sus operaciones.",
                  icon: Clock,
                },
                {
                  title: "Retorno de Inversión",
                  description: "Evite gastos masivos en cambio de pisos mediante el sellado y mantenimiento especializado de activos.",
                  icon: TrendingUp,
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-slate-100 transition-shadow hover:shadow-lg">
                    <CardContent className="p-8">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                        <benefit.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-navy">{benefit.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Value Section */}
        <section className="bg-deep-blue py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-3xl lg:aspect-auto lg:h-[600px]">
                <img 
                  src="https://picsum.photos/seed/cleaning/1200/1200" 
                  alt="Suelos brillantes tipo espejo" 
                  className="h-full w-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-serif text-2xl italic text-silver">"No limpiamos superficies. Extendemos la vida de tus espacios."</p>
                </div>
              </div>
              
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl text-white">
                  Su infraestructura es el reflejo de su reputación corporativa
                </h2>
                <p className="mt-6 text-lg text-silver">
                  Un suelo opaco o deteriorado no solo es un problema estético; es un activo que pierde valor y una señal de descuido para sus clientes y colaboradores.
                </p>
                
                <div className="mt-10 space-y-8">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <Award className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Prestigio Institucional</h4>
                      <p className="text-silver">Mantenga el estándar visual de las edificaciones A+ y centros comerciales de lujo.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <ShieldCheck className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Seguridad y Normativa</h4>
                      <p className="text-silver">Tratamientos antideslizantes e higiene profunda bajo estándares internacionales de seguridad.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <Building2 className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Protección de Activos</h4>
                      <p className="text-silver">Protocolos de sellado que evitan la porosidad y el desgaste prematuro de la piedra natural.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <footer className="bg-black/30 px-[60px] py-[20px] flex items-center gap-[40px] border-t border-white/05">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-white/40 w-[120px]">
            Confían en Nosotros
          </div>
          <div className="flex-1 flex justify-between opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
            <div className="font-bold text-[14px] text-white">MALL MULTICENTRO</div>
            <div className="font-bold text-[14px] text-white">TORRE EMPRESARIAL A+</div>
            <div className="font-bold text-[14px] text-white">LOGÍSTICA GLOBAL GT</div>
            <div className="font-bold text-[14px] text-white">HOSPITAL INDUSTRIAL</div>
          </div>
        </footer>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-deep-blue py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold tracking-tight text-white">
                ULTRA-CLEAN<span className="text-accent-blue">GT</span>
              </div>
            </div>
            <p className="text-sm text-silver">
              © 2024 Ultra-CleanGT Guatemala. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm font-medium text-silver">
              <a href="#" className="hover:text-accent-blue">Privacidad</a>
              <a href="#" className="hover:text-accent-blue">Términos</a>
              <a href="#" className="hover:text-accent-blue">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
