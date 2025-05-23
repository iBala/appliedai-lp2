-- Debug and fix the like count functions
-- This script checks and fixes the database functions to ensure they reference ai_companies correctly

-- First, let's drop the existing functions if they exist
DROP FUNCTION IF EXISTS public.increment_like_count(bigint);
DROP FUNCTION IF EXISTS public.decrement_like_count(bigint);

-- Recreate the functions with proper ai_companies table references
CREATE OR REPLACE FUNCTION public.increment_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  -- Debug: Log the function call
  RAISE NOTICE 'increment_like_count called for company_id: %', company_id;
  
  -- Update the ai_companies table (not companies)
  UPDATE public.ai_companies
  SET like_count = COALESCE(like_count, 0) + 1
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  
  -- Debug: Log the result
  RAISE NOTICE 'increment_like_count result: %', new_count;
  
  -- If no rows were updated, return 0
  IF new_count IS NULL THEN
    RAISE NOTICE 'No company found with id: %', company_id;
    RETURN 0;
  END IF;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.decrement_like_count(company_id bigint)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  -- Debug: Log the function call
  RAISE NOTICE 'decrement_like_count called for company_id: %', company_id;
  
  -- Update the ai_companies table (not companies)
  UPDATE public.ai_companies
  SET like_count = GREATEST(COALESCE(like_count, 1) - 1, 0)
  WHERE id = company_id
  RETURNING like_count INTO new_count;
  
  -- Debug: Log the result
  RAISE NOTICE 'decrement_like_count result: %', new_count;
  
  -- If no rows were updated, return 0
  IF new_count IS NULL THEN
    RAISE NOTICE 'No company found with id: %', company_id;
    RETURN 0;
  END IF;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Test the functions work by checking if they can find the table
-- This will help us verify the functions are working correctly
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'ai_companies' 
  AND column_name = 'like_count'; 