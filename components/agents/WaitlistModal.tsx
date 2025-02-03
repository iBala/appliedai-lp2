'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentType: string;
}

const WaitlistModal = ({ isOpen, onClose, agentType }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, agentType }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSuccess(true);
      setEmail(''); // Clear the form on success
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Waitlist submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black dark:text-white">
            Join the waitlist for {agentType}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Be the first to know when we launch. We&apos;ll notify you as soon as {agentType} is ready.
          </DialogDescription>
        </DialogHeader>
        {!success ? (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-gray-900 dark:text-white placeholder:text-gray-500"
                required
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#0A40C2] hover:bg-[#0A40C2]/90 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </Button>
          </form>
        ) : (
          <div className="py-6">
            <p className="text-center text-green-600">
              Thanks for joining! We&apos;ll keep you updated.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal; 