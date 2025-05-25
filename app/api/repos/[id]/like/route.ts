import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin-client';
import { createClient } from '@supabase/supabase-js';

// POST endpoint for liking/unliking repositories
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('API: Like/Unlike repository endpoint called');
  
  try {
    const { id } = await params;
    const repoId = parseInt(id);
    
    console.log('API: Processing like/unlike for repository ID:', repoId);
    
    if (isNaN(repoId)) {
      return NextResponse.json({ error: 'Invalid repository ID' }, { status: 400 });
    }

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('API: No valid authorization header found');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Create a Supabase client with the user's token for authentication
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // Get the current user from the token
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('API ERROR: Error getting user from token:', userError);
      return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
    }

    console.log('API: Authenticated user:', user.email, 'for repository:', repoId);

    // Use user email as the user identifier for consistency
    const userIdentifier = user.email!;

    // Check if the repository exists
    const { data: repo, error: repoError } = await supabaseAdmin
      .from('ai_open_source_repos')
      .select('id, like_count')
      .eq('id', repoId)
      .single();

    if (repoError) {
      console.error('API ERROR: Error fetching repository:', repoError);
      if (repoError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
      }
      return NextResponse.json({ error: repoError.message }, { status: 500 });
    }

    // Check if user has already liked this repository
    const { data: existingLike, error: likeCheckError } = await supabaseAdmin
      .from('repo_likes')
      .select('id')
      .eq('repo_id', repoId)
      .eq('user_identifier', userIdentifier)
      .single();

    if (likeCheckError && likeCheckError.code !== 'PGRST116') {
      console.error('API ERROR: Error checking existing like:', likeCheckError);
      return NextResponse.json({ error: 'Failed to check like status' }, { status: 500 });
    }

    const isCurrentlyLiked = !!existingLike;
    console.log('API: Current like status for user', userIdentifier, 'on repo', repoId, ':', isCurrentlyLiked);

    let newLikeCount = repo.like_count || 0;
    let liked = false;

    if (isCurrentlyLiked) {
      // Unlike: Remove the like record
      console.log('API: Removing like for user', userIdentifier, 'on repo', repoId);
      
      const { error: deleteLikeError } = await supabaseAdmin
        .from('repo_likes')
        .delete()
        .eq('repo_id', repoId)
        .eq('user_identifier', userIdentifier);

      if (deleteLikeError) {
        console.error('API ERROR: Error removing like:', deleteLikeError);
        return NextResponse.json({ error: 'Failed to remove like' }, { status: 500 });
      }

      // Decrement like count
      newLikeCount = Math.max(0, newLikeCount - 1);
      liked = false;
    } else {
      // Like: Add the like record
      console.log('API: Adding like for user', userIdentifier, 'on repo', repoId);
      
      const { error: insertLikeError } = await supabaseAdmin
        .from('repo_likes')
        .insert([{
          repo_id: repoId,
          user_identifier: userIdentifier
        }]);

      if (insertLikeError) {
        console.error('API ERROR: Error adding like:', insertLikeError);
        return NextResponse.json({ error: 'Failed to add like' }, { status: 500 });
      }

      // Increment like count
      newLikeCount = newLikeCount + 1;
      liked = true;
    }

    // Update the repository's like count
    const { error: updateRepoError } = await supabaseAdmin
      .from('ai_open_source_repos')
      .update({ like_count: newLikeCount })
      .eq('id', repoId);

    if (updateRepoError) {
      console.error('API ERROR: Error updating repository like count:', updateRepoError);
      return NextResponse.json({ error: 'Failed to update like count' }, { status: 500 });
    }

    console.log(`API: Successfully ${liked ? 'liked' : 'unliked'} repository ${repoId}. New like count: ${newLikeCount}`);

    return NextResponse.json({ 
      liked,
      likeCount: newLikeCount,
      message: liked ? 'Repository liked successfully' : 'Repository unliked successfully'
    });

  } catch (error) {
    console.error('API CRITICAL ERROR: Like/Unlike repository API error:', error);
    return NextResponse.json({ error: 'Failed to process like request' }, { status: 500 });
  }
} 