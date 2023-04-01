import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { FC } from "react";

import { useSendInviteEmailMutation } from "../lib/hook/useSendInviteEmailMutation";
import { sendInviteMailFormSchema } from "../lib/zod/employeeSchema";

export const SendMailForm: FC = () => {
  const { trigger, isMutating } = useSendInviteEmailMutation();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(sendInviteMailFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const result = confirm("招待メールを送信してもよろしいですか？");
    if (!result) return;

    trigger(values);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xl">
        <TextInput
          label="送信先"
          placeholder="email address"
          {...form.getInputProps("email")}
        />
        <Button type="submit" loading={isMutating}>
          送信
        </Button>
      </Stack>
    </form>
  );
};
