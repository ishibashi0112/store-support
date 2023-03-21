import { Button, Group, Overlay, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { FC, useState } from "react";

import { useCategories } from "@/lib/hook/useCategories";

import { MenuCategory } from "../type/type";
import { AddCategoryView } from "./AddCategoryView";
import { DeleteCategoryView } from "./DeleteCategoryView";
import { MenuCategoryEditCard } from "./MenuCategoryEditCard";

export type DeleteStateType = {
  deleteView: boolean;
  category: MenuCategory | null;
};

export type EditOverlayStateType = {
  visible: boolean;
  onClick: (() => void) | undefined;
};

export const ModalBody: FC = () => {
  const { categories } = useCategories();
  const [addView, setAddView] = useState(false);
  const [deleteState, setDeleteState] = useState<DeleteStateType>({
    deleteView: false,
    category: null,
  });

  const [editOverlayState, setEditOverlayState] =
    useState<EditOverlayStateType>({
      visible: false,
      onClick: undefined,
    });

  if (!categories) {
    return <></>;
  }

  if (addView) {
    return <AddCategoryView setAddView={setAddView} />;
  }

  if (deleteState.deleteView) {
    return (
      <DeleteCategoryView
        deleteState={deleteState}
        setDeleteState={setDeleteState}
      />
    );
  }

  return (
    <div>
      <Stack spacing="xs">
        {categories.map((category) => (
          <MenuCategoryEditCard
            key={category.id}
            category={category}
            setOverlayState={setEditOverlayState}
            setDeleteState={setDeleteState}
          />
        ))}

        <Group position="right">
          <Button
            variant="subtle"
            size="xs"
            leftIcon={<IconPlus size={18} />}
            onClick={() => setAddView(true)}
          >
            作成
          </Button>
        </Group>
      </Stack>

      {editOverlayState.visible && (
        <Overlay opacity={0.1} onClick={editOverlayState.onClick} />
      )}
    </div>
  );
};
