-- =============================================================================
-- Shree Samrajya Lakshmi Temple — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================================================

-- Enable UUID extension (usually already on in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE app_role AS ENUM ('super', 'manager');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE volunteer_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE content_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE media_type AS ENUM ('gallery', 'audio');
CREATE TYPE notification_audience AS ENUM ('devotees', 'volunteers', 'event_participants');
CREATE TYPE order_status AS ENUM ('new', 'processing', 'shipped', 'delivered', 'cancelled');

-- =============================================================================
-- PROFILES / MEMBERS (devotees — links to auth.users)
-- =============================================================================

CREATE TABLE public.members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  member_id TEXT UNIQUE NOT NULL DEFAULT ('MBR' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 6))),
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  city TEXT,
  state TEXT,
  dob DATE,
  gender TEXT,
  gotra TEXT,
  nakshatra TEXT,
  address TEXT,
  member_since DATE NOT NULL DEFAULT CURRENT_DATE,
  is_volunteer BOOLEAN DEFAULT FALSE,
  volunteer_status volunteer_status,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_members_member_id ON public.members(member_id);
CREATE INDEX idx_members_mobile ON public.members(mobile);
CREATE INDEX idx_members_email ON public.members(email);
CREATE INDEX idx_members_city ON public.members(city);

-- Family members of a devotee
CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_family_members_member ON public.family_members(member_id);

-- =============================================================================
-- ADMIN ROLES (links to auth.users — who is manager/super)
-- =============================================================================

CREATE TABLE public.admin_roles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'manager',
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_admin_roles_id ON public.admin_roles(id);

-- =============================================================================
-- PUJA / SEVA
-- =============================================================================

CREATE TABLE public.puja_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  duration_mins INTEGER,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.puja_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  -- Guest booking (no account)
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  guest_gotra TEXT,
  guest_nakshatra TEXT,
  --
  puja_type_id UUID NOT NULL REFERENCES public.puja_types(id),
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  sankalpa TEXT,
  gotra TEXT,
  nakshatra TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  completion_proof_url TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_booking_has_member_or_guest CHECK (
    (member_id IS NOT NULL) OR (guest_name IS NOT NULL AND guest_phone IS NOT NULL)
  )
);

CREATE INDEX idx_puja_bookings_member ON public.puja_bookings(member_id);
CREATE INDEX idx_puja_bookings_date ON public.puja_bookings(booking_date);
CREATE INDEX idx_puja_bookings_status ON public.puja_bookings(status);

CREATE TABLE public.puja_booking_family (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.puja_bookings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_puja_booking_family_booking ON public.puja_booking_family(booking_id);

-- =============================================================================
-- DONATIONS / E-HUNDI
-- =============================================================================

CREATE TABLE public.donation_causes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  guest_pan TEXT,
  amount_cents INTEGER NOT NULL,
  cause_id UUID REFERENCES public.donation_causes(id),
  cause_name TEXT,
  receipt_url TEXT,
  eighty_g_eligible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_donation_positive CHECK (amount_cents > 0)
);

CREATE INDEX idx_donations_member ON public.donations(member_id);
CREATE INDEX idx_donations_created ON public.donations(created_at);
CREATE INDEX idx_donations_amount ON public.donations(amount_cents);

-- =============================================================================
-- EVENTS & CALENDAR
-- =============================================================================

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_type TEXT,
  max_participants INTEGER,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_date ON public.events(event_date);

CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  tickets_count INTEGER DEFAULT 1,
  attended BOOLEAN DEFAULT FALSE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_reg_has_member_or_guest CHECK (
    (member_id IS NOT NULL) OR (guest_name IS NOT NULL AND (guest_phone IS NOT NULL OR guest_email IS NOT NULL))
  )
);

CREATE INDEX idx_event_registrations_event ON public.event_registrations(event_id);
CREATE INDEX idx_event_registrations_member ON public.event_registrations(member_id);

CREATE TABLE public.event_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_media_event ON public.event_media(event_id);

-- =============================================================================
-- STORE
-- =============================================================================

CREATE TABLE public.store_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  price_cents INTEGER NOT NULL,
  category TEXT,
  description TEXT,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_store_products_category ON public.store_products(category);

CREATE TABLE public.store_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL DEFAULT ('ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0')),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT,
  total_cents INTEGER NOT NULL,
  status order_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_store_orders_member ON public.store_orders(member_id);
CREATE INDEX idx_store_orders_status ON public.store_orders(status);
CREATE INDEX idx_store_orders_created ON public.store_orders(created_at);

CREATE TABLE public.store_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.store_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.store_products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_order_item_positive CHECK (quantity > 0 AND price_cents >= 0)
);

CREATE INDEX idx_store_order_items_order ON public.store_order_items(order_id);

-- =============================================================================
-- VOLUNTEERS
-- =============================================================================

CREATE TABLE public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  state TEXT,
  education TEXT,
  skills TEXT,
  preferred_seva TEXT NOT NULL,
  availability TEXT NOT NULL,
  additional_info TEXT,
  status volunteer_status NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_volunteer_applications_status ON public.volunteer_applications(status);

CREATE TABLE public.volunteer_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.volunteer_applications(id) ON DELETE CASCADE,
  seva_area TEXT NOT NULL,
  notes TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_volunteer_assignments_application ON public.volunteer_assignments(application_id);

-- =============================================================================
-- CONTENT MODERATION (Testimonials, Media, Chanting audio)
-- =============================================================================

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_location TEXT,
  content TEXT NOT NULL,
  status content_status NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_status ON public.testimonials(status);

