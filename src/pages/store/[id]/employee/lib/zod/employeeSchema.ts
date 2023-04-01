import { z } from "zod";

export const sendInviteMailFormSchema = z.object({
  email: z.string().email("emailの形式が正しくありません。"),
});

export type SendInviteMailFormValues = z.infer<typeof sendInviteMailFormSchema>;
