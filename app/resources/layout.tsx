import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | AppliedAI Club',
  description: 'Detailed guides and resources for AppliedAI Club members',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 