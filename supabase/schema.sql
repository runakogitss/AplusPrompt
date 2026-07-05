create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text,
  display_name text,
  business_name text,
  business_type text,
  created_at timestamptz not null default now()
);

create table if not exists missions (
  id text primary key,
  title text not null,
  subtitle text not null,
  difficulty text not null,
  skill_focus text[] not null default '{}',
  scenario jsonb not null default '{}',
  bad_prompt_example text not null,
  improved_prompt_example text not null,
  success_criteria text[] not null default '{}',
  is_locked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists rubric_categories (
  id text primary key,
  name text not null,
  weight integer not null check (weight > 0),
  question text not null
);

create table if not exists prompt_attempts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  mission_id text not null references missions(id) on delete cascade,
  user_prompt text not null,
  improved_prompt text,
  created_at timestamptz not null default now()
);

create table if not exists prompt_scores (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references prompt_attempts(id) on delete cascade,
  mission_id text references missions(id) on delete cascade,
  total_score integer not null check (total_score between 0 and 100),
  grade text not null,
  user_title text not null,
  category_scores jsonb not null default '{}',
  strengths text[] not null default '{}',
  weaknesses text[] not null default '{}',
  coach_explanation text not null,
  next_reps text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists playbook_entries (
  id text primary key,
  profile_id uuid references profiles(id) on delete set null,
  mission_id text not null references missions(id) on delete cascade,
  title text not null,
  final_prompt text not null,
  score integer check (score between 0 and 100),
  tags text[] not null default '{}',
  when_to_use text,
  inputs_to_replace text[] not null default '{}',
  safety_notes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists customer_save_runs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  business_type text not null,
  complaint text not null,
  policy text not null,
  tone text not null,
  output jsonb not null,
  approval_required boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists certificate_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  track_id text not null,
  missions_completed text[] not null default '{}',
  prompt_attempts_count integer not null default 0,
  improved_prompts_count integer not null default 0,
  saved_playbook_count integer not null default 0,
  final_assessment_score integer,
  certificate_unlocked boolean not null default false,
  certificate_title text not null,
  completed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists subscription_plans (
  plan_id text primary key,
  name text not null,
  price_display text not null,
  features text[] not null default '{}',
  is_mock boolean not null default true
);

alter table profiles enable row level security;
alter table missions enable row level security;
alter table rubric_categories enable row level security;
alter table prompt_attempts enable row level security;
alter table prompt_scores enable row level security;
alter table playbook_entries enable row level security;
alter table customer_save_runs enable row level security;
alter table certificate_progress enable row level security;
alter table subscription_plans enable row level security;

create policy "Public read missions" on missions for select using (true);
create policy "Public read rubric" on rubric_categories for select using (true);
create policy "Public read mock plans" on subscription_plans for select using (true);
