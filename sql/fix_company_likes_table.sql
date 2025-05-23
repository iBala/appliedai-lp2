-- Migration: Fix company_likes table to reference ai_companies instead of companies
-- This fixes the table references to work with the actual ai_companies table

-- First, drop the existing foreign key constraint if it exists
ALTER TABLE IF EXISTS public.company_likes 
DROP CONSTRAINT IF EXISTS company_likes_company_id_fkey;

-- Update the foreign key to reference ai_companies
ALTER TABLE public.company_likes 
ADD CONSTRAINT company_likes_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.ai_companies(id) ON DELETE CASCADE;

-- Function: increment_like_count(company_id bigint)
-- Updated to reference ai_companies table
CREATE OR REPLACE FUNCTION public.increment_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.ai_companies
  SET like_count = COALESCE(like_count, 0) + 1
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Function: decrement_like_count(company_id bigint)
-- Updated to reference ai_companies table
CREATE OR REPLACE FUNCTION public.decrement_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.ai_companies
  SET like_count = GREATEST(COALESCE(like_count, 1) - 1, 0)
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql; 