-- Supabase SQL Migration Script
-- Run this in the SQL Editor of your Supabase project (https://supabase.com)

-- 1. Create Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'advisor', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create Client Profiles Table (extra details for students/clients)
CREATE TABLE IF NOT EXISTS public.client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    dossier_number VARCHAR(100) NOT NULL UNIQUE,
    selected_service VARCHAR(50) NOT NULL DEFAULT 'study' CHECK (selected_service IN ('study', 'tourism', 'omra')),
    assigned_advisor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('study', 'tourism', 'omra')),
    title VARCHAR(255) NOT NULL,
    destination VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'pending_documents' CHECK (status IN ('pending_documents', 'reviewing', 'approved', 'rejected')),
    next_deadline_date DATE,
    next_deadline_label VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 4. Create Documents Table (checklists and file references)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g., 'Identity', 'Academic', 'Finance', 'Visa'
    status VARCHAR(50) NOT NULL DEFAULT 'missing' CHECK (status IN ('missing', 'action_required', 'pending_verification', 'approved')),
    file_url VARCHAR(2048), -- path in storage bucket
    required_for VARCHAR(255),
    uploaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 5. Create Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    message_text TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 6. Create Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 7. Create Inquiries Table (forms storage)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(100) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    destination_or_package VARCHAR(255),
    message TEXT,
    preferred_contact VARCHAR(50) DEFAULT 'whatsapp',
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 8. Catalog: Universities Table
CREATE TABLE IF NOT EXISTS public.universities (
    id VARCHAR(100) PRIMARY KEY, -- Slug e.g., 'udem', 'sorbonne'
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    logo_url VARCHAR(1000),
    tuition_range VARCHAR(100),
    language VARCHAR(100),
    rank INT,
    rating DECIMAL(2,1),
    programs TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- 9. Catalog: Travel Packages Table
CREATE TABLE IF NOT EXISTS public.travel_packages (
    id VARCHAR(100) PRIMARY KEY, -- Slug e.g., 'maldives-prestige', 'omra-confort'
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('local', 'international', 'omra')),
    base_price NUMERIC(10, 2),
    duration VARCHAR(100),
    image_url VARCHAR(1000),
    highlights TEXT[],
    inclusions TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.travel_packages ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Policies for public.profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for public.client_profiles
CREATE POLICY "Client profiles are viewable by owner, advisor, and admin" ON public.client_profiles
    FOR SELECT USING (
        auth.uid() = user_id OR 
        (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('advisor', 'admin')
    );

CREATE POLICY "Users can update their own client profile details" ON public.client_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for public.applications
CREATE POLICY "Applications viewable by owner, advisor, and admin" ON public.applications
    FOR SELECT USING (
        auth.uid() = client_id OR 
        (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('advisor', 'admin')
    );

CREATE POLICY "Advisors and admins can edit applications" ON public.applications
    FOR ALL USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('advisor', 'admin')
    );

-- Policies for public.documents
CREATE POLICY "Users can view and edit their own application documents" ON public.documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.applications 
            WHERE id = application_id AND client_id = auth.uid()
        ) OR
        (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('advisor', 'admin')
    );

-- Policies for public.chat_messages
CREATE POLICY "Users can send and view their own messages" ON public.chat_messages
    FOR ALL USING (
        auth.uid() = sender_id OR auth.uid() = recipient_id
    );

-- Policies for public.notifications
CREATE POLICY "Users can manage their own notifications" ON public.notifications
    FOR ALL USING (auth.uid() = user_id);

-- Policies for public.inquiries (forms)
CREATE POLICY "Inquiries viewable only by admins/advisors" ON public.inquiries
    FOR SELECT USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('advisor', 'admin')
    );

CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Policies for catalogs (universities & travel packages)
CREATE POLICY "Catalogs are viewable by everyone" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Catalogs are editable only by admin" ON public.universities FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Packages are viewable by everyone" ON public.travel_packages FOR SELECT USING (true);
CREATE POLICY "Packages are editable only by admin" ON public.travel_packages FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- ==========================================
-- SIGNUP TRIGGER FOR PROFILES
-- ==========================================

-- Function to handle new signup in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'fullName', 'Nouveau Client'),
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  );
  
  -- If role is client, create a client_profile automatically
  IF COALESCE(new.raw_user_meta_data->>'role', 'client') = 'client' THEN
    INSERT INTO public.client_profiles (user_id, selected_service, dossier_number)
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'selectedService', 'study'),
      'LT-' || floor(random() * 9000 + 1000)::text
    );
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run handle_new_user on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create default admin user in auth.users
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'd0000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'admin@landtravel.com',
  crypt('admin', gen_salt('bf', 10)), -- Password: admin
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin Land Travel", "role":"admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Force update profile to admin
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@landtravel.com';
