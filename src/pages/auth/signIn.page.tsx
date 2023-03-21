import {
  Anchor,
  Button,
  Card,
  Container,
  Group,
  Overlay,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { signIn } from "@/lib/supabase/auth";
import { getStoreIdByCurrentUser } from "@/lib/supabase/database";

const scheme = z.object({
  email: z
    .string()
    .min(1, "必ず入力してください。")
    .email("Emailの形式ではありません。"),
  password: z.string().min(1, "必ず入力してください。"),
});

const SignIn: NextPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(scheme),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);

      const { user } = await signIn(values.email, values.password);

      const storeId = await getStoreIdByCurrentUser(user.id);

      await push(`/store/${storeId}/management`);
    } catch (error: any) {
      console.error(error.message);
      if (error.message === "Invalid login credentials") {
        setError("emailかパスワードが異なります");
        return;
      }
      if (error) {
        setError("何らかのエラーが発生しました。");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [form.values]);

  return (
    <div>
      <Container size="xs">
        <Space h={100} />

        <Text fw="bold" align="center">
          ログイン
        </Text>

        <Space h={20} />

        <Card withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
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

              <Space h={20} />

              {error ? (
                <Text align="center" color="red">
                  {error}
                </Text>
              ) : null}

              <Button type="submit" loading={isLoading} loaderPosition="center">
                {isLoading ? "" : "ログイン"}
              </Button>
            </Stack>
          </form>
        </Card>
        <Space h="0.5rem" />

        <Group position="right">
          <Anchor component={Link} href="/auth/signUp">
            新規登録ページへ
          </Anchor>
        </Group>
      </Container>

      {isLoading && <Overlay opacity={0} />}
    </div>
  );
};

export default SignIn;
