import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";

import { MenuForm } from "./MenuForm";

export const AddMenuModalFormButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button size="xs" onClick={open}>
        メニュー追加
      </Button>

      <Modal
        classNames={{ body: "min-h-[300px]" }}
        opened={opened}
        onClose={close}
        title="メニュー登録"
      >
        <MenuForm />
      </Modal>
    </div>
  );
};
