'use client';

interface ValuePropositionProps {
  title: string;
  description: string;
}

const ValueProposition = ({
  title = "Why AI-powered recruitment?",
  description = "Traditional recruitment processes often miss great candidates due to overwhelming volume and human limitations. Our AI recruitment agent goes beyond keyword matching, understanding the nuanced requirements of your role and company culture. It evaluates candidates holistically, considering their technical skills, soft skills, and potential cultural fit. This means you're not just finding someone who can do the job, but someone who'll thrive in your organization and contribute to its long-term success."
}: ValuePropositionProps) => {
  return (
    <section className="bg-[#0A40C2] py-24 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-8 text-[32px] font-semibold leading-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-lg leading-relaxed text-white/90 md:text-xl md:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition; 