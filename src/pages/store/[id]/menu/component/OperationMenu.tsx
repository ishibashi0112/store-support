import {
  ActionIcon,
  Button,
  Group,
  Menu as MantineMenu,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { FC, useState } from "react";

import { useDeleteMemuMutation } from "@/lib/hook/useDeleteMemuMutation";

import { Menu as MenuType } from "../type/type";
import { MenuForm } from "./MenuForm";

type Props = {
  menu: MenuType;
};

export const OperationMenu: FC<Props> = (props) => {
  const [isCloseableOnClickOutside, setIsCloseableOnClickOutside] =
    useState(true);
  const menuItemProps = { ...props, setIsCloseableOnClickOutside };

  return (
    <div>
      <MantineMenu
        position="bottom-end"
        withArrow
        closeOnItemClick={false}
        closeOnClickOutside={isCloseableOnClickOutside}
      >
        <MantineMenu.Target>
          <ActionIcon size="sm" radius="xl">
            <IconDotsVertical size={18} />
          </ActionIcon>
        </MantineMenu.Target>

        <MantineMenu.Dropdown>
          <EditMenu {...menuItemProps} />
          <DeleteMenu {...menuItemProps} />
        </MantineMenu.Dropdown>
      </MantineMenu>
    </div>
  );
};

type MenuItemProps = {
  menu: MenuType;
  setIsCloseableOnClickOutside: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMenu: FC<MenuItemProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleOpen = () => {
    props.setIsCloseableOnClickOutside(false);
    open();
  };

  const handleClose = () => {
    props.setIsCloseableOnClickOutside(true);
    close();
  };

  return (
    <>
      <MantineMenu.Item icon={<IconEdit size={16} />} onClick={handleOpen}>
        編集
      </MantineMenu.Item>

      <Modal
        title="メニュー編集"
        opened={opened}
        onClose={handleClose}
        zIndex={9999}
      >
        <MenuForm {...props} />
      </Modal>
    </>
  );
};

const DeleteMenu: FC<MenuItemProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { trigger, isMutating } = useDeleteMemuMutation();

  const handleOpen = () => {
    props.setIsCloseableOnClickOutside(false);
    open();
  };

  const handleClose = () => {
    props.setIsCloseableOnClickOutside(true);
    close();
  };

  const handleDelete = () => {
    const data = { id: props.menu.id, imagePath: props.menu.imagePath };

    trigger(data, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error: any) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <MantineMenu.Item
        color="red"
        icon={<IconTrash size={16} />}
        onClick={handleOpen}
      >
        削除
      </MantineMenu.Item>

      <Modal
        classNames={{ body: "border-4 border-solid border-red-400" }}
        opened={opened}
        onClose={handleClose}
        zIndex={9999}
        withCloseButton={false}
        closeOnClickOutside={!isMutating}
      >
        <Space h="1rem" />
        <Text>
          <Text span underline>
            {props.menu.name}
          </Text>
          を削除しますか？
        </Text>
        <Space h="2rem" />
        <Group position="right">
          <Button
            size="xs"
            variant="default"
            onClick={handleClose}
            disabled={isMutating}
          >
            戻る
          </Button>

          <Button
            className="min-w-[54px]"
            size="xs"
            color="red"
            loading={isMutating}
            loaderPosition="center"
            onClick={handleDelete}
          >
            {isMutating ? "" : "削除"}
          </Button>
        </Group>
      </Modal>
    </>
  );
};
