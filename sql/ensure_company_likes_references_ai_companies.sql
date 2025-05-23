-- Ensure company_likes table properly references ai_companies
-- This script fixes any issues with foreign key references

-- Step 1: Check current foreign key constraints
DO $$
BEGIN
    -- Drop all existing foreign key constraints on company_likes
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'company_likes_company_id_fkey' 
               AND table_name = 'company_likes') THEN
        ALTER TABLE public.company_likes DROP CONSTRAINT company_likes_company_id_fkey;
        RAISE NOTICE 'Dropped existing foreign key constraint';
    END IF;
END $$;

-- Step 2: Ensure the table exists with correct structure
CREATE TABLE IF NOT EXISTS public.company_likes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    company_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, company_id)
);

-- Step 3: Add proper foreign key constraint to ai_companies
ALTER TABLE public.company_likes 
ADD CONSTRAINT company_likes_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.ai_companies(id) ON DELETE CASCADE;

-- Step 4: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_company_likes_user_id ON public.company_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_company_likes_company_id ON public.company_likes(company_id);

-- Step 5: Clean up any invalid data (likes for companies that don't exist in ai_companies)
DELETE FROM public.company_likes 
WHERE company_id NOT IN (SELECT id FROM public.ai_companies);

-- Step 6: Show the final structure
SELECT 
  'Table structure:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'company_likes'
ORDER BY ordinal_position;

-- Show foreign key constraints
SELECT 
  'Foreign keys:' as info,
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'company_likes'; 