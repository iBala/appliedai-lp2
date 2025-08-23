import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CirclesBackground from "@/components/CirclesBackground";

export default function ForCorporatesPage() {
  return (
    <main className="relative">
      {/* Hero */}
      <div className="relative min-h-screen w-full bg-[#0A40C2] overflow-hidden">
        <Header theme="dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100">
            <CirclesBackground position="right" />
          </div>
        </div>

        <section className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-6 py-8 text-center text-white">
          <h1 className="mb-6 text-balance text-[36px] font-semibold leading-[1.2] md:text-[48px] lg:text-[60px] lg:leading-[1.15]">
            GenAI Training for Corporate Leadership
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl lg:text-xl lg:leading-[1.55]">
            We provide bespoke GenAI training programs for forward‑thinking enterprises. Equip your leadership team with the insight to drive AI‑led transformation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-white/70"
          >
            Talk to Us
          </a>
        </section>
      </div>

      {/* Agenda */}
      <section className="relative bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold text-gray-900">
            One‑Day Leadership Agenda
          </h2>
          <div className="mx-auto grid max-w-3xl gap-8">
            <div className="rounded-xl border border-gray-200 p-8">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Hour 1 – GenAI Landscape
              </h3>
              <p className="text-gray-600">
                A high‑level overview of generative AI, market trends and enterprise use‑cases.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-8">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Hour 2 – Strategy for Leaders
              </h3>
              <p className="text-gray-600">
                Identify opportunities in your organization and craft an actionable GenAI strategy.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-8">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Hour 3 – Integrating into Processes
              </h3>
              <p className="text-gray-600">
                Frameworks and case studies on embedding GenAI into existing workflows.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-8">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Hour 4 – Governance &amp; Roadmap
              </h3>
              <p className="text-gray-600">
                Risk management, ethics and building a practical roadmap for adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

