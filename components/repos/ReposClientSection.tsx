"use client"

import { type OpenSourceRepo } from '@/lib/fetch-utils'
import RepoGrid from './RepoGrid'

interface ReposClientSectionProps {
  repos: OpenSourceRepo[]
}

export default function ReposClientSection({ repos }: ReposClientSectionProps) {
  console.log('CLIENT: ReposClientSection received', repos.length, 'repositories');
  
  return (
    <RepoGrid repos={repos} />
  )
} 