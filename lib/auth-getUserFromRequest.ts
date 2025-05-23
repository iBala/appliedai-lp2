import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin-client'

// Helper to extract the Supabase user from the request using the Authorization header
// Returns the user object if valid, otherwise null
export async function getUserFromRequest(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('No Bearer token found in Authorization header')
      return null
    }
    const token = authHeader.replace('Bearer ', '')
    // Validate the JWT and get the user
    const { data, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !data?.user) {
      console.error('Error validating Supabase JWT:', error)
      return null
    }
    return data.user
  } catch (err) {
    console.error('Error in getUserFromRequest:', err)
    return null
  }
} 