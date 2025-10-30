'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { learnRegistrationSchema, type LearnRegistrationValues } from '@/lib/validations/learn-registration';

interface RegisterInterestFormProps {
  programSlug: string;
  programType: 'study-group' | 'bootcamp';
  programName: string;
  cohortLabel?: string;
  layout?: 'card' | 'plain';
}

export default function RegisterInterestForm({
  programSlug,
  programType,
  programName,
  cohortLabel,
  layout = 'card',
}: RegisterInterestFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LearnRegistrationValues>({
    resolver: zodResolver(learnRegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      whatsappNumber: '',
      programSlug,
      programType,
    },
  });

  const onSubmit = async (values: LearnRegistrationValues) => {
    setSubmitting(true);
    setSuccess(false);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/learn/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error || 'Failed to register interest');
      }

      setSuccess(true);
      form.reset({
        fullName: '',
        email: '',
        whatsappNumber: '',
        programSlug,
        programType,
      });
    } catch (error) {
      console.error('Register interest error:', error);
      setErrorMessage('We could not submit your details. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    const successMessage = (
      <>
        <p className="font-semibold text-green-800">Thanks for registering your interest!</p>
        <p className="mt-2 text-sm">
          We&apos;ll reach out over email and WhatsApp with the payment link and onboarding details for{' '}
          <span className="font-medium">{programName}</span> {cohortLabel ? `(${cohortLabel})` : ''} within the next 24
          hours.
        </p>
      </>
    );

    if (layout === 'card') {
      return (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-700">
          {successMessage}
        </div>
      );
    }

    return (
      <div className="space-y-2 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
        {successMessage}
      </div>
    );
  }

  const formFields = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {errorMessage && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
        )}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp-enabled phone number</FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input type="hidden" value={programSlug} {...form.register('programSlug')} />
        <input type="hidden" value={programType} {...form.register('programType')} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Notify me with next steps'}
        </Button>
      </form>
    </Form>
  );

  if (layout === 'card') {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-black">Register your interest</h2>
        <p className="mt-2 text-sm text-gray-600">
          Share your details and we&apos;ll send you the payment link along with onboarding instructions on email and
          WhatsApp.
        </p>
        <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">{formFields}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {formFields}
    </div>
  );
}
