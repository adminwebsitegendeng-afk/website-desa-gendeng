-- 00_init.sql
-- Run this in your Supabase SQL Editor

-- 1. Create Media Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'media' );

CREATE POLICY "Anon Insert Access" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'media' );

CREATE POLICY "Anon Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'media' );

CREATE POLICY "Anon Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'media' );

-- 2. Create Tables

CREATE TABLE IF NOT EXISTS warga_komunitas (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT,
  location TEXT,
  organizer TEXT,
  "shortDesc" TEXT,
  description TEXT,
  "coverImage" TEXT,
  gallery JSONB DEFAULT '[]',
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS wisata_budaya (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT,
  "coverImage" TEXT,
  gallery JSONB DEFAULT '[]',
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS potensi_ekonomi (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  "ownerOrLoc" TEXT,
  description TEXT,
  "coverImage" TEXT,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS galeri_media (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  date TEXT,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profil_desa (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "villageName" TEXT,
  "districtName" TEXT,
  "regencyName" TEXT,
  "greetingTitle" TEXT,
  "greetingName" TEXT,
  "greetingRole" TEXT,
  "greetingMessage" TEXT,
  "greetingImage" TEXT,
  "historyText" TEXT,
  "visionText" TEXT,
  "missionList" JSONB DEFAULT '[]',
  "contactAddress" TEXT,
  "contactPhone" TEXT,
  "contactEmail" TEXT
);

CREATE TABLE IF NOT EXISTS homepage_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "heroWelcome" TEXT,
  "heroTagline" TEXT,
  "heroDesc" TEXT,
  "heroImage" TEXT,
  "heroCtaText" TEXT,
  "highlights" JSONB DEFAULT '[]'
);

-- Note: We are allowing all operations (anon / authenticated) for this local-first / client-side CMS setup. 
-- For production, you may want to set up RLS (Row Level Security) and restrict writes to authenticated admins.

ALTER TABLE warga_komunitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE wisata_budaya ENABLE ROW LEVEL SECURITY;
ALTER TABLE potensi_ekonomi ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE profil_desa ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON warga_komunitas FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON warga_komunitas FOR ALL USING (true);

CREATE POLICY "Allow public read" ON wisata_budaya FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON wisata_budaya FOR ALL USING (true);

CREATE POLICY "Allow public read" ON potensi_ekonomi FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON potensi_ekonomi FOR ALL USING (true);

CREATE POLICY "Allow public read" ON galeri_media FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON galeri_media FOR ALL USING (true);

CREATE POLICY "Allow public read" ON profil_desa FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON profil_desa FOR ALL USING (true);

CREATE POLICY "Allow public read" ON homepage_settings FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON homepage_settings FOR ALL USING (true);
