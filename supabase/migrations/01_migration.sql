-- Migration 01: Add missing columns for profil_desa and homepage_settings

-- Add missing columns to profil_desa
ALTER TABLE profil_desa 
ADD COLUMN IF NOT EXISTS "greetingHeadline" TEXT,
ADD COLUMN IF NOT EXISTS "missionText" TEXT;

-- Add missing columns to homepage_settings
ALTER TABLE homepage_settings
ADD COLUMN IF NOT EXISTS "heroImageProfil" TEXT,
ADD COLUMN IF NOT EXISTS "heroImagePotensi" TEXT,
ADD COLUMN IF NOT EXISTS "heroImageWisata" TEXT,
ADD COLUMN IF NOT EXISTS "heroImageWarga" TEXT;
