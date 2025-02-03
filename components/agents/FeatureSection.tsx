'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';

interface FeaturePoint {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  category: string;
  title: string;
  description: string;
  features: FeaturePoint[];
  imageSrc: string;
  imageAlt: string;
}

const FeatureSection = ({
  category,
  title,
  description,
  features,
  imageSrc,
  imageAlt
}: FeatureSectionProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="container mx-auto px-4 py-24 md:px-8">
      <div className="text-black">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-24">
          {/* Left Column - Text Content */}
          <div>
            <p className="mb-6 text-sm font-semibold text-[#0A40C2] lg:text-md">
              {category}
            </p>
            <h2 className="mb-5 max-w-2xl text-[34px] font-semibold leading-tight text-black lg:text-5xl lg:leading-[1.2]">
              {title}
            </h2>
            <div className="space-y-3 text-base font-medium lg:space-y-4 lg:text-lg">
              <p className="leading-[1.6] text-black/70">
                {description}
              </p>
            </div>

            {/* Feature Points */}
            <div className="relative mt-20 border-l border-[#0A40C2]/10 pl-4 lg:pl-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative mb-8 cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <h3 className={clsx(
                    "pb-1.5 font-semibold text-black lg:text-lg transition-colors duration-300",
                    activeFeature === index ? "text-[#0A40C2]" : "text-black"
                  )}>
                    {feature.title}
                  </h3>
                  <div>
                    <p className="leading-[1.6] text-black/70">
                      {feature.description}
                    </p>
                  </div>
                  <span 
                    className={clsx(
                      "absolute -left-[calc(16px+1px)] top-0 h-full w-px transition-all duration-300 lg:-left-[calc(24px+1px)]",
                      activeFeature === index ? "bg-[#0A40C2] opacity-100" : "bg-[#0A40C2]/10 opacity-0"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            className="relative ml-auto aspect-[5/6] w-full self-center md:max-w-[480px]"
          >
            <div className="p-4 transition duration-1000 ease-out will-change-[opacity] relative h-full opacity-100">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 