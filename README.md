# Panchakarma Patient Management System (SIH25023)

A full-function working prototype with a modern healthcare UI, Flask APIs, role-based workflow, AI dosha analysis, therapist suggestion, admin analytics, and billing simulation.

## Project Structure

- `frontend/` React + Vite + Tailwind dashboard and role modules
- `backend/` Flask REST API, JWT middleware, dosha engine, therapist service
- `backend/supabase_schema.sql` Supabase/PostgreSQL schema + RLS enablement
- `bus-routing-system/` legacy project kept untouched

## Roles Supported

- Admin
- Doctor
- Therapist
- Patient

## Backend API Endpoints

- `POST /appointments`
- `POST /ai-dosha-analysis`
- `POST /suggest-therapist`
- `POST /generate-prescription`
- `POST /assign-therapy`
- `GET /admin/dashboard`
- `GET /billing/<patient_id>`
- `PUT /billing/<bill_id>`

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment Targets

- Frontend: Vercel
- Backend: Render
- Database/Auth: Supabase Cloud
