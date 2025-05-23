-- Quick fix: Change foreign key from companies to ai_companies
-- Run this single command in your Supabase SQL editor

-- Drop the old foreign key constraint
ALTER TABLE public.company_likes DROP CONSTRAINT IF EXISTS company_likes_company_id_fkey;

-- Add new foreign key constraint pointing to ai_companies
ALTER TABLE public.company_likes 
ADD CONSTRAINT company_likes_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.ai_companies(id) ON DELETE CASCADE; 