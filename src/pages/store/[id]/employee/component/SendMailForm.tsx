import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { FC } from "react";

import { sendMailFormSchema } from "@/lib/zod/schema";

export const SendMailForm: FC = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(sendMailFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const result = confirm("招待メールを送信してもよろしいですか？");
    if (!result) return;
    console.log(values);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xl">
        <TextInput
          label="送信先"
          placeholder="email address"
          {...form.getInputProps("email")}
        />
        <Button type="submit">送信</Button>
      </Stack>
    </form>
  );
};
