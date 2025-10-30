import { ReactNode } from 'react';
import { formatDate } from '@/lib/utils';
import ResourceHeroSection from '@/components/resources/ResourceHeroSection';
import ContactEmail from '@/components/learn/ContactEmail';
import Footer from '@/components/Footer';
import type { LearningProgram } from '@/lib/learn/programs';
import { CONTACT_EMAIL } from '@/lib/learn/programs';
import ProgramCompanyLogos from '@/components/learn/ProgramCompanyLogos';
import RegisterInterestForm from '@/components/learn/RegisterInterestForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProgramDetailProps {
  program: LearningProgram;
  tagLabel: string;
  tagIcon: ReactNode;
}

export default function ProgramDetail({ program, tagLabel, tagIcon }: ProgramDetailProps) {
  return (
    <main className="min-h-screen bg-white">
      <ResourceHeroSection
        tag={tagLabel}
        tagIcon={tagIcon}
        title={program.name}
        description={program.tagline}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-8 py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <p className="text-base leading-7 text-gray-700">{program.description}</p>

              <ul className="space-y-3">
                {program.bulletPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-black">Who is this for?</h2>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {program.whoIsItFor.map((audience) => (
                    <li key={audience} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Investment</p>
                <p className="mt-2 text-2xl font-semibold text-black">{program.priceLabel}</p>
                {program.depositLabel && (
                  <p className="mt-2 text-sm text-gray-600">{program.depositLabel}</p>
                )}
                {program.refundPolicy && (
                  <p className="mt-1 text-xs text-gray-500">{program.refundPolicy}</p>
                )}

                <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Duration</span>
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800">Format</span>
                    <span>{program.cadenceDescription}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800">Next cohort</span>
                    <span>
                      {program.cohort.label || 'Upcoming'} · {formatDate(program.cohort.startDate)} →{' '}
                      {formatDate(program.cohort.endDate)}
                    </span>
                    <span className="text-xs text-gray-500">Demo day · {formatDate(program.cohort.demoDate)}</span>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-black text-white hover:bg-black/85">
                    Register interest
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Register your interest</DialogTitle>
                    <DialogDescription>
                      Share your details and we&apos;ll send the payment link and onboarding instructions on email and
                      WhatsApp.
                    </DialogDescription>
                  </DialogHeader>
                  <RegisterInterestForm
                    programSlug={program.slug}
                    programType={program.type}
                    programName={program.name}
                    cohortLabel={program.cohort.label}
                    layout="plain"
                  />
                </DialogContent>
              </Dialog>
              <p className="text-xs text-gray-500">
                We process forms within 24 hours. You&apos;ll get the payment link, cohort calendar, and onboarding
                checklist in your inbox and WhatsApp.
              </p>
            </aside>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-black">Live cohort schedule</h2>
              <dl className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt>Kick-off</dt>
                  <dd>{formatDate(program.cohort.startDate)}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt>Wrap-up</dt>
                  <dd>{formatDate(program.cohort.endDate)}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt>Demo day</dt>
                  <dd>{formatDate(program.cohort.demoDate)}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <dt>Sync ups</dt>
                  <dd className="text-right">{program.cohort.syncUps}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-gray-600">{program.cohort.whatsappGroupDescription}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-black">What you will ship</h2>
              <p className="mt-3 text-sm text-gray-700">
                A project that you present live, plus a published case study. We showcase your demo on the Applied AI
                Club channels once the cohort wraps up.
              </p>
              {/* <div className="mt-6 h-40 rounded-xl bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 text-sm text-gray-600">
                <p className="font-medium text-gray-700">Program visuals coming soon</p>
                <p className="mt-2 text-xs text-gray-500">
                  We are working with alumni to document their builds and will add their screenshots here shortly.
                </p>
              </div> */}
            </div>
          </div>

          <div className="mt-20 space-y-10">
            <div>
              <h2 className="text-xl font-semibold text-black">Facilitators</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {program.facilitators.map((facilitator) => (
                  <div key={facilitator.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="text-lg font-semibold text-black">{facilitator.name}</p>
                    <p className="mt-1 text-sm font-medium text-blue-600">{facilitator.title}</p>
                    <p className="mt-3 text-sm text-gray-700">{facilitator.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <ProgramCompanyLogos companies={program.participatingCompanies} />
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <h2 className="text-xl font-semibold text-black">Frequently asked questions</h2>
              <div className="mt-6 space-y-4">
                {program.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-black">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-black">Still have questions?</h2>
              <p className="mt-3 text-sm text-gray-700">
                Drop us a note and we will get back within 24 hours. Share the cohort you are interested in and the
                questions you have—we&apos;ll take it from there.
              </p>
              <div className="mt-5">
                <ContactEmail email={CONTACT_EMAIL} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
