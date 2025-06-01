"use server";

import { z } from "zod";
import { SMTPClient, Message } from "emailjs";

const emailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  content: z.string().min(1),
});

export async function sendEmail(
  formData: z.infer<typeof emailSchema>
): Promise<{ ok: boolean; message: string }> {
  const { name, email, content } = emailSchema.parse(formData);

  const client = new SMTPClient({
    user: process.env.EMAILJS_USER_ID,
    password: process.env.EMAILJS_PASSWORD,
    host: "smtp.gmail.com",
    ssl: true,
  });

  const message = new Message({
    from: email,
    to: "barhoumi.meriem1@gmail.com",
    subject: "New message from " + name,
    text: content,
  });
  return new Promise((resolve) => {
    client.send(message, (err) => {
      if (err) {
        resolve({ ok: false, message: "Email not sent" });
      } else {
        resolve({ ok: true, message: "Email sent successfully" });
      }
    });
  });
}
