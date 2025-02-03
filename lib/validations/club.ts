import * as z from "zod"

export const clubFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  reason: z.string().min(50, {
    message: "Please tell us more about yourself (minimum 50 characters).",
  }),
})

export type ClubFormValues = z.infer<typeof clubFormSchema> 