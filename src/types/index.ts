// =============================================================================
// src/types/index.ts — Tipos globales del proyecto
// =============================================================================

export interface Lead {
  id?: string
  name: string
  role: string
  company: string
  email: string
  whatsapp: string
  source?: string
  hubspot_id?: string | null
  metadata?: Record<string, unknown>
  created_at?: string
}

export interface LeadFormData {
  name: string
  role: string
  company: string
  email: string
  whatsapp: string
}

export interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
  message?: string
}

export interface HubSpotContact {
  id: string
  properties: {
    email: string
    firstname: string
    lastname: string
    jobtitle: string
    company: string
    phone: string
    hs_lead_status: string
    lead_source: string
  }
}
