import { Divider, Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { useCategories } from "@/lib/hook/useCategories";

import { Menus } from "./Menus";

export const CategoriesWithMenus: FC = () => {
  const { categories } = useCategories();

  if (!categories) {
    return <></>;
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <Text fw="bold">{category.name}</Text>
          <Divider variant="dashed" mb="sm" />

          <Menus categoryId={category.id} />

          <Space h="3rem" />
        </div>
      ))}
    </>
  );
};
