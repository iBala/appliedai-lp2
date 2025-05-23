"use client"

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from '@/lib/supabase/client';
import { fetchApi } from '@/lib/fetch-utils';
import type { Session } from '@supabase/supabase-js';

// Company type definition
interface Company {
  id: number;
  name: string;
  about: string;
  home_page: string;
  logo?: string;
  like_count?: number;
  tags?: string[];
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
export default function CompanyGrid({ companies }: { companies: Company[] }) {
  // State for user session
  const [session, setSession] = useState<Session | null>(null);
  // State for liked company IDs
  const [liked, setLiked] = useState<Set<number>>(new Set());
  // State for like loading (companyId => loading)
  const [likeLoading, setLikeLoading] = useState<{ [id: number]: boolean }>({});
  // State for like counts (companyId => count)
  const [likeCounts, setLikeCounts] = useState<{ [id: number]: number }>({});
  // State for login dialog
  const [showLogin, setShowLogin] = useState(false);
  // State for selected tags (multi-select)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from companies
  const allTags = Array.from(new Set(companies.flatMap((c: Company) => c.tags || []))).sort();

  // Filter companies by selected tags (OR logic)
  // When no tags are selected (selectedTags.length === 0), show ALL companies including those without tags
  // When specific tags are selected, show only companies that have at least one of the selected tags
  const filteredCompanies = selectedTags.length === 0
    ? companies // Show all companies when "All" is selected (including companies with no tags)
    : companies.filter((c: Company) => {
        // Special case: if "No Tags" is selected, show companies with empty or no tags array
        if (selectedTags.includes('No Tags')) {
          const hasNoTags = !c.tags || c.tags.length === 0;
          const hasSelectedTags = c.tags?.some((tag: string) => selectedTags.filter(t => t !== 'No Tags').includes(tag));
          return hasNoTags || hasSelectedTags;
        }
        // Regular tag filtering: show companies that have at least one of the selected tags
        return c.tags?.some((tag: string) => selectedTags.includes(tag));
      });

  // Handler for toggling tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handler for clearing all tags
  const clearTags = () => setSelectedTags([]);

  // Check if there are companies without tags to show "No Tags" option
  const hasCompaniesWithoutTags = companies.some((c: Company) => !c.tags || c.tags.length === 0);

  // On mount, get session and liked companies
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

  // Fetch liked companies for the user
  useEffect(() => {
    if (!session) {
      // Clear liked state when user logs out
      setLiked(new Set());
      return;
    }
    
    // Fetch liked companies when user logs in
    console.log('Fetching liked companies for user:', session.user?.email);
    fetchApi<{ likedCompanyIds: number[] }>('companies/liked', {
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
      .then(res => {
        console.log('User has liked companies:', res.likedCompanyIds);
        setLiked(new Set(res.likedCompanyIds));
      })
      .catch(err => {
        console.error('Error fetching liked companies:', err);
        setLiked(new Set());
      });
  }, [session]);

  // Initialize like counts
  useEffect(() => {
    const counts: { [id: number]: number } = {};
    companies.forEach(c => { counts[c.id] = c.like_count ?? 0; });
    setLikeCounts(counts);
  }, [companies]);

  // Debounced like handler with enhanced state management
  const handleLike = useCallback(async (companyId: number) => {
    if (!session) {
      console.log('User not logged in, showing login modal');
      setShowLogin(true);
      return;
    }
    if (likeLoading[companyId]) {
      console.log('Like request already in progress for company:', companyId);
      return;
    }
    
    const wasLiked = liked.has(companyId);
    console.log(`${wasLiked ? 'Unliking' : 'Liking'} company ${companyId} for user:`, session.user?.email);
    
    setLikeLoading(l => ({ ...l, [companyId]: true }));
    try {
      const res = await fetchApi<{ liked: boolean; likeCount: number }>(`companies/${companyId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      
      console.log(`Like operation result for company ${companyId}:`, res);
      
      // Update liked state based on server response
      setLiked(prev => {
        const newSet = new Set(prev);
        if (res.liked) {
          newSet.add(companyId);
        } else {
          newSet.delete(companyId);
        }
        return newSet;
      });
      
      // Update like count
      setLikeCounts(counts => ({ 
        ...counts, 
        [companyId]: res.likeCount ?? counts[companyId] 
      }));
      
    } catch (err) {
      console.error('Error toggling like for company:', companyId, err);
      // Optionally show user-friendly error message
    } finally {
      setLikeLoading(l => ({ ...l, [companyId]: false }));
    }
  }, [session, likeLoading, liked]);

  // Google login handler - updated to redirect back to current page
  const handleGoogleLogin = async () => {
    setShowLogin(false);
    console.log('Initiating Google login...');
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: window.location.href // Redirect back to current page after login
      }
    });
    if (error) {
      console.error('Google login error:', error);
    } else {
      console.log('Google login initiated successfully');
    }
  };

  return (
    <>
      {/* Tag filter bar */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <button
          className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${selectedTags.length === 0 ? 'bg-primary text-white' : 'bg-muted text-primary border-primary'} hover:bg-primary/80 hover:text-white`}
          onClick={clearTags}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-primary text-white' : 'bg-muted text-primary border-primary'} hover:bg-primary/80 hover:text-white`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
        {/* Show "No Tags" option if there are companies without tags */}
        {hasCompaniesWithoutTags && (
          <button
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${selectedTags.includes('No Tags') ? 'bg-primary text-white' : 'bg-muted text-primary border-primary'} hover:bg-primary/80 hover:text-white`}
            onClick={() => toggleTag('No Tags')}
          >
            No Tags
          </button>
        )}
      </div>
      {/* Responsive grid for company cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company: Company) => (
          <Card
            key={company.id}
            className="flex flex-col bg-white rounded-2xl p-4 transition-shadow h-full hover:shadow-md"
          >
            {/* Logo */}
            {company.logo && (
              <Image 
                src={company.logo} 
                alt={`${company.name} logo`} 
                width={64}
                height={64}
                className="rounded-full object-contain mb-3 border-2 border-white self-center" 
              />
            )}
            
            {/* Name */}
            <CardHeader className="items-center text-center p-0 mb-2">
              <CardTitle className="text-lg font-bold leading-tight">{company.name}</CardTitle>
            </CardHeader>
            
            {/* About - Fixed to exactly 2 lines */}
            <CardContent className="text-gray-600 text-center text-sm p-0 mb-3">
              <p className="line-clamp-2 leading-relaxed min-h-[2.5rem]">{company.about}</p>
            </CardContent>
            
            {/* Tags with overflow handling */}
            <div className="mb-3">
              <TagsWithOverflow tags={company.tags || []} />
            </div>
            
            <CardFooter className="w-full flex justify-between items-center mt-auto p-0 pt-2">
              {/* Homepage link */}
              <a 
                href={company.home_page} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary underline font-medium text-sm hover:text-primary/80 truncate"
              >
                Visit Site
                <span className="ml-1" aria-hidden>↗</span>
              </a>
              
              {/* Like button */}
              <Button
                variant="ghost"
                size="sm"
                aria-label={liked.has(company.id) ? 'Unlike' : 'Like'}
                onClick={() => handleLike(company.id)}
                disabled={likeLoading[company.id]}
                className="relative flex items-center gap-1 h-8 px-2"
              >
                {likeLoading[company.id] ? (
                  <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <HeartIcon filled={liked.has(company.id)} className="h-4 w-4" />
                )}
                <span className="text-primary font-semibold text-sm">
                  <AnimatedLikeCount count={likeCounts[company.id] ?? 0} />
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Google login dialog - updated with primary colors and white background */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="z-50 bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Sign in to like companies</DialogTitle>
            <DialogDescription>
              <div className="mb-4 text-center">
                Sign in with Google to save your favorite companies.
              </div>
              <Button onClick={handleGoogleLogin} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 mt-2">
                <svg className="inline-block mr-2" width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.91 2.7 30.28 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.2C12.13 13.09 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.19 5.59C43.93 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M9.67 28.68A14.5 14.5 0 019.5 24c0-1.62.28-3.19.77-4.68l-7.98-6.2A23.94 23.94 0 000 24c0 3.77.9 7.34 2.49 10.48l8.18-5.8z"/><path fill="#EA4335" d="M24 48c6.28 0 11.56-2.08 15.41-5.67l-7.19-5.59c-2.01 1.35-4.6 2.16-8.22 2.16-6.43 0-11.87-3.59-14.33-8.79l-8.18 5.8C6.71 42.18 14.82 48 24 48z"/></g></svg>
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
} 