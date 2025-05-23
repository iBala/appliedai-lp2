import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint helps diagnose environment variable issues in production
  return NextResponse.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET',
    },
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    message: 'Environment variables check'
  });
} 