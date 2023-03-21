import { Container, Space, Text } from "@mantine/core";
import { NextPage } from "next";
import React from "react";

const signUpVerifiedEmail: NextPage = () => {
  return (
    <div>
      <Container size="xs">
        <Space h={100} />

        <Text fw="bold" align="center">
          ✅メール認証が完了しました
        </Text>

        <Space h={20} />
      </Container>
    </div>
  );
};

export default signUpVerifiedEmail;
