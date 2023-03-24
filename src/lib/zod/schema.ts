import { z } from "zod";

export const imageUploadSchema = z.custom<FormData>();

export const addMenuFormschema = z.object({
  name: z
    .string()
    .min(1, "必ず入力してください。")
    .max(20, "20文字以内で入力してください。"),
  price: z
    .number({ invalid_type_error: "半角数字を入力してください" })
    .positive("1以上を入力してください"),

  description: z.string(),
  image: z.custom<File>().nullable(),
  menuCategoryId: z.string().min(1, "必ず入力してください。"),
});

export const createMenuRequestBodySchema = addMenuFormschema
  .omit({ image: true })
  .merge(z.object({ imagePath: z.string() }));

export type AddMenuFormValues = z.infer<typeof addMenuFormschema>;
