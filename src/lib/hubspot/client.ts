// =============================================================================
// HubSpot API Client — Gestión de contactos en CRM
// Documentación: https://developers.hubspot.com/docs/api/crm/contacts
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

// Divide nombre completo en nombre y apellido
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

    const payload = {
      properties: {
        email: lead.email,
        firstname,
        lastname,
        jobtitle: lead.role,
        company: lead.company,
        phone: lead.whatsapp,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        lead_source: lead.source ?? 'web',
        // Campo personalizado: pipeline de origen
        website: 'ultra-cleangt.com',
      },
    }

    const response = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    })

    if (response.status === 409) {
      // Contacto ya existe — actualizarlo
      const existing = await response.json()
      const contactId = existing.message?.match(/ID: (\d+)/)?.[1]
      if (contactId) {
        return { id: contactId, error: null }
      }
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[HubSpot] Error al crear contacto:', errorData)
      return { id: null, error: `HubSpot API error: ${response.status}` }
    }

    const data: HubSpotApiResponse = await response.json()
    return { id: data.id, error: null }
  } catch (error) {
    console.error('[HubSpot] Error de conexión:', error)
    return { id: null, error: 'Error de conexión con HubSpot' }
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
      return { success: false, error: `HubSpot update error: ${response.status}` }
    }

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
