export interface BeehiivBlock {
  type: string;
  text?: string;
  level?: number;
  content?: string;
  url?: string;
  caption?: string;
  alignment?: string;
  items?: string[];
  html?: string;
  textAlignment?: 'left' | 'center' | 'right';
  anchorHeader?: boolean;
  anchorIncludeInToc?: boolean;
  // Add other block properties as needed
}

export interface BeehiivApiResponse {
  data: {
    id: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    created: number;
    status: string;
    publish_date?: number;
    displayed_date?: number;
    split_tested: boolean;
    subject_line?: string;
    preview_text?: string;
    slug: string;
    thumbnail_url?: string;
    web_url?: string;
    audience?: string;
    platform?: string;
    content_tags?: string[];
    meta_default_description?: string;
    meta_default_title?: string;
    hidden_from_feed?: boolean;
    content?: {
      free?: {
        web?: string;
        email?: string;
        rss?: string;
      };
      premium?: {
        web?: string;
        email?: string;
      };
    };
    stats?: {
      email?: {
        recipients: number;
        delivered: number;
        opens: number;
        unique_opens: number;
        clicks: number;
        unique_clicks: number;
        unsubscribes: number;
        spam_reports: number;
      };
      web?: {
        views: number;
        clicks: number;
      };
      clicks?: Array<{
        total_clicks: number;
        total_unique_clicks: number;
        total_click_through_rate: number;
      }>;
    };
  };
}

export interface BeehiivPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  publishedAt: string;
  thumbnail_url?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  readTimeMinutes?: number;
}

export interface BeehiivResponse {
  data: BeehiivPost[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
} 