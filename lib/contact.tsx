import { z } from "zod";
import axios from "axios";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendFeedback(data: ContactFormData, baseUrl: string) {
  try {
    await axios.post(`${baseUrl}/api/feedback/send-feedback`, {
      ...data,
      type_message: "feedback",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
