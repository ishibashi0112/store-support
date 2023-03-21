import { Alert, Divider, SimpleGrid, Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { useCategories } from "@/lib/hook/useCategories";
import { useMeuns } from "@/lib/hook/useMenus";

import { MenuCard } from "./MenuCard";

export const Menus: FC = () => {
  const { menus } = useMeuns();
  const { categories } = useCategories();

  const filterMenu = (categoryId: string) => {
    if (!menus) return [];

    return menus.filter((menu) => menu.menuCategoryId === categoryId);
  };

  if (!menus || !categories) {
    return <></>;
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <Text>{category.name}</Text>
          <Divider variant="dashed" mb="sm" />

          {filterMenu(category.id).length ? (
            <SimpleGrid cols={4}>
              {filterMenu(category.id).map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
              ))}
            </SimpleGrid>
          ) : (
            <Alert>このカテゴリーのメニューはありません。</Alert>
          )}

          <Space h="1rem" />
        </div>
      ))}
    </>
  );
};
