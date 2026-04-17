// =============================================================================
// src/lib/hubspot/client.ts
// HubSpot API Client — Solo propiedades estándar verificadas
// Docs: https://developers.hubspot.com/docs/api/crm/contacts
// =============================================================================

interface HubSpotContactProps {
  name: string
  role: string
  company: string
  email: string
  whatsapp: string
  source?: string
}

interface HubSpotApiResponse {
  id: string
  properties: Record<string, string>
}

const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

function getToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN no configurado')
  return token
}

function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(' ')
  const firstname = parts[0] || fullName
  const lastname = parts.slice(1).join(' ') || ''
  return { firstname, lastname }
}

// Crea un contacto en HubSpot CRM
export async function createHubSpotContact(
  lead: HubSpotContactProps
): Promise<{ id: string | null; error: string | null }> {
  try {
    const { firstname, lastname } = splitName(lead.name)

    // ⚠️ SOLO propiedades estándar de HubSpot Free
    // lead_source y website NO existen como propiedades de contacto → causan 400
    const payload = {
      properties: {
        email:          lead.email,
        firstname:      firstname,
        lastname:       lastname,
        jobtitle:       lead.role,
        company:        lead.company,
        phone:          lead.whatsapp,
        lifecyclestage: 'lead',
        // hs_lead_status: omitido — requiere HubSpot Sales Hub
        // lead_source:   omitido — no es propiedad estándar de contacto
        // website:       omitido — es propiedad de Empresa, no de Contacto
      },
    }

    console.log('[HubSpot] Enviando payload:', JSON.stringify(payload))

    const response = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    })

    // Leer body UNA sola vez
    const responseData = await response.json()

    // Contacto ya existe (conflicto de email)
    if (response.status === 409) {
      console.log('[HubSpot] Contacto ya existe, extrayendo ID...')
      // El ID viene en el mensaje de error: "Contact already exists. Existing ID: 12345"
      const existingId = responseData.message?.match(/Existing ID:\s*(\d+)/)?.[1]
        ?? responseData.id
        ?? null
      if (existingId) {
        console.log(`[HubSpot] ID del contacto existente: ${existingId}`)
        return { id: String(existingId), error: null }
      }
      return { id: null, error: 'Contacto duplicado pero no se pudo obtener ID' }
    }

    if (!response.ok) {
      console.error(`[HubSpot] Error ${response.status}:`, JSON.stringify(responseData))
      return {
        id: null,
        error: `HubSpot API error ${response.status}: ${responseData.message ?? JSON.stringify(responseData)}`,
      }
    }

    const data = responseData as HubSpotApiResponse
    console.log(`[HubSpot] ✅ Contacto creado con ID: ${data.id}`)
    return { id: data.id, error: null }

  } catch (error) {
    console.error('[HubSpot] Error de conexión:', error)
    return { id: null, error: `Error de conexión: ${String(error)}` }
  }
}

// Actualiza un contacto existente por email
export async function updateHubSpotContact(
  email: string,
  properties: Record<string, string>
): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ properties }),
      }
    )

    if (!response.ok) {
      const err = await response.json()
      console.error('[HubSpot] Error al actualizar:', err)
      return { success: false, error: `HubSpot update error ${response.status}` }
    }

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
