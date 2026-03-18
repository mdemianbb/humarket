-- =============================================
-- HUMARKET - Schema de base de datos
-- Ejecutar en: Supabase > SQL Editor > New query
-- =============================================

-- Partners (empresas que publican apps)
create table if not exists partners (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  company     text,
  email       text,
  created_at  timestamptz default now()
);

-- Apps del marketplace
create table if not exists apps (
  id             uuid default gen_random_uuid() primary key,
  partner_id     uuid references partners(id) on delete cascade,
  name           text not null,
  description    text,
  category       text,
  type           text default 'saas',        -- 'saas' | 'service'
  logo_url       text,
  website_url    text,
  price          numeric default 0,
  price_model    text default 'monthly',     -- 'monthly' | 'per_seat' | 'commission'
  commission_pct numeric default 0,
  status         text default 'pending',     -- 'pending' | 'published' | 'rejected'
  tags           text[] default '{}',
  created_at     timestamptz default now()
);

-- Comunidades (empresas clientes de Humand)
create table if not exists communities (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  industry    text,
  employees   integer default 0,
  plan        text default 'basic',          -- 'basic' | 'pro' | 'enterprise'
  logo_url    text,
  created_at  timestamptz default now()
);

-- Instalaciones (qué apps están activas en qué comunidad)
create table if not exists installations (
  id            uuid default gen_random_uuid() primary key,
  community_id  uuid references communities(id) on delete cascade,
  app_id        uuid references apps(id) on delete cascade,
  status        text default 'active',       -- 'active' | 'inactive'
  installed_at  timestamptz default now(),
  config        jsonb default '{}',
  unique(community_id, app_id)
);

-- =============================================
-- Permisos (necesario para que el cliente pueda
-- leer y escribir sin autenticación)
-- =============================================
alter table partners     enable row level security;
alter table apps         enable row level security;
alter table communities  enable row level security;
alter table installations enable row level security;

create policy "public read partners"      on partners     for select using (true);
create policy "public insert partners"    on partners     for insert with check (true);
create policy "public read apps"          on apps         for select using (true);
create policy "public insert apps"        on apps         for insert with check (true);
create policy "public update apps"        on apps         for update using (true);
create policy "public read communities"   on communities  for select using (true);
create policy "public read installations" on installations for select using (true);
create policy "public insert installations" on installations for insert with check (true);
create policy "public update installations" on installations for update using (true);
