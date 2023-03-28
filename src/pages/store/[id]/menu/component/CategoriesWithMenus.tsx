import { Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { useCategories } from "@/lib/hook/useCategories";

import { Menus } from "./Menus";
import { NoCategoryMenus } from "./NoCategoryMenus";

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

          <Space h="0.5rem" />

          <Menus categoryId={category.id} />

          <Space h="3rem" />
        </div>
      ))}
    </>
  );
};
