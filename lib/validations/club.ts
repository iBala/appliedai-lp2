import * as z from "zod"

export const clubFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  linkedInUrl: z.string().url().startsWith("https://www.linkedin.com/"),
  reason: z.string().min(1, "Please tell us why you'd like to join"),
  // Anti-bot fields
  gotcha: z.string().optional(),
  startTime: z.number().optional(), 
})

export type ClubFormValues = z.infer<typeof clubFormSchema> 