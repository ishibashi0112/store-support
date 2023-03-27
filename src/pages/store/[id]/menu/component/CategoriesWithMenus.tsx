import { Divider, Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { useCategories } from "@/lib/hook/useCategories";

import { Menus } from "./Menus";
import { NoCategoryMenus } from "./noCategoryMenus";

export const CategoriesWithMenus: FC = () => {
  const { categories } = useCategories();

  if (!categories) {
    return <></>;
  }

  return (
    <>
      <NoCategoryMenus />

      {categories.map((category) => (
        <div key={category.id}>
          <Text fz="sm" fw="bold">
            {category.name}
          </Text>
          <Divider variant="dashed" mb="sm" />

          <Menus categoryId={category.id} />

          <Space h="3rem" />
        </div>
      ))}
    </>
  );
};
