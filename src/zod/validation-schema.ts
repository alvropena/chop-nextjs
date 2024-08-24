import { z } from "zod";

export const promptSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt cannot be empty" }),
});

export type PromptFormData = z.infer<typeof promptSchema>;
const genderValues = ["male", "female", "other"] as const;

const normalizePhone = (input: unknown) => {
  if (typeof input === "string") {
    // Normalizar el número de teléfono: eliminar espacios, guiones, paréntesis, etc.
    return input.replace(/[\s-()]/g, "");
  }
  return input;
};

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  username: z.string().min(1, { message: "Username cannot be empty" }),
  bio: z.string().optional(),
  location: z.string().optional(),
  birthday: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
    },
    z
      .date()
      .refine(
        (date) => {
          return date <= new Date();
        },
        {
          message: "Birthday must be a valid date in the past",
        }
      )
      .optional()
  ),
  phone: z
    .preprocess(
      normalizePhone,
      z.string().regex(/^\d{10}$/, {
        message: "Invalid phone number format",
      })
    )
    .optional(),
  gender: z
    .enum(genderValues, { message: "Gender must be male, female, or other" })
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
