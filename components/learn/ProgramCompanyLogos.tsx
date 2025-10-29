'use client';

import Image from 'next/image';

interface ProgramCompanyLogosProps {
  companies: {
    name: string;
    logoUrl: string;
    description?: string;
  }[];
}

export default function ProgramCompanyLogos({ companies }: ProgramCompanyLogosProps) {
  if (!companies.length) {
    return null;
  }

  const marqueeItems = [...companies, ...companies];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Companies that learn with us</h2>
      <p className="mt-2 text-sm text-gray-600">
        Builders from leading product, community, and operations teams join these cohorts to sharpen their skills.
      </p>

      <div className="relative mt-6 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track">
          {marqueeItems.map((company, index) => (
            <div key={`${company.name}-${index}`} className="logo-tile" title={company.name}>
              <div className="logo-wrapper">
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="max-h-full max-w-full object-contain"
                  priority={index < 4}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: program-logo-marquee 28s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .logo-tile {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, #f6f7fb 0%, #ffffff 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .logo-wrapper {
          width: 120px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes program-logo-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-track {
            gap: 1.25rem;
            animation-duration: 24s;
          }
          .logo-wrapper {
            width: 100px;
            height: 42px;
          }
          .logo-tile {
            padding: 0.75rem 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .marquee-track {
            gap: 1rem;
            animation-duration: 20s;
          }
          .logo-wrapper {
            width: 85px;
            height: 38px;
          }
          .logo-tile {
            padding: 0.6rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
