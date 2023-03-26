import { Button, Group, Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { useDeleteCategoryMutation } from "@/lib/hook/useDeleteCategoryMutation";

import { DeleteStateType } from "./ModalBody";

type Props = {
  deleteState: DeleteStateType;
  setDeleteState: React.Dispatch<React.SetStateAction<DeleteStateType>>;
};

export const DeleteCategoryView: FC<Props> = (props) => {
  const { trigger, isMutating } = useDeleteCategoryMutation();

  const handleDelete = () => {
    if (!props.deleteState.category) return;

    const categoryId = props.deleteState.category.id;
    trigger(
      { categoryId },
      {
        onSuccess: () => {
          props.setDeleteState({
            deleteView: false,
            category: null,
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <div>
      <Text fz="sm">
        <Text
          span
          underline
          fw="bold"
        >{`カテゴリー: ${props.deleteState.category?.name}`}</Text>{" "}
        を削除しますか？
        <br />
        <Text fz="xs" span color="dimmed">
          ※このカテゴリーのメニューは、ノーカテゴリーになります。
        </Text>
      </Text>
      <Space h="2rem" />

      <Group position="right">
        <Button
          variant="default"
          size="xs"
          disabled={isMutating}
          onClick={() =>
            props.setDeleteState((prev) => ({ ...prev, deleteView: false }))
          }
        >
          戻る
        </Button>
        <Button
          className="min-w-[3.25rem]"
          size="xs"
          color="red"
          loading={isMutating}
          loaderPosition="center"
          onClick={handleDelete}
        >
          削除
        </Button>
      </Group>
    </div>
  );
};
