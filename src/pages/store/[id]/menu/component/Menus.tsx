import { Alert, SimpleGrid, Text } from "@mantine/core";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { useMeuns } from "@/lib/hook/useMenus";
import { state } from "@/lib/store/state";

import { Menu } from "./Menu";

type Props = {
  categoryId: string;
};

export const Menus: FC<Props> = (props) => {
  const { menus } = useMeuns();
  const { menuDisplay } = useSnapshot(state);

  const filteredMenus = menus
    ? menus.filter((menu) => menu.menuCategoryId === props.categoryId)
    : [];

  if (!filteredMenus.length) {
    return (
      <Alert color="gray">
        <Text fz="xs" color="dark">
          このカテゴリーのメニューはありません。
        </Text>
      </Alert>
    );
  }

  return (
    <SimpleGrid cols={menuDisplay === "list" ? 2 : 4}>
      {filteredMenus.map((menu) => (
        <Menu key={menu.id} menu={menu} display={menuDisplay} />
      ))}
    </SimpleGrid>
  );
};
