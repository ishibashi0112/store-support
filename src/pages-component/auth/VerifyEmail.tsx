import { Stack, Text } from "@mantine/core";
import React, { FC } from "react";

export const VerifyEmail: FC = () => {
  return (
    <Stack spacing={0}>
      <Text>入力されたメールアドレスに認証用のメールを送信しました。</Text>
      <Text span fw="bold">
        メールの認証リンクをクリックして完了画面が表示される
      </Text>
      と登録が完了いたします。
      <Text>登録後、自動的にストアページにリダイレクトされます。</Text>
      <Text>※メール送信に、時間がかかる場合がございます。</Text>
    </Stack>
  );
};
