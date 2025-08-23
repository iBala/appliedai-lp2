import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CirclesBackground from "@/components/CirclesBackground";
import { Landmark, LineChart, Workflow, ShieldCheck, ChevronRight } from "lucide-react";

export default function ForCorporatesPage() {
  return (
    <main className="relative">
      {/* Hero */}
      <div className="relative min-h-screen w-full bg-[#0A40C2] overflow-hidden">
        <Header theme="dark" />

        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-200px] top-[220px] hidden md:block opacity-60">
            <CirclesBackground position="left" />
          </div>
          <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100 opacity-80">
            <CirclesBackground position="right" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/10 to-transparent" />
        </div>

        <section className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-6 py-12 text-center text-white">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            <span className="text-white/90">For Corporates</span>
          </div>

          <h1 className="mb-5 text-balance text-[34px] font-semibold leading-[1.15] md:text-[48px] lg:text-[60px]">
            GenAI Training for Corporate Leadership
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/85 md:text-xl lg:leading-[1.6]">
            We provide bespoke GenAI training programs for forward‑thinking enterprises. Equip your leadership team with the insight to drive AI‑led transformation.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-white/80"
            >
              Talk to Us
              <ChevronRight className="ml-1 h-5 w-5" />
            </a>
            <a
              href="#agenda"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Agenda
            </a>
          </div>

          {/* Hero highlight strip */}
          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-left">
              <div className="mb-2 inline-flex items-center gap-2 text-white">
                <Landmark className="h-5 w-5" />
                <span className="text-sm font-semibold">Landscape</span>
              </div>
              <p className="text-sm text-white/80">Overview of GenAI, market trends and enterprise use‑cases.</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-left">
              <div className="mb-2 inline-flex items-center gap-2 text-white">
                <LineChart className="h-5 w-5" />
                <span className="text-sm font-semibold">Strategy</span>
              </div>
              <p className="text-sm text-white/80">Identify opportunities and craft an actionable strategy.</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-left">
              <div className="mb-2 inline-flex items-center gap-2 text-white">
                <Workflow className="h-5 w-5" />
                <span className="text-sm font-semibold">Integration</span>
              </div>
              <p className="text-sm text-white/80">Embed GenAI into workflows with practical frameworks.</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-left">
              <div className="mb-2 inline-flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">Governance</span>
              </div>
              <p className="text-sm text-white/80">Risk management, ethics and adoption roadmap.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Program Overview & Agenda */}
      <section id="agenda" className="relative bg-white py-20">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-3 lg:gap-14">
          {/* Left: Agenda timeline */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 md:text-3xl">One‑Day Leadership Agenda</h2>
            <ol className="relative ml-3 border-l border-gray-200 pl-6">
              <li className="mb-10">
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-[#0A40C2] bg-white" />
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Hour 1 – GenAI Landscape</h3>
                <p className="text-gray-600">A high‑level overview of generative AI, market trends and enterprise use‑cases.</p>
              </li>
              <li className="mb-10">
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-[#0A40C2] bg-white" />
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Hour 2 – Strategy for Leaders</h3>
                <p className="text-gray-600">Identify opportunities in your organization and craft an actionable GenAI strategy.</p>
              </li>
              <li className="mb-10">
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-[#0A40C2] bg-white" />
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Hour 3 – Integrating into Processes</h3>
                <p className="text-gray-600">Frameworks and case studies on embedding GenAI into existing workflows.</p>
              </li>
              <li>
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-[#0A40C2] bg-white" />
                <h3 className="mb-1 text-lg font-semibold text-gray-900">Hour 4 – Governance &amp; Roadmap</h3>
                <p className="text-gray-600">Risk management, ethics and building a practical roadmap for adoption.</p>
              </li>
            </ol>
          </div>

          {/* Right: Summary card */}
          <aside className="self-start">
            <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Program Overview</h3>
              <p className="mb-4 text-sm text-gray-600">
                A focused one‑day session to align leadership on GenAI priorities, opportunities and governance.
              </p>
              <ul className="mb-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3"><Landmark className="mt-0.5 h-4 w-4 text-[#0A40C2]" /><span>Understand the GenAI landscape and use‑cases.</span></li>
                <li className="flex items-start gap-3"><LineChart className="mt-0.5 h-4 w-4 text-[#0A40C2]" /><span>Identify high‑impact opportunities and define strategy.</span></li>
                <li className="flex items-start gap-3"><Workflow className="mt-0.5 h-4 w-4 text-[#0A40C2]" /><span>Explore integration patterns and workflows.</span></li>
                <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-[#0A40C2]" /><span>Discuss risk, ethics and an adoption roadmap.</span></li>
              </ul>
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0A40C2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#08339a]"
              >
                Talk to Us
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-gray-50 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,64,194,0.10),transparent_50%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <h3 className="mx-auto mb-4 max-w-2xl text-2xl font-semibold text-gray-900">Bring GenAI clarity to your leadership team</h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">Align on the landscape, strategy, integration and governance — all in a single intensive day.</p>
          <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#0A40C2] px-6 py-3 text-white hover:bg-[#08339a]">
            Talk to Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
