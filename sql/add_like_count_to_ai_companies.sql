-- Migration: Add like_count column to ai_companies table
-- This adds the missing like_count column that is referenced by the like system

-- Add like_count column to ai_companies table
ALTER TABLE public.ai_companies 
ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0 NOT NULL;

-- Set default like_count to 0 for existing companies
UPDATE public.ai_companies 
SET like_count = 0 
WHERE like_count IS NULL;

-- Add index for better performance on like_count queries
CREATE INDEX IF NOT EXISTS idx_ai_companies_like_count ON public.ai_companies(like_count);

-- Add a check constraint to ensure like_count is never negative
ALTER TABLE public.ai_companies 
ADD CONSTRAINT chk_like_count_non_negative 
CHECK (like_count >= 0); 