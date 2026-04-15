import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations/lead'
import { createServerClient } from '@/lib/supabase/server'
import { createHubSpotContact } from '@/lib/hubspot/client'

// =============================================================================
// POST /api/leads
// Guarda un lead en Supabase y sincroniza con HubSpot de forma asíncrona
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    // 1. Parsear body
    const body = await request.json()

    // 2. Validar con Zod
    const validation = leadSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          data: null,
          error: 'Datos inválidos',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const leadData = validation.data

    // 3. Obtener metadata adicional
    const metadata = {
      ip: request.headers.get('x-forwarded-for') ?? 'unknown',
      user_agent: request.headers.get('user-agent')?.substring(0, 200) ?? '',
      referrer: request.headers.get('referer') ?? '',
      timestamp: new Date().toISOString(),
    }

    // 4. Guardar en Supabase
    const supabase = createServerClient()

    const { data: savedLead, error: supabaseError } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.whatsapp,
        role: leadData.role,
        company: leadData.company,
        source: 'web_landing',
        metadata,
      })
      .select('id, email')
      .single()

    if (supabaseError) {
      // Email duplicado — igual responder éxito al usuario
      if (supabaseError.code === '23505') {
        console.log(`[Leads] Email duplicado: ${leadData.email}`)
        return NextResponse.json(
          { data: { duplicate: true }, error: null, message: 'Ya registrado' },
          { status: 200 }
        )
      }

      console.error('[Supabase] Error al guardar lead:', supabaseError)
      return NextResponse.json(
        { data: null, error: 'Error al guardar. Inténtelo nuevamente.' },
        { status: 500 }
      )
    }

    // 5. Sincronizar con HubSpot (no bloqueante — no falla si HubSpot falla)
    if (savedLead) {
      createHubSpotContact({
        name: leadData.name,
        role: leadData.role,
        company: leadData.company,
        email: leadData.email,
        whatsapp: leadData.whatsapp,
        source: 'Ultra-CleanGT Landing Page',
      })
        .then(async ({ id: hubspotId, error }) => {
          if (hubspotId) {
            // Actualizar registro en Supabase con el ID de HubSpot
            await supabase
              .from('leads')
              .update({ hubspot_id: hubspotId })
              .eq('id', savedLead.id)
            console.log(`[HubSpot] Contacto creado: ${hubspotId}`)
          } else {
            console.error('[HubSpot] No se pudo crear contacto:', error)
          }
        })
        .catch((err) => {
          console.error('[HubSpot] Error async:', err)
        })
    }

    // 6. Respuesta de éxito
    return NextResponse.json(
      {
        data: { id: savedLead?.id },
        error: null,
        message: 'Lead registrado correctamente',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API/leads] Error no controlado:', error)
    return NextResponse.json(
      { data: null, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Método GET para health check
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: '/api/leads' })
}
