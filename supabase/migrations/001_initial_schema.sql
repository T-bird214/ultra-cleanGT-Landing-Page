-- ============================================================
-- Ultra-CleanGT — Migración Inicial
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- Tabla de leads capturados desde la landing page
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  role         text,
  company      text,
  source       text not null default 'web_landing',
  hubspot_id   text,
  metadata     jsonb not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Índice único en email
create unique index if not exists leads_email_idx on public.leads (email);

-- Índice para leads sin HubSpot ID (sincronización pendiente)
create index if not exists leads_hubspot_pending_idx
  on public.leads (id) where hubspot_id is null;

-- RLS: Solo el service_role puede operar (backend)
alter table public.leads enable row level security;

-- Trigger: actualizar updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.handle_updated_at();

-- Comentarios de documentación
comment on table public.leads is 'Leads capturados desde la landing page de Ultra-CleanGT.';
comment on column public.leads.hubspot_id is 'ID del contacto en HubSpot. NULL = sincronización pendiente.';
comment on column public.leads.metadata is 'Datos adicionales: ip, user_agent, referrer, timestamp.';
