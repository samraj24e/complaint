-- Panchakarma Patient Management System schema
create table if not exists users (
  id uuid primary key,
  role text not null check (role in ('admin','doctor','therapist','patient')),
  full_name text not null,
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists patients (
  id uuid primary key references users(id) on delete cascade,
  age int,
  gender text,
  medical_history text
);

create table if not exists doctors (
  id uuid primary key references users(id) on delete cascade,
  specialization text,
  license_no text
);

create table if not exists therapists (
  id uuid primary key references users(id) on delete cascade,
  skills text[] default '{}',
  active_cases int default 0
);

create table if not exists appointments (
  id bigserial primary key,
  patient_id uuid references patients(id),
  doctor_id uuid references doctors(id),
  scheduled_at timestamptz,
  status text default 'booked'
);

create table if not exists therapies (
  id bigserial primary key,
  appointment_id bigint references appointments(id),
  therapist_id uuid references therapists(id),
  therapy_name text,
  progress int default 0,
  notes text,
  completed boolean default false
);

create table if not exists prescriptions (
  id bigserial primary key,
  appointment_id bigint references appointments(id),
  diagnosis text,
  medicines jsonb,
  ai_result jsonb,
  created_at timestamptz default now()
);

create table if not exists billing (
  id bigserial primary key,
  patient_id uuid references patients(id),
  appointment_id bigint references appointments(id),
  consultation_fee numeric(10,2) default 0,
  therapy_fee numeric(10,2) default 0,
  total numeric(10,2) generated always as (consultation_fee + therapy_fee) stored,
  status text default 'pending'
);

alter table users enable row level security;
alter table patients enable row level security;
alter table doctors enable row level security;
alter table therapists enable row level security;
alter table appointments enable row level security;
alter table therapies enable row level security;
alter table prescriptions enable row level security;
alter table billing enable row level security;
