"use client"

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Star, GitFork, ExternalLink, Code, Calendar, Plus } from "lucide-react";
import { supabase } from '@/lib/supabase/client';
import { fetchApi, fetchLikedRepos } from '@/lib/fetch-utils';
import type { Session } from '@supabase/supabase-js';
import RepoRequestForm from './RepoRequestForm';

// Repository type definition
interface OpenSourceRepo {
  id: number;
  name: string;
  description: string;
  github_url: string;
  homepage_url?: string;
  stars_count: number;
  language?: string;
  license?: string;
  like_count?: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

// Heart icons props interface
interface HeartIconProps {
  filled: boolean;
  className?: string;
  [key: string]: unknown;
}

// Heart icons (outline and filled) - updated to use primary color
const HeartIcon = ({ filled, ...props }: HeartIconProps) => (
  filled ? (
    <svg {...props} viewBox="0 0 24 24" fill="#0A40C2" stroke="none"><path d="M12 21s-6.7-5.2-9.3-8.2C-1.2 9.2 1.6 4 6.5 4c2.1 0 3.9 1.2 5.5 3.1C13.6 5.2 15.4 4 17.5 4 22.4 4 25.2 9.2 21.3 12.8 18.7 15.8 12 21 12 21z"/></svg>
  ) : (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="#0A40C2" strokeWidth="2"><path d="M12 21s-6.7-5.2-9.3-8.2C-1.2 9.2 1.6 4 6.5 4c2.1 0 3.9 1.2 5.5 3.1C13.6 5.2 15.4 4 17.5 4 22.4 4 25.2 9.2 21.3 12.8 18.7 15.8 12 21 12 21z"/></svg>
  )
);

// Animated like count component
const AnimatedLikeCount = ({ count }: { count: number }) => {
  const [display, setDisplay] = useState(count);
  useEffect(() => {
    if (display !== count) {
      const step = count > display ? 1 : -1;
      const timeout = setTimeout(() => setDisplay(display + step), 30);
      return () => clearTimeout(timeout);
    }
  }, [count, display]);
  return <span>{display}</span>;
};

// TagsWithOverflow component for displaying tags with ellipsis and tooltip
const TagsWithOverflow = ({ tags }: { tags: string[] }) => {
  const maxVisibleTags = 3; // Show max 3 tags before showing "..."

  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, maxVisibleTags);
  const hiddenTags = tags.slice(maxVisibleTags);

