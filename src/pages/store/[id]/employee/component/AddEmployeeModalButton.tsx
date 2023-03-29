import { Button, Modal, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";

import { SendMailForm } from "./SendMailForm";

export const AddEmployeeModalButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button size="xs" onClick={open}>
        追加
      </Button>

      <Modal opened={opened} onClose={close} title="Add User">
        <Text fz="xs" fw="bold" underline>
          ※ユーザーの追加には、招待メールのリンクよりユーザー登録が必要です。
        </Text>

        <Space h="0.75rem" />

        <SendMailForm />
      </Modal>
    </div>
  );
};
