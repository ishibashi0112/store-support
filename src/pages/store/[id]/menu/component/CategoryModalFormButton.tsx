import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";

import { ModalBody } from "./ModalBody";

export const CategoryModalFormButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button size="xs" onClick={open}>
        カテゴリー編集
      </Button>

      <Modal opened={opened} onClose={close} title="カテゴリー編集">
        <ModalBody />
      </Modal>
    </div>
  );
};
