import { createClient } from '@supabase/supabase-js'

// This Supabase admin client uses the service role key and is for server-side use only.
// Do NOT expose this client or the service role key to the client/browser for security reasons.
// Use for protected actions like toggling likes, admin actions, etc.

// Check for required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!serviceRoleKey) {
  console.warn('Warning: Missing env.SUPABASE_SERVICE_ROLE_KEY - admin client will not bypass RLS')
}

if (!anonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a Supabase client with service role key (bypasses RLS)
export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey || anonKey
) 