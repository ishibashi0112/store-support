import {
  Button,
  Card,
  Overlay,
  PasswordInput,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { FC, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabase/supabase";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const scheme = z
  .object({
    email: z
      .string()
      .min(1, "必ず入力してください。")
      .email("Emailの形式ではありません。"),
    password: z.string().min(6, "パスワードは6文字以上で設定してください。"),
    confirmPassword: z
      .string()
      .min(6, "パスワードは6文字以上で設定してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });

export const SignUpForm: FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(scheme),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      const parsed = scheme.parse(values);

      const { data, error } = await supabase.auth.signUp({
        email: parsed.email,
        password: parsed.password,
        options: {
          emailRedirectTo: "http://localhost:3000/auth/signUpVerifiedEmail",
        },
      });

      if (error) {
        throw error;
      }
      if (!data.user) {
        throw new Error("サインアップ時にuser情報が取得できませんでした");
      }

      props.setActive((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Card withBorder>
        <Stack spacing="xs">
          <TextInput
            label="Email"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm password"
            withAsterisk
            {...form.getInputProps("confirmPassword")}
          />

          <Space h={20} />
        </Stack>
      </Card>

      <Space h="2rem" />

      <Button
        fullWidth
        type="submit"
        loading={isLoading}
        loaderPosition="center"
      >
        {isLoading ? "" : "comfirm"}
      </Button>

      {isLoading && <Overlay opacity={0} />}
    </form>
  );
};