  return (
    <div className="flex flex-wrap gap-1 relative">
      {visibleTags.map((tag: string) => (
        <span 
          key={tag} 
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-primary border border-primary/20"
        >
          {tag}
        </span>
      ))}
      {hiddenTags.length > 0 && (
        <div className="relative group">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 cursor-help">
            +{hiddenTags.length} more
          </span>
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
            <div className="bg-gray-900 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
              {hiddenTags.join(', ')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main grid component
export default function RepoGrid({ repos }: { repos: OpenSourceRepo[] }) {
  // State for user session
  const [session, setSession] = useState<Session | null>(null);
  // State for liked repository IDs
  const [liked, setLiked] = useState<Set<number>>(new Set());
  // State for like loading (repoId => loading)
  const [likeLoading, setLikeLoading] = useState<{ [id: number]: boolean }>({});
  // State for like counts (repoId => count)
  const [likeCounts, setLikeCounts] = useState<{ [id: number]: number }>({});
  // State for login dialog
  const [showLogin, setShowLogin] = useState(false);
  // State for selected tags (multi-select)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // State for repo request form
  const [showRepoForm, setShowRepoForm] = useState(false);

  // Extract all unique tags from repositories
  const allTags = Array.from(new Set(repos.flatMap((r: OpenSourceRepo) => r.tags || []))).sort();

  // Filter repositories by selected tags (OR logic)
  const filteredRepos = selectedTags.length === 0
    ? repos // Show all repositories when "All" is selected
    : repos.filter((r: OpenSourceRepo) => {
        // Special case: if "No Tags" is selected, show repositories with empty or no tags array
        if (selectedTags.includes('No Tags')) {
          const hasNoTags = !r.tags || r.tags.length === 0;
          const hasSelectedTags = r.tags?.some((tag: string) => selectedTags.filter(t => t !== 'No Tags').includes(tag));
          return hasNoTags || hasSelectedTags;
        }
        // Regular tag filtering: show repositories that have at least one of the selected tags
        return r.tags?.some((tag: string) => selectedTags.includes(tag));
      });

  // Handler for toggling tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handler for clearing all tags
  const clearTags = () => setSelectedTags([]);

  // Check if there are repositories without tags to show "No Tags" option
  const hasReposWithoutTags = repos.some((r: OpenSourceRepo) => !r.tags || r.tags.length === 0);

  // On mount, get session and liked repositories
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  // Fetch user's liked repositories when session changes
  useEffect(() => {
    const fetchUserLikes = async () => {
      if (session?.access_token) {
        try {
          console.log('REPO_GRID: Fetching user liked repositories for session:', session.user?.email);
          const likedRepos = await fetchLikedRepos(session.access_token);
          const likedIds = new Set(likedRepos.map(repo => repo.id));
          setLiked(likedIds);
          console.log('REPO_GRID: User has liked', likedIds.size, 'repositories:', Array.from(likedIds));
        } catch (error) {
          console.error('REPO_GRID: Error fetching user liked repositories:', error);
          // Reset liked state on error
          setLiked(new Set());
        }
      } else {
        // Clear liked state when user logs out
        console.log('REPO_GRID: No session, clearing liked repositories');
        setLiked(new Set());
      }
    };

    fetchUserLikes();
  }, [session]);

  // Initialize like counts
  useEffect(() => {
    const counts: { [id: number]: number } = {};
    repos.forEach(r => { counts[r.id] = r.like_count ?? 0; });
    setLikeCounts(counts);
  }, [repos]);

  // Debounced like handler with enhanced state management
  const handleLike = useCallback(async (repoId: number) => {
    if (!session) {
      console.log('User not logged in, showing login modal');
      setShowLogin(true);
      return;
    }
    if (likeLoading[repoId]) {
      console.log('Like request already in progress for repository:', repoId);
      return;
    }
    
    const wasLiked = liked.has(repoId);
    console.log(`${wasLiked ? 'Unliking' : 'Liking'} repository ${repoId} for user:`, session.user?.email);
    
    setLikeLoading(l => ({ ...l, [repoId]: true }));
    try {
      const res = await fetchApi<{ liked: boolean; likeCount: number }>(`repos/${repoId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      
      console.log('Like response:', res);
      setLiked(prev => {
        const newSet = new Set(prev);
        if (res.liked) newSet.add(repoId);
        else newSet.delete(repoId);
        return newSet;
      });
      setLikeCounts(prev => ({ ...prev, [repoId]: res.likeCount }));
    } catch (err) {
      console.error('Error liking repository:', err);
    } finally {
      setLikeLoading(l => ({ ...l, [repoId]: false }));
    }
  }, [session, liked, likeLoading]);

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/repos` }
      });
      if (error) throw error;
      setShowLogin(false);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Add Repository Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Open Source Repositories
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredRepos.length} {filteredRepos.length === 1 ? 'repository' : 'repositories'} found
          </p>
        </div>
        
        <Button 
          onClick={() => setShowRepoForm(true)}
          className="inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Repository
        </Button>
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearTags}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.length === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({repos.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag} ({repos.filter(r => r.tags?.includes(tag)).length})
              </button>
            ))}
            {hasReposWithoutTags && (
              <button
                onClick={() => toggleTag('No Tags')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes('No Tags')
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No Tags ({repos.filter(r => !r.tags || r.tags.length === 0).length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <Card key={repo.id} className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/repos/${repo.id}`} className="hover:underline">
                      {repo.name}
                    </Link>
                  </CardTitle>
                </div>
                <button
                  onClick={() => handleLike(repo.id)}
                  disabled={likeLoading[repo.id]}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label={liked.has(repo.id) ? 'Unlike repository' : 'Like repository'}
                >
                  <HeartIcon
                    filled={liked.has(repo.id)}
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-3">
                {repo.description}
              </p>
              
              {/* Repository Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{repo.stars_count.toLocaleString()}</span>
                </div>
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <Code className="h-3 w-3 text-blue-500" />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(repo.created_at).getFullYear()}</span>
                </div>
              </div>
              
              {/* Tags */}
              <TagsWithOverflow tags={repo.tags || []} />
            </CardContent>
            
            <CardFooter className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <a
                    href={repo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                  >
                    <GitFork className="h-3 w-3" />
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {repo.homepage_url && (
                    <a
                      href={repo.homepage_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                    >
                      Homepage
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <HeartIcon filled={false} className="w-3 h-3" />
                  <AnimatedLikeCount count={likeCounts[repo.id] || 0} />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <GitFork className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No repositories found
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedTags.length > 0 
              ? 'Try adjusting your tag filters or browse all repositories.'
              : 'No repositories have been added yet.'}
          </p>
          {selectedTags.length > 0 && (
            <Button variant="outline" onClick={clearTags}>
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to like repositories</DialogTitle>
            <DialogDescription>
              Sign in with your Google account to like and save your favorite AI repositories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleGoogleLogin} className="w-full">
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Repository Request Form */}
      <RepoRequestForm 
        isOpen={showRepoForm} 
        onClose={() => setShowRepoForm(false)} 
      />
    </div>
  );
} 