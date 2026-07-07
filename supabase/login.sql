-- Simple login + guest play support for A+Prompt.
-- Run this after schema.sql. It is additive and safe to re-run.

create extension if not exists "pgcrypto";

alter table public.profiles
  add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null,
  add column if not exists is_guest boolean not null default false,
  add column if not exists last_seen_at timestamptz not null default now();

create table if not exists public.guest_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  guest_name text not null default 'Guest Player',
  device_label text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  auth_user_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('guest_start', 'login', 'logout')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index if not exists profiles_is_guest_idx on public.profiles(is_guest);
create index if not exists guest_sessions_profile_id_idx on public.guest_sessions(profile_id);
create index if not exists login_events_profile_id_idx on public.login_events(profile_id);

alter table public.guest_sessions enable row level security;
alter table public.login_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_sessions'
      and policyname = 'Service role manages guest sessions'
  ) then
    create policy "Service role manages guest sessions"
      on public.guest_sessions
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'login_events'
      and policyname = 'Service role manages login events'
  ) then
    create policy "Service role manages login events"
      on public.login_events
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

-- Example guest flow:
-- 1. Insert a guest profile:
--    insert into public.profiles (display_name, is_guest)
--    values ('Guest Player', true)
--    returning id;
--
-- 2. Create a guest session for that profile id:
--    insert into public.guest_sessions (profile_id, device_label)
--    values ('PROFILE_ID_HERE', 'browser guest');
--
-- 3. Optional: record the event:
--    insert into public.login_events (profile_id, event_type)
--    values ('PROFILE_ID_HERE', 'guest_start');
