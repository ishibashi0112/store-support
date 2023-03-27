import { Divider, SimpleGrid, Space, Text } from "@mantine/core";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { useMeuns } from "@/lib/hook/useMenus";
import { state } from "@/lib/store/state";

import { Menu } from "./Menu";

export const NoCategoryMenus: FC = () => {
  const { menus } = useMeuns();
  const { menuDisplay } = useSnapshot(state);

  const noCategoryMenus = menus
    ? menus.filter((menu) => !menu.menuCategoryId)
    : [];

  if (!noCategoryMenus.length) {
    return <></>;
  }

  return (
    <div>
      <Text fz="sm" fw="bold">
        No Category
      </Text>
      <Divider variant="dashed" mb="sm" />

      <SimpleGrid cols={menuDisplay === "list" ? 2 : 4}>
        {noCategoryMenus.map((menu) => (
          <Menu key={menu.id} menu={menu} display={menuDisplay} />
        ))}
      </SimpleGrid>

      <Space h="3rem" />
    </div>
  );
};
