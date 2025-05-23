import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { getUserFromRequest } from '@/lib/auth-getUserFromRequest'

// POST /api/companies/[id]/like
// Toggle like/unlike for a company by the authenticated user
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: companyId } = await params
  console.log(`Like API: Processing like toggle for company ${companyId}`)
  
  // Get user from request (implement this helper to extract user from Supabase session)
  const user = await getUserFromRequest(req)
  if (!user) {
    console.log('Like API: Unauthorized request - no user found')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = user.id
  console.log(`Like API: Processing request for user ${userId}`)
  
  try {
    // Check if user already liked this company
    console.log(`Like API: Checking existing like for user ${userId} and company ${companyId}`)
    const { data: existing, error: likeError } = await supabaseAdmin
      .from('company_likes')
      .select('id')
      .eq('user_id', userId)
      .eq('company_id', companyId)
      .single()
      
    console.log(`Like API: Existing like query result:`, { existing, error: likeError })
      
    if (likeError && likeError.code !== 'PGRST116') {
      // Not found is fine, any other error is not
      console.error('Like API: Error checking existing like:', likeError)
      return NextResponse.json({ error: 'Error checking like' }, { status: 500 })
    }
    
    let liked
    let likeCount
    
    if (existing) {
      // Unlike: remove row and decrement like_count
      console.log(`Like API: UNLIKE - Removing existing like with id ${existing.id} for company ${companyId}`)
      const { error: deleteError } = await supabaseAdmin
        .from('company_likes')
        .delete()
        .eq('id', existing.id)
      
      if (deleteError) {
        console.error('Like API: Error deleting like:', deleteError)
        return NextResponse.json({ error: 'Error removing like' }, { status: 500 })
      }
      console.log(`Like API: Successfully deleted like record`)
      
      // Update like_count on ai_companies table - try stored function first, fallback to direct update
      try {
        const { data: updated, error: updateError } = await supabaseAdmin.rpc('decrement_like_count', { company_id: companyId })
        if (updateError) {
          throw updateError
        }
        liked = false
        likeCount = updated
        console.log(`Like API: Successfully removed like using function. New count: ${likeCount}`)
      } catch (functionError) {
        console.log(`Like API: Function failed, trying direct update:`, functionError)
        // Fallback: Get current count and decrement
        const { data: currentCompany, error: fetchError } = await supabaseAdmin
          .from('ai_companies')
          .select('like_count')
          .eq('id', companyId)
          .single()
        
        if (fetchError) {
          console.error('Like API: Error fetching current like count:', fetchError)
          return NextResponse.json({ error: 'Error updating like count' }, { status: 500 })
        }
        
        const newCount = Math.max((currentCompany.like_count || 1) - 1, 0)
        const { data: directUpdate, error: directError } = await supabaseAdmin
          .from('ai_companies')
          .update({ like_count: newCount })
          .eq('id', companyId)
          .select('like_count')
          .single()
        
        if (directError) {
          console.error('Like API: Direct update also failed:', directError)
          return NextResponse.json({ error: 'Error updating like count' }, { status: 500 })
        }
        
        liked = false
        likeCount = directUpdate.like_count
        console.log(`Like API: Successfully removed like using direct update. New count: ${likeCount}`)
      }
    } else {
      // Like: insert row and increment like_count
      console.log(`Like API: LIKE - Adding new like for user ${userId} and company ${companyId}`)
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('company_likes')
        .insert({ user_id: userId, company_id: companyId })
        .select()
      
      if (insertError) {
        console.error('Like API: Error inserting like:', insertError)
        return NextResponse.json({ error: 'Error adding like' }, { status: 500 })
      }
      console.log(`Like API: Successfully inserted like record:`, insertData)
      
      // Update like_count on ai_companies table - try stored function first, fallback to direct update
      try {
        const { data: updated, error: updateError } = await supabaseAdmin.rpc('increment_like_count', { company_id: companyId })
        if (updateError) {
          throw updateError
        }
        liked = true
        likeCount = updated
        console.log(`Like API: Successfully added like using function. New count: ${likeCount}`)
      } catch (functionError) {
        console.log(`Like API: Function failed, trying direct update:`, functionError)
        // Fallback: Get current count and increment
        const { data: currentCompany, error: fetchError } = await supabaseAdmin
          .from('ai_companies')
          .select('like_count')
          .eq('id', companyId)
          .single()
        
        if (fetchError) {
          console.error('Like API: Error fetching current like count:', fetchError)
          return NextResponse.json({ error: 'Error updating like count' }, { status: 500 })
        }
        
        const newCount = (currentCompany.like_count || 0) + 1
        const { data: directUpdate, error: directError } = await supabaseAdmin
          .from('ai_companies')
          .update({ like_count: newCount })
          .eq('id', companyId)
          .select('like_count')
          .single()
        
        if (directError) {
          console.error('Like API: Direct update also failed:', directError)
          return NextResponse.json({ error: 'Error updating like count' }, { status: 500 })
        }
        
        liked = true
        likeCount = directUpdate.like_count
        console.log(`Like API: Successfully added like using direct update. New count: ${likeCount}`)
      }
    }
    
    return NextResponse.json({ liked, likeCount })
  } catch (err) {
    console.error('Like API: Critical error toggling like:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 