import { Button, Group, Menu as MantineMenu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import React, { FC } from "react";

import { Menu } from "../type/type";

type Props = {
  menu: Menu;
};

export const EditMenu: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MantineMenu.Item
        color="red"
        icon={<IconTrash size={16} />}
        onClick={open}
      >
        削除
      </MantineMenu.Item>

      <Modal title="メニュー編集" opened={opened} onClose={close} zIndex={9999}>
        <Group position="right">
          <Button variant="default">戻る</Button>

          <Button color="red">削除</Button>
        </Group>
      </Modal>
    </>
  );
};
