'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

type ProcessingState = 'idle' | 'dropping' | 'processing' | 'complete';

const ExtractorScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [showJson, setShowJson] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;

    const timeline = async () => {
      setProcessingState('dropping');
      await new Promise(r => setTimeout(r, 1000));
      setProcessingState('processing');
      await new Promise(r => setTimeout(r, 1500));
      setProcessingState('complete');
      setShowJson(true);
      hasCompletedRef.current = true;
      onComplete();
    };

    timeline();
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* Tag */}
      <div className="mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-white/10 text-white">
          Document Processing
        </span>
      </div>

      {/* Title with Icon */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Extract the invoice and upload to ERP</h3>
      </div>

      {/* Main Container */}
      <div className="flex flex-col space-y-3">
        {/* Document Drop Area */}
        <div className="h-[70px]">
          <div 
            className={clsx(
              "w-full h-full border-2 border-dashed rounded-lg flex items-center transition-all duration-500",
              processingState === 'idle' ? "border-white/20" : "border-white/40",
              processingState === 'dropping' && "scale-95 border-white",
              processingState === 'processing' && "border-solid",
              processingState === 'complete' && "border-green-400/50"
            )}
          >
            {/* Invoice Thumbnail */}
            <div className="flex items-center px-3 w-full">
              <div 
                className={clsx(
                  "w-10 h-14 bg-white/10 rounded flex items-center justify-center mr-3",
                  processingState === 'dropping' && "scale-90 opacity-50",
                  processingState === 'processing' && "animate-pulse"
                )}
              >
                <svg 
                  className="w-5 h-5 text-white/70"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Status Text */}
              <div className="flex-1">
                <div className="text-sm text-white/70">
                  {processingState === 'idle' && "Drop invoice here"}
                  {processingState === 'dropping' && "Processing invoice..."}
                  {processingState === 'processing' && (
                    <div className="flex items-center space-x-2">
                      <span>Extracting data</span>
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
                    </div>
                  )}
                  {processingState === 'complete' && "Invoice processed"}
                </div>
                <div className="text-xs text-white/50 mt-0.5">
                  Invoice_XYZ.pdf
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JSON Output */}
        {showJson && (
          <div className="flex-1">
            <div className="bg-white/10 rounded-lg p-3 h-[180px] overflow-hidden">
              <pre className="text-xs text-white/90 overflow-auto h-full">
                {JSON.stringify({
                  invoice_number: "INV-2024-0123",
                  date: "2024-01-30",
                  due_date: "2024-02-29",
                  vendor: {
                    name: "TechCorp Solutions Inc.",
                    tax_id: "US-987654321",
                    address: "123 Tech Street, San Francisco, CA"
                  },
                  items: [
                    {
                      description: "Software License - Enterprise",
                      quantity: 1,
                      unit_price: 4999.00,
                      total: 4999.00
                    }
                  ],
                  subtotal: 4999.00,
                  tax_rate: 0.085,
                  tax_amount: 424.92,
                  total_amount: 5423.92,
                  currency: "USD",
                  payment_terms: "Net 30"
                }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtractorScreen; 