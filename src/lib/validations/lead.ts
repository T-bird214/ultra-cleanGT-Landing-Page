import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre demasiado largo'),

  role: z
    .string()
    .min(2, 'Ingrese su cargo')
    .max(100, 'Cargo demasiado largo'),

  company: z
    .string()
    .min(2, 'Ingrese el nombre de su empresa')
    .max(150, 'Nombre de empresa demasiado largo'),

  email: z
    .string()
    .email('Ingrese un email corporativo válido')
    .max(255, 'Email demasiado largo'),

  whatsapp: z
    .string()
    .min(8, 'Ingrese un número de WhatsApp válido')
    .max(20, 'Número demasiado largo')
    .regex(/^[\+\d\s\-\(\)]+$/, 'Solo números, espacios y guiones permitidos'),
})

export type LeadInput = z.infer<typeof leadSchema>
