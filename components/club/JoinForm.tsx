'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { clubFormSchema, type ClubFormValues } from "@/lib/validations/club"
import { useState, useEffect } from "react"

const defaultTemplate = `## A bit about your experience
I am a ...

## What is that you'd like to use the community for?

## What project are you working on?
`

export default function JoinForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ClubFormValues>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      linkedInUrl: "",
      reason: defaultTemplate,
      gotcha: "",
      startTime: Date.now(),
    },
  })

  useEffect(() => {
    // Update start time on client side to ensure it captures when user actually sees the form
    form.setValue("startTime", Date.now());
  }, [form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: ClubFormValues) {
    try {
      setSubmitStatus('idle');
      const response = await fetch('/api/club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-3">Our club is invite only</h2>
              <p className="text-black text-lg">
                If you&apos;d like to join, please fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="mt-8 rounded-md bg-green-50 p-6">
                <p className="text-green-800 text-lg">
                  Thanks for your application! We&apos;ll review it and get back to you soon.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Your full name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-white text-black"
                            {...field}
                          />
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
                        <FormLabel className="text-black">Your email (optional)</FormLabel>
                        <FormDescription className="text-gray-900">
                          If provided, we&apos;ll send updates/newsletters to this email
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            className="bg-white text-black"
                            {...field}
                          />
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
                        <FormLabel className="text-black">WhatsApp Number</FormLabel>
                        <FormDescription className="text-gray-900">
                          This is the whatsapp number you&apos;ll use to join the club.
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            type="tel"
                            className="bg-white text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedInUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.linkedin.com/..."
                            type="url"
                            className="bg-white text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Why would you like to join?</FormLabel>
                        <FormDescription className="text-gray-900">
                          Tell us a bit about yourself. We look for people who are passionate about building agents and are willing to contribute to the community.
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            rows={8}
                            className="bg-white text-black whitespace-pre-wrap resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hidden Honeypot Field */}
                  <FormField
                    control={form.control}
                    name="gotcha"
                    render={({ field }) => (
                      <FormItem style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1, overflow: 'hidden' }} aria-hidden="true">
                        <FormLabel>Bot Field</FormLabel>
                        <FormControl>
                          <Input
                            tabIndex={-1}
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {submitStatus === 'error' && (
                    <div className="rounded-md bg-red-50 p-4">
                      <p className="text-red-800">
                        Sorry, there was an error submitting your application. Please try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 