CREATE TABLE public.media_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type media_type NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  duration_seconds INTEGER,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploader_type TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_uploads_type ON public.media_uploads(type);
CREATE INDEX idx_media_uploads_status ON public.media_uploads(status);

-- =============================================================================
-- NOTIFICATIONS (announcements)
-- =============================================================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  audience notification_audience NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_audience ON public.notifications(audience);
CREATE INDEX idx_notifications_sent ON public.notifications(sent_at);

-- =============================================================================
-- PRASADAM / OFFERINGS (optional — for prasadam orders)
-- =============================================================================

CREATE TABLE public.prasadam_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.prasadam_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT NOT NULL,
  total_cents INTEGER NOT NULL,
  status order_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.prasadam_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.prasadam_orders(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.prasadam_items(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- UPDATED_AT TRIGGERS
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_members BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_admin_roles BEFORE UPDATE ON public.admin_roles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_puja_types BEFORE UPDATE ON public.puja_types FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_puja_bookings BEFORE UPDATE ON public.puja_bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_events BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_store_products BEFORE UPDATE ON public.store_products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_store_orders BEFORE UPDATE ON public.store_orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_volunteer_applications BEFORE UPDATE ON public.volunteer_applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_media_uploads BEFORE UPDATE ON public.media_uploads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_prasadam_orders BEFORE UPDATE ON public.prasadam_orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) — Enable and basic policies
-- =============================================================================

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puja_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puja_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puja_booking_family ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_causes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prasadam_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prasadam_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prasadam_order_items ENABLE ROW LEVEL SECURITY;

-- Members: users can read/update own row; service role can do all
CREATE POLICY "members_select_own" ON public.members FOR SELECT USING (auth.uid() = id);
CREATE POLICY "members_update_own" ON public.members FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "members_insert_own" ON public.members FOR INSERT WITH CHECK (auth.uid() = id);

-- Family members: member can CRUD own
CREATE POLICY "family_select" ON public.family_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.members m WHERE m.id = family_members.member_id AND m.id = auth.uid())
);
CREATE POLICY "family_insert" ON public.family_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.members m WHERE m.id = family_members.member_id AND m.id = auth.uid())
);
CREATE POLICY "family_update" ON public.family_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.members m WHERE m.id = family_members.member_id AND m.id = auth.uid())
);
CREATE POLICY "family_delete" ON public.family_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.members m WHERE m.id = family_members.member_id AND m.id = auth.uid())
);

-- Public read for catalog / events (guests need to see)
CREATE POLICY "puja_types_select_all" ON public.puja_types FOR SELECT USING (is_active = TRUE);
CREATE POLICY "events_select_published" ON public.events FOR SELECT USING (is_published = TRUE);
CREATE POLICY "store_products_select_active" ON public.store_products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "donation_causes_select" ON public.donation_causes FOR SELECT USING (is_active = TRUE);
CREATE POLICY "prasadam_items_select" ON public.prasadam_items FOR SELECT USING (is_active = TRUE);

-- Admin policies: use a helper to check admin (service role or in admin_roles)
-- For simplicity: allow service_role full access; authenticated users get limited access.
-- You can add a custom claim or admin_roles check in more complex policies.

-- Allow anon/authenticated to INSERT bookings, donations, registrations (public forms)
CREATE POLICY "puja_bookings_insert" ON public.puja_bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "donations_insert" ON public.donations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "event_registrations_insert" ON public.event_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "volunteer_applications_insert" ON public.volunteer_applications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "testimonials_insert" ON public.testimonials FOR INSERT WITH CHECK (TRUE);

-- Members can read own bookings, donations, orders
CREATE POLICY "puja_bookings_select_own" ON public.puja_bookings FOR SELECT USING (
  auth.uid() = member_id OR (member_id IS NULL AND guest_phone IS NOT NULL)
);
CREATE POLICY "donations_select_own" ON public.donations FOR SELECT USING (auth.uid() = member_id);
CREATE POLICY "store_orders_select_own" ON public.store_orders FOR SELECT USING (auth.uid() = member_id);
CREATE POLICY "event_registrations_select_own" ON public.event_registrations FOR SELECT USING (auth.uid() = member_id);

-- Approved content visible to all
CREATE POLICY "testimonials_select_approved" ON public.testimonials FOR SELECT USING (status = 'approved');
CREATE POLICY "media_uploads_select_approved" ON public.media_uploads FOR SELECT USING (status = 'approved');

-- =============================================================================
-- SEED (optional) — minimal seed for puja_types and donation_causes
-- =============================================================================

-- Seed only if tables are empty (run once)
INSERT INTO public.puja_types (name, price_cents, duration_mins)
SELECT * FROM (VALUES
  ('Samrajya Lakshmi Puja', 110000, 90),
  ('Lakshmi Narayana Puja', 210000, 120),
  ('Lalitha Sahasranama Parayana', 150000, 90),
  ('Special Archana', 50100, 30),
  ('Satyanarayana Puja', 510000, 120)
) AS v(name, price_cents, duration_mins)
WHERE NOT EXISTS (SELECT 1 FROM public.puja_types LIMIT 1);

INSERT INTO public.donation_causes (name)
SELECT * FROM (VALUES
  ('General Temple Fund'),
  ('Temple Construction'),
  ('Anna Danam (Food Service)'),
  ('Go Seva (Cow Protection)'),
  ('Vidya Danam (Education)'),
  ('Festival Fund')
) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM public.donation_causes LIMIT 1);
