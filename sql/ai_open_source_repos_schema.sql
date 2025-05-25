-- Create the ai_open_source_repos table
CREATE TABLE public.ai_open_source_repos (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  github_url VARCHAR(500) NOT NULL UNIQUE,
  homepage_url VARCHAR(500),
  stars_count INTEGER DEFAULT 0,
  language VARCHAR(100),
  license VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  like_count INTEGER DEFAULT 0
);

-- Create mapping table for repo tags (reusing existing ai_company_tags)
CREATE TABLE public.ai_repo_tag_map (
  id BIGSERIAL PRIMARY KEY,
  repo_id BIGINT NOT NULL REFERENCES public.ai_open_source_repos(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES public.ai_company_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (repo_id, tag_id)
);

-- Create likes table for repos
CREATE TABLE public.repo_likes (
  id BIGSERIAL PRIMARY KEY,
  repo_id BIGINT NOT NULL REFERENCES public.ai_open_source_repos(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (repo_id, user_identifier)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_open_source_repos_stars_count ON public.ai_open_source_repos(stars_count DESC);
CREATE INDEX IF NOT EXISTS idx_ai_open_source_repos_language ON public.ai_open_source_repos(language);
CREATE INDEX IF NOT EXISTS idx_ai_open_source_repos_like_count ON public.ai_open_source_repos(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_ai_repo_tag_map_repo_id ON public.ai_repo_tag_map(repo_id);
CREATE INDEX IF NOT EXISTS idx_ai_repo_tag_map_tag_id ON public.ai_repo_tag_map(tag_id);
CREATE INDEX IF NOT EXISTS idx_repo_likes_repo_id ON public.repo_likes(repo_id);

-- Enable Row Level Security (RLS) for consistency with existing tables
ALTER TABLE public.ai_open_source_repos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_repo_tag_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repo_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read access (similar to companies)
CREATE POLICY "Allow anonymous read access to ai_open_source_repos"
ON public.ai_open_source_repos
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous read access to ai_repo_tag_map"
ON public.ai_repo_tag_map
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous read access to repo_likes"
ON public.repo_likes
FOR SELECT
TO anon
USING (true);

-- Create policies for authenticated insert/update
CREATE POLICY "Allow authenticated insert to ai_open_source_repos"
ON public.ai_open_source_repos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to ai_repo_tag_map"
ON public.ai_repo_tag_map
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to repo_likes"
ON public.repo_likes
FOR INSERT
TO authenticated
WITH CHECK (true); 