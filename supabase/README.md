# Supabase schema — Shree Samrajya Lakshmi Temple

## How to apply

1. Open your [Supabase](https://supabase.com) project.
2. Go to **SQL Editor** → **New query**.
3. Paste the contents of `schema.sql`.
4. Run the query.

Repeat only if you are starting fresh; the script creates tables, enums, triggers, RLS, and seed data.

## Tables overview

| Table | Purpose |
|-------|--------|
| **members** | Devotee profiles (linked to `auth.users`). `member_id` is the display ID (e.g. MBR9X2K). |
| **family_members** | Family members of a devotee (name, relation). |
| **admin_roles** | Links `auth.users` to role: `super` or `manager`. |
| **puja_types** | Catalog of pujas (name, price_cents, duration_mins). |
| **puja_bookings** | Bookings: member or guest, puja_type, date, time_slot, sankalpa, status, completion_proof_url. |
| **puja_booking_family** | Family names for a booking (sankalpa). |
| **donation_causes** | E-Hundi causes (General, Construction, Anna Danam, etc.). |
| **donations** | Donations: amount, cause, member/guest, 80G, receipt_url. |
| **events** | Temple calendar events (title, date, type). |
| **event_registrations** | Who registered for which event; `attended` for attendance. |
| **event_media** | Media (photos/videos) per event. |
| **store_products** | Store items (name, price_cents, category, stock). |
| **store_orders** | Orders: customer, total, status. |
| **store_order_items** | Order line items (product, quantity, price). |
| **volunteer_applications** | Volunteer signups; status: pending/approved/rejected. |
| **volunteer_assignments** | Assigned seva per approved volunteer. |
| **testimonials** | Devotee testimonials; status for moderation (pending/approved/rejected). |
| **media_uploads** | Gallery and chanting audio; type, file_url, status for moderation. |
| **notifications** | Announcements (title, message, audience, sent_at). |
| **prasadam_items** | Prasadam catalog. |
| **prasadam_orders** / **prasadam_order_items** | Prasadam orders. |

## Enums

- `app_role`: `super`, `manager`
- `booking_status`: `pending`, `confirmed`, `completed`, `cancelled`
- `volunteer_status`: `pending`, `approved`, `rejected`
- `content_status`: `pending`, `approved`, `rejected`
- `media_type`: `gallery`, `audio`
- `notification_audience`: `devotees`, `volunteers`, `event_participants`
- `order_status`: `new`, `processing`, `shipped`, `delivered`, `cancelled`

## Money and amounts

- All monetary values are stored in **cents** (e.g. ₹501 → `50100` in `price_cents` or `amount_cents`).

## Auth and RLS

- **members.id** and **admin_roles.id** reference `auth.users(id)`.
- RLS is enabled on all tables. Policies allow:
  - Members to read/update their own profile and family, and to read their own bookings, donations, orders, event registrations.
  - Anyone to insert bookings, donations, event registrations, volunteer applications, testimonials (public forms).
  - Public read for active puja_types, published events, active store_products, donation_causes, approved testimonials and media.
- Full CRUD for admin (manager/super) is best done via the **service role** key in a backend or Supabase Edge Functions, or by adding policies that check `admin_roles` (e.g. `EXISTS (SELECT 1 FROM admin_roles WHERE id = auth.uid())`).

## Storage (not in schema)

Use Supabase **Storage** for:

- Completion proof files (puja)
- Event media (photos/videos)
- Chanting audio files
- Receipts and product images

Create buckets (e.g. `puja-proofs`, `event-media`, `audio`, `receipts`) and reference the returned paths in `puja_bookings.completion_proof_url`, `event_media.file_url`, `media_uploads.file_url`, etc.
