import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Rocket } from 'lucide-react';
import ProgramDetail from '@/components/learn/ProgramDetail';
import { getProgramBySlug } from '@/lib/learn/programs';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug('bootcamp', slug);

  if (!program) {
    return {
      title: 'Bootcamp | Applied AI Club',
      description: 'The requested bootcamp could not be found.',
    };
  }

  return {
    title: `${program.name} | Applied AI Club`,
    description: program.tagline,
  };
}

export default async function BootcampDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const program = getProgramBySlug('bootcamp', slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetail program={program} tagLabel="Bootcamps to build with AI" tagIcon={<Rocket />} />;
}
