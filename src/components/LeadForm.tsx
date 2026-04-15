'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'

interface FormData {
  name: string
  role: string
  company: string
  email: string
  whatsapp: string
}

interface FormErrors {
  name?: string
  role?: string
  company?: string
  email?: string
  whatsapp?: string
  general?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    company: '',
    email: '',
    whatsapp: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = 'Ingrese su nombre completo'
    if (!formData.role.trim()) newErrors.role = 'Ingrese su cargo'
    if (!formData.company.trim()) newErrors.company = 'Ingrese su empresa'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Email corporativo inválido'
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) newErrors.whatsapp = 'Ingrese su número de WhatsApp'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setErrors({})

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok || result.data?.duplicate) {
        setStatus('success')
      } else {
        setErrors({ general: result.error || 'Error al enviar. Intente nuevamente.' })
        setStatus('error')
      }
    } catch {
      setErrors({ general: 'Error de conexión. Verifique su internet e intente de nuevo.' })
      setStatus('error')
    }
  }

  // === ESTADO: ÉXITO ===
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div className="w-16 h-16 bg-green-50 flex items-center justify-center border border-green-200">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy mb-2">¡Solicitud Recibida!</h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
            Nuestro equipo técnico se pondrá en contacto en las próximas <strong>24 horas</strong> para coordinar su diagnóstico sin costo.
          </p>
        </div>
        <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          Datos registrados en el sistema
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Error general */}
      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errors.general}
        </div>
      )}

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="label-corporate">Nombre Completo *</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ej. Ricardo Méndez"
          value={formData.name}
          onChange={handleChange}
          className={`input-corporate ${errors.name ? 'border-red-400' : ''}`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Cargo + Empresa */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="role" className="label-corporate">Cargo *</label>
          <input
            id="role"
            name="role"
            type="text"
            placeholder="Ej. Gerente de Ops."
            value={formData.role}
            onChange={handleChange}
            className={`input-corporate ${errors.role ? 'border-red-400' : ''}`}
          />
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
        </div>
        <div>
          <label htmlFor="company" className="label-corporate">Empresa *</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Ej. Mall X"
            value={formData.company}
            onChange={handleChange}
            className={`input-corporate ${errors.company ? 'border-red-400' : ''}`}
          />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-corporate">Email Corporativo *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="gerencia@empresa.com.gt"
          value={formData.email}
          onChange={handleChange}
          className={`input-corporate ${errors.email ? 'border-red-400' : ''}`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="label-corporate">WhatsApp *</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="+502 3056-0456"
          value={formData.whatsapp}
          onChange={handleChange}
          className={`input-corporate ${errors.whatsapp ? 'border-red-400' : ''}`}
        />
        {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
      </div>

      {/* CTA Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Descargar Guía y Solicitar Prueba
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 leading-relaxed">
        Realizamos una prueba de resultado en sus propias instalaciones antes de cualquier decisión comercial.
      </p>
    </form>
  )
}
