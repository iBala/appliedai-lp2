-- Option 1: Completely disable RLS for the ai_companies table
-- This is simpler but less secure
ALTER TABLE ai_companies DISABLE ROW LEVEL SECURITY;

-- Option 2: Create a permissive policy that allows anyone to read companies 
-- but requires authentication for writes
CREATE POLICY "Allow anonymous read access to ai_companies" 
ON ai_companies
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert to ai_companies" 
ON ai_companies
FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated update to ai_companies" 
ON ai_companies
FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Same for ai_jobs table
ALTER TABLE ai_jobs DISABLE ROW LEVEL SECURITY;

-- Or create policies 
CREATE POLICY "Allow anonymous read access to ai_jobs" 
ON ai_jobs
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert to ai_jobs" 
ON ai_jobs
FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow authenticated update to ai_jobs" 
ON ai_jobs
FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role'); 