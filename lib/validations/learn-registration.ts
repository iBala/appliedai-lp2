import * as z from "zod";

export const learnRegistrationSchema = z.object({
  programType: z.enum(['study-group', 'bootcamp']),
  programSlug: z.string().min(1),
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  whatsappNumber: z
    .string()
    .min(6, 'Enter a valid phone number')
    .regex(/^\+?[0-9\s-]+$/, 'Only numbers, spaces, dashes, and optional + allowed'),
});

export type LearnRegistrationValues = z.infer<typeof learnRegistrationSchema>;
