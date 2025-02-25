import * as z from "zod"

export const clubFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email().optional(),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  linkedInUrl: z.string().url().startsWith("https://www.linkedin.com/"),
  reason: z.string().min(1, "Please tell us why you'd like to join"),
})

export type ClubFormValues = z.infer<typeof clubFormSchema> 