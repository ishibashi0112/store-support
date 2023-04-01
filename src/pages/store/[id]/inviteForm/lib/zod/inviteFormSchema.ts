import { z } from "zod";

export const updateInviteUserFormSchema = z
  .object({
    password: z.string().min(6, "パスワードは6文字以上で設定してください。"),
    confirmPassword: z
      .string()
      .min(6, "パスワードは6文字以上で設定してください。"),
    firstName: z.string().min(1, "必ず入力してください。"),
    lastName: z.string().min(1, "必ず入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });

export const transformedInviteUserFormSchema =
  updateInviteUserFormSchema.transform((data) => ({
    ...data,
    name: data.firstName + data.lastName,
  }));

export type InviteUserFormValues = z.infer<
  typeof transformedInviteUserFormSchema
>;
