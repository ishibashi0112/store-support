import { Group, Text } from "@mantine/core";
import React, { FC } from "react";

import { AddMenuModalFormButton } from "./AddMenuModalFormButton";
import { MenuCategoryModalFormButton } from "./MenuCategoryModalFormButton";

export const MenuHeader: FC = () => {
  return (
    <div>
      <Group position="apart">
        <Text fw="bold">メニュー</Text>
        <Group>
          <AddMenuModalFormButton />

          <MenuCategoryModalFormButton />
        </Group>
      </Group>
    </div>
  );
};
