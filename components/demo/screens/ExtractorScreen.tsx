'use client';

import React from 'react';
import { useState, useRef } from 'react';
import clsx from 'clsx';

type ProcessingState = 'idle' | 'dropping' | 'processing' | 'complete';
type DocumentType = 'invoice' | 'statement' | 'review';

interface Template {
  type: DocumentType;
  label: string;
  icon: React.ReactNode;
}

interface DocumentOutput {
  type: DocumentType;
  statusText: string;
  fileName: string;
  jsonOutput: object;
}

const documentOutputs: Record<DocumentType, DocumentOutput> = {
  invoice: {
    type: 'invoice',
    statusText: "Processing invoice...",
    fileName: "Invoice_XYZ.pdf",
    jsonOutput: {
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
    }
  },
  statement: {
    type: 'statement',
    statusText: "Processing bank statement...",
    fileName: "Statement_Jan2024.pdf",
    jsonOutput: {
      account_number: "****1234",
      statement_period: "Jan 1 - Jan 31, 2024",
      opening_balance: 15420.50,
      closing_balance: 17832.25,
      transactions: [
        {
          date: "2024-01-15",
          description: "Direct Deposit - ACME Corp",
          amount: 5000.00,
          type: "credit"
        },
        {
          date: "2024-01-18",
          description: "AWS Cloud Services",
          amount: -258.35,
          type: "debit"
        },
        {
          date: "2024-01-25",
          description: "Client Payment - XYZ Ltd",
          amount: 2500.00,
          type: "credit"
        }
      ]
    }
  },
  review: {
    type: 'review',
    statusText: "Processing customer review...",
    fileName: "Review_123.pdf",
    jsonOutput: {
      review_id: "R123456",
      restaurant: "Chef's Corner",
      customer: {
        name: "Maren Saris",
        verified: true,
        visit_date: "2024-01-28"
      },
      rating: {
        overall: 5,
        food: 5,
        service: 5,
        ambiance: 4
      },
      review_text: "Loved my dinner at the Chef's corner.",
      sentiment: "positive",
      keywords: ["dinner", "staff", "service", "atmosphere"],
      recommended: true
    }
  }
};

const ExtractorScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [showJson, setShowJson] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentType | null>(null);
  const hasCompletedRef = useRef(false);

  const templates: Template[] = [
    {
      type: 'invoice',
      label: 'Invoice',
      icon: (
        <div className="w-12 h-14 bg-white/10 rounded-sm p-1.5">
          {/* Invoice Illustration - Adjusted spacing and sizes */}
          <div className="h-full w-full flex flex-col">
            {/* Header section */}
            <div className="border-b border-white/20 pb-1 mb-1">
              <div className="h-1 w-6 bg-white/40 rounded-sm mb-1" />
              <div className="h-1 w-8 bg-white/20 rounded-sm" />
            </div>
            {/* Content section */}
            <div className="flex-1 flex flex-col justify-between py-1">
              {/* Line items */}
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-white/20 rounded-sm" />
                <div className="h-0.5 w-3/4 bg-white/20 rounded-sm" />
              </div>
              {/* Total amount */}
              <div className="h-1 w-1/2 bg-white/40 rounded-sm self-end" />
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'statement',
      label: 'Statement',
      icon: (
        <div className="w-12 h-14 bg-white/10 rounded-sm p-1.5">
          {/* Bank Statement Illustration */}
          <div className="h-full w-full flex flex-col">
            <div className="border-b border-white/20 pb-1 mb-1">
              <div className="h-1.5 w-full bg-white/40 rounded-sm" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-1 w-1/3 bg-white/20 rounded-sm" />
                <div className="h-1 w-1/4 bg-white/40 rounded-sm" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-1 w-1/2 bg-white/20 rounded-sm" />
                <div className="h-1 w-1/4 bg-white/40 rounded-sm" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-1 w-2/5 bg-white/20 rounded-sm" />
                <div className="h-1 w-1/4 bg-white/40 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'review',
      label: 'Review',
      icon: (
        <div className="w-12 h-14 bg-white/10 rounded-sm p-1.5">
          {/* Review Illustration */}
          <div className="h-full w-full flex flex-col">
            <div className="flex items-center space-x-1 mb-1.5">
              <div className="h-3 w-3 rounded-full bg-white/20" />
              <div className="h-1.5 w-6 bg-white/40 rounded-sm" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="h-2 w-2 bg-white/40 rounded-sm mr-0.5" />
                ))}
              </div>
              <div className="h-1 w-full bg-white/20 rounded-sm" />
              <div className="h-1 w-3/4 bg-white/20 rounded-sm" />
              <div className="h-1 w-1/2 bg-white/20 rounded-sm" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentOutput = selectedTemplate ? documentOutputs[selectedTemplate] : null;

  const handleTemplateClick = async (type: DocumentType) => {
    setSelectedTemplate(type);
    setShowJson(false);
    setProcessingState('dropping');
    await new Promise(r => setTimeout(r, 1000));
    setProcessingState('processing');
    await new Promise(r => setTimeout(r, 1500));
    setProcessingState('complete');
    
    setTimeout(() => {
      setShowJson(true);
    }, 300);
    
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

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
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Extract data from documents</h3>
      </div>

      {/* Template Selection */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {templates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleTemplateClick(template.type)}
            className={clsx(
              "flex flex-col items-center p-3 rounded-lg bg-white/10 transition-all hover:bg-white/20",
              selectedTemplate === template.type && "ring-2 ring-white/40"
            )}
          >
            {template.icon}
            <span className="text-sm text-white mt-2">{template.label}</span>
          </button>
        ))}
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
            {/* Document Thumbnail */}
            <div className="flex items-center px-3 w-full">
              <div 
                className={clsx(
                  "w-10 h-14 bg-white/10 rounded flex items-center justify-center mr-3",
                  processingState === 'dropping' && "scale-90 opacity-50",
                  processingState === 'processing' && "animate-pulse"
                )}
              >
                {templates.find(t => t.type === selectedTemplate)?.icon || templates[0].icon}
              </div>

              {/* Status Text */}
              <div className="flex-1">
                <div className="text-sm text-white/70">
                  {processingState === 'idle' && "Select a document type"}
                  {processingState === 'dropping' && currentOutput?.statusText}
                  {processingState === 'processing' && (
                    <div className="flex items-center space-x-2">
                      <span>Extracting data</span>
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
                    </div>
                  )}
                  {processingState === 'complete' && "Document processed"}
                </div>
                <div className="text-xs text-white/50 mt-0.5">
                  {currentOutput?.fileName || "No file selected"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JSON Output */}
        {showJson && currentOutput && processingState === 'complete' && (
          <div className="flex-1">
            <div className="bg-white/10 rounded-lg p-3 h-[180px] overflow-hidden">
              <pre className="text-xs text-white/90 h-full overflow-y-auto overflow-x-hidden">
                {JSON.stringify(currentOutput.jsonOutput, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtractorScreen; 