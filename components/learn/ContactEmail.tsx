'use client';

import { useState } from 'react';

interface ContactEmailProps {
  email: string;
}

export default function ContactEmail({ email }: ContactEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm text-gray-800">
        {email}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/80"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
