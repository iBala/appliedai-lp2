-- Debug company_likes table structure and relationships
-- This script checks if the table exists and has proper relationships

-- Check if company_likes table exists and its structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'company_likes'
ORDER BY ordinal_position;

-- Check foreign key constraints
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'company_likes';

-- Check if there are any existing likes (sample data)
SELECT 
  id,
  user_id,
  company_id,
  created_at
FROM public.company_likes
LIMIT 5;

-- Check if ai_companies table has the like_count column
SELECT 
  table_name,
  column_name,
  data_type,
  column_default
FROM information_schema.columns 
WHERE table_name = 'ai_companies' 
  AND column_name = 'like_count';

-- Test query: See if we can join company_likes with ai_companies
SELECT 
  cl.id as like_id,
  cl.user_id,
  cl.company_id,
  ac.name as company_name,
  ac.like_count
FROM public.company_likes cl
JOIN public.ai_companies ac ON cl.company_id = ac.id
LIMIT 3; 