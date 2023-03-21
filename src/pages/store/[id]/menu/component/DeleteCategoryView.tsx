import { Button, Group, Space, Text } from "@mantine/core";
import React, { FC } from "react";

import { DeleteStateType } from "./ModalBody";

type Props = {
  deleteState: DeleteStateType;
  setDeleteState: React.Dispatch<React.SetStateAction<DeleteStateType>>;
};

export const DeleteCategoryView: FC<Props> = (props) => {
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
        属しているメニューは、ノーカテゴリーになります。
      </Text>
      <Space h="2rem" />

      <Group position="right">
        <Button
          variant="default"
          size="xs"
          onClick={() =>
            props.setDeleteState((prev) => ({ ...prev, deleteView: false }))
          }
        >
          戻る
        </Button>
        <Button size="xs" color="red">
          削除
        </Button>
      </Group>
    </div>
  );
};
