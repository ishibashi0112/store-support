import { Anchor, Container, Group, Space, Stepper, Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";

import { SignUpForm } from "@/pages-component/auth/SignUpForm";
import { UserForm } from "@/pages-component/auth/UserForm";
import { VerifyEmail } from "@/pages-component/auth/VerifyEmail";
import { useListenVerifyEmail } from "@/pages-layout/auth/hook/useListenVerifyEmail";

import { NextPageWithLayout } from "../_app.page";

const SignUp: NextPageWithLayout = () => {
  const [active, setActive] = useState(0);

  useListenVerifyEmail(active, setActive);

  return (
    <div>
      <Container size="xs">
        <Space h={100} />

        <Text fw="bold" align="center">
          新規登録
        </Text>

        <Space h={20} />

        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="アカウント作成">
            <SignUpForm setActive={setActive} />
          </Stepper.Step>
          <Stepper.Step label="メール認証">
            <VerifyEmail />
          </Stepper.Step>
          <Stepper.Step label="ユーザー&ストア登録">
            <UserForm setActive={setActive} />
          </Stepper.Step>

          <Stepper.Completed>
            完了しました。
            <Anchor component={Link} href="/store/management">
              管理画面へ
            </Anchor>
          </Stepper.Completed>
        </Stepper>

        <Space h="0.5rem" />

        {!active ? (
          <Group position="right">
            <Anchor component={Link} href="/auth/signIn">
              ログインページへ
            </Anchor>
          </Group>
        ) : null}
      </Container>
    </div>
  );
};

// SignUp.getLayout = AuthLayout;

export default SignUp;
