import { z } from "zod";

// Primitive Schemas:

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(100, { message: "Password must be 60 characters maximum" });

export const emailSchema = z
  .string()
  .email("Please enter a valid email address");

// Composite Schemas:
export const passwordResetSchema = z
  .object({
    password: passwordSchema,
    token: z.string(),
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const changePasswordSchema = z.object({
  password: passwordSchema,
  token: z.string(),
});

export const registrationSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const magicLinkSchema = z.object({
  email: emailSchema,
});

export const forgotPasswordSchema = magicLinkSchema;

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
