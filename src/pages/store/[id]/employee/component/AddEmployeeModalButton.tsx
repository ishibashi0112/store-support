import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";

export const AddEmployeeModalButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Button size="xs" onClick={open}>
        追加
      </Button>

      <Modal opened={opened} onClose={close} title="Authentication">
        <form>
          <TextInput label="" />
        </form>
      </Modal>
    </div>
  );
};
