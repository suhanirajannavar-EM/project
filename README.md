# The AdSphere Awards Website

**Where Ideas Become Icons.**

A complete full-stack event website for **The AdSphere Awards** — a prestigious advertising, branding and creative awards ceremony.

- **Event Dates:** 20–21 February 2027  
- **Location:** Bengaluru, Karnataka, India  
- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma + Neon PostgreSQL + NextAuth + Resend + QR Codes  
- **Deployment:** Vercel  

---

## Features Implemented

### Public Website
- Premium dark + gold award-night design
- Homepage with countdown timer, hero, categories preview, two-day overview
- About, Categories, Submit Entry, Register to Attend, Nominees, Speakers, Sponsors, Agenda, Venue, Contact
- Legal pages (Privacy, Terms, Submission Terms)
- Fully responsive

### Award Entry System
- Full multi-field campaign submission form with validation (Zod + React Hook Form)
- Unique Submission ID generation
- Status workflow (Submitted → Under Review → Shortlisted etc.)
- Confirmation email via Resend
- Duplicate protection

### Attendee Registration + QR Tickets
- Separate registration form (independent of award submissions)
- Unique Registration ID + Ticket Number
- Secure QR code generation (token-based, no PII in QR)
- Confirmation email
- Duplicate email prevention

### Administration
- Role-based authentication (NextAuth + Credentials)
- Roles: SUPER_ADMIN, EVENT_MANAGER, AWARD_COORDINATOR, JURY_MEMBER, etc.
- Dashboard with live stats from database
- Modules structure for submissions, registrations, categories, sponsors, speakers, agenda

### Database (Prisma + Neon)
- Comprehensive normalised schema covering users/roles, categories, submissions, jury, evaluations, nominees, attendees, tickets, check-ins, sponsors, speakers, agenda, SPOCs, email templates/logs, audit logs

### Email (Resend)
- Template system with variable replacement
- Confirmation emails for submissions and registrations
- Email logging

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+
- A Neon PostgreSQL database (free tier is fine)
- (Optional) Resend account for emails

### 2. Install
```bash
cd The_AdSphere_Awards_Website
npm install
```

### 3. Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY="re_xxxx"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_FROM_NAME="The AdSphere Awards"
```

### 4. Database
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

Default admin credentials after seed:
- **Email:** `admin@adsphereawards.com`
- **Password:** `Admin@AdSphere2027`

**Change this password immediately in production.**

### 5. Run
```bash
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin/login

---

## Deployment to Vercel + Neon

1. Push this project to a **GitHub** repository.
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo.
3. Create a Neon database at [console.neon.tech](https://console.neon.tech).
4. In Vercel project settings → Environment Variables, add the required vars.
5. Deploy.

---

## Default Admin Account

```
Email:    admin@adsphereawards.com
Password: Admin@AdSphere2027
```

**Change immediately after first login.**

---

Built specifically for **The AdSphere Awards – Where Ideas Become Icons.**
