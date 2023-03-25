import { ActionIcon, Menu as MantineMenu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { FC, useState } from "react";

import { Menu as MenuType } from "../type/type";
import { EditMenuForm } from "./EditMenuForm";
import { MenuForm } from "./MenuForm";

type Props = {
  menu: MenuType;
};

export const OperationMenu: FC<Props> = (props) => {
  const [typeText, setTypeText] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleModalOpen = (text: "edit" | "delete") => {
    setTypeText(text);
    open();
  };

  return (
    <div>
      <MantineMenu
        position="bottom-end"
        withArrow
        closeOnItemClick={false}
        closeOnClickOutside={!opened}
      >
        <MantineMenu.Target>
          <ActionIcon size="sm" radius="xl">
            <IconDotsVertical size={18} />
          </ActionIcon>
        </MantineMenu.Target>
        <MantineMenu.Dropdown>
          <MantineMenu.Item
            icon={<IconEdit size={16} />}
            onClick={() => handleModalOpen("edit")}
          >
            編集
          </MantineMenu.Item>
          <MantineMenu.Item
            color="red"
            icon={<IconTrash size={16} />}
            onClick={() => handleModalOpen("delete")}
          >
            削除
          </MantineMenu.Item>
        </MantineMenu.Dropdown>
      </MantineMenu>

      <Modal title="メニュー編集" opened={opened} onClose={close} zIndex={9999}>
        {typeText === "edit" ? <MenuForm {...props} /> : null}
        {typeText === "delete" ? <EditMenuForm {...props} /> : null}
      </Modal>
    </div>
  );
};
