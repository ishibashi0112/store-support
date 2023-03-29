import { z } from "zod";

export const imageUploadSchema = z.custom<FormData>();

export const addMenuFormSchema = z.object({
  name: z
    .string()
    .min(1, "必ず入力してください。")
    .max(20, "20文字以内で入力してください。"),
  price: z
    .number({ invalid_type_error: "半角数字を入力してください" })
    .positive("1以上を入力してください"),

  description: z.string(),
  image: z.custom<File>().nullable(),
  menuCategoryId: z.string().nullable(),
});

export const postMenuRequestBodySchema = addMenuFormSchema
  .omit({ image: true })
  .merge(z.object({ imagePath: z.string().nullable() }));

export const putMenuRequestBodySchema = addMenuFormSchema
  .omit({ image: true })
  .merge(z.object({ imagePath: z.string().nullable(), id: z.string() }));

export const deleteMenuRequestBodySchema = z.object({ id: z.string() });

export const categoryFormSchema = z.object({
  name: z.string().min(1, "必ず入力してください。"),
});

const categoryInputSchema = z.array(
  z.object({
    name: z.string().min(1, "必ず入力してください。"),
  })
);

export const addCategoryschema = z.object({
  inputs: categoryInputSchema,
});
export const postCategoryRequestBodySchema = categoryInputSchema;

export const putCategoryRequestBodySchema = categoryFormSchema.merge(
  z.object({ id: z.string() })
);
export const deleteCategoryRequestBodySchema = z.object({
  categoryId: z.string(),
});

export const sendMailFormSchema = z.object({
  email: z.string().email("emailの形式で入力してください。"),
});

export type AddCategoryFormValues = z.infer<typeof addCategoryschema>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type AddMenuFormValues = z.infer<typeof addMenuFormSchema>;
