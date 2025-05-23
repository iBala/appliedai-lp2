-- Migration: Create company_likes table to track which user liked which company
-- This table enforces one like per user per company and supports toggling like/unlike

CREATE TABLE IF NOT EXISTS public.company_likes (
    id BIGSERIAL PRIMARY KEY, -- Unique identifier for each like
    user_id UUID NOT NULL,    -- Supabase Auth user id
    company_id BIGINT NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, company_id) -- Enforce one like per user per company
);

-- Index for fast lookup by user
CREATE INDEX IF NOT EXISTS idx_company_likes_user_id ON public.company_likes(user_id);
-- Index for fast lookup by company
CREATE INDEX IF NOT EXISTS idx_company_likes_company_id ON public.company_likes(company_id);

-- Function: increment_like_count(company_id bigint)
-- Atomically increments like_count for a company and returns the new count
CREATE OR REPLACE FUNCTION public.increment_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.companies
  SET like_count = COALESCE(like_count, 0) + 1
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Function: decrement_like_count(company_id bigint)
-- Atomically decrements like_count for a company and returns the new count
CREATE OR REPLACE FUNCTION public.decrement_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.companies
  SET like_count = GREATEST(COALESCE(like_count, 1) - 1, 0)
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql; 