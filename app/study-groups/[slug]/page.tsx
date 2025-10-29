import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import ProgramDetail from '@/components/learn/ProgramDetail';
import { getProgramBySlug } from '@/lib/learn/programs';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug('study-group', slug);

  if (!program) {
    return {
      title: 'Study Group | Applied AI Club',
      description: 'The requested study group could not be found.',
    };
  }

  return {
    title: `${program.name} | Applied AI Club`,
    description: program.tagline,
  };
}

export default async function StudyGroupDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const program = getProgramBySlug('study-group', slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetail program={program} tagLabel="Self learning via Study Groups" tagIcon={<Users />} />;
}
