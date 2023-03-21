import { Group, Text } from "@mantine/core";
import React, { FC } from "react";

import { MenuCategoryModalFormButton } from "./MenuCategoryModalFormButton";
import { MenuFormModal } from "./MenuFormModal";

export const MenuHeader: FC = () => {
  return (
    <div>
      <Group position="apart">
        <Text fw="bold">メニュー</Text>
        <Group>
          <MenuFormModal />

          <MenuCategoryModalFormButton />
        </Group>
      </Group>
    </div>
  );
};
