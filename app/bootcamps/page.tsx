import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import ResourceHeroSection from '@/components/resources/ResourceHeroSection';
import Footer from '@/components/Footer';
import { getBootcampPrograms } from '@/lib/learn/programs';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Bootcamps | Applied AI Club',
  description: 'Immersive bootcamps to build with AI alongside experts.',
};

const programs = getBootcampPrograms();

export default function BootcampsPage() {
  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Learn AI"
        tagIcon={<Rocket />}
        title="Bootcamps to build with AI"
        description="Learn from experts in immersive cohorts where you design, build, and ship production-grade AI workflows."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-8 py-16">
          <div className="grid gap-8">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 p-8">
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800">
                      Bootcamp
                    </span>
                    <h2 className="text-2xl font-semibold text-black">{program.name}</h2>
                    <p className="text-base text-gray-600">{program.tagline}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <ul className="space-y-2 text-sm text-gray-700">
                      {program.bulletPoints.slice(0, 3).map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-purple-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-black">Upcoming cohort</p>
                      <p className="mt-2 text-sm text-gray-700">
                        {program.cohort.label} · {formatDate(program.cohort.startDate)} →{' '}
                        {formatDate(program.cohort.demoDate)}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">{program.priceLabel}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={`/bootcamps/${program.slug}`}
                      className="inline-flex items-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
                    >
                      Explore the {program.name}
                    </Link>
                    <span className="text-sm font-medium text-gray-500">
                      Demo day on {formatDate(program.cohort.demoDate)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-xl font-semibold text-black">Bootcamp format</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-600">Instructor-led</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Deep dives from practitioners who have shipped production workflows. Every session includes live
                  walkthroughs and code reviews.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-600">Project-focused</h4>
                <p className="mt-2 text-sm text-gray-600">
                  You will complete a capstone project, present it live, and receive detailed feedback on the architecture
                  and execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
