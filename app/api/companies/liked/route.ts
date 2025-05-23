import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { getUserFromRequest } from '@/lib/auth-getUserFromRequest'

// GET /api/companies/liked
// Returns a list of company IDs liked by the authenticated user
export async function GET(req: NextRequest) {
  // Get user from request (implement this helper to extract user from Supabase session)
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = user.id
  try {
    const { data, error } = await supabaseAdmin
      .from('company_likes')
      .select('company_id')
      .eq('user_id', userId)
    if (error) {
      console.error('Error fetching liked companies:', error)
      return NextResponse.json({ error: 'Error fetching liked companies' }, { status: 500 })
    }
    const likedCompanyIds = data.map((row: { company_id: number }) => row.company_id)
    return NextResponse.json({ likedCompanyIds })
  } catch (err) {
    console.error('Error in liked companies endpoint:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 