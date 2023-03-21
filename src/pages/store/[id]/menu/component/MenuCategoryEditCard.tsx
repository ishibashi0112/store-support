import {
  ActionIcon,
  Button,
  Card,
  Collapse,
  Group,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowBackUp,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import React, { FC, useRef, useState } from "react";
import { z } from "zod";

import { MenuCategory } from "../type/type";
import { DeleteStateType, EditOverlayStateType } from "./ModalBody";

const schema = z.object({
  name: z.string().min(1, "必ず入力してください。"),
});

type Props = {
  category: MenuCategory;
  setDeleteState: React.Dispatch<DeleteStateType>;
  setOverlayState: React.Dispatch<React.SetStateAction<EditOverlayStateType>>;
};

export const MenuCategoryEditCard: FC<Props> = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    initialValues: {
      name: props.category.name,
    },
    validate: zodResolver(schema),
  });

  const handleDeleteSwitch = () => {
    props.setDeleteState({ deleteView: true, category: props.category });
  };

  const editReset = () => {
    setEditMode(false);
    form.reset();
  };

  const handleEditReset = (): void => {
    props.setOverlayState({ visible: false, onClick: undefined });
    editReset();
  };

  const handleEditSwitch = () => {
    props.setOverlayState({ visible: true, onClick: handleEditReset });
    setEditMode(true);
    ref.current?.focus();
  };

  const handleEdit = (values: typeof form.values) => {};

  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Card
      sx={{
        overflow: "visible",
        zIndex: editMode ? 201 : 1,
      }}
      padding="xs"
      shadow={editMode ? "sm" : ""}
      withBorder
    >
      <form onSubmit={form.onSubmit(handleEdit)}>
        <Group position="apart">
          <TextInput
            className="flex-1"
            ref={ref}
            placeholder="カテゴリーを入力してください"
            size="xs"
            variant={editMode ? "filled" : "unstyled"}
            readOnly={!editMode}
            {...form.getInputProps("name")}
          />

          <Group spacing="xs">
            {editMode ? (
              <>
                {form.isDirty() ? (
                  <Button type="submit" size="xs" compact>
                    更新
                  </Button>
                ) : null}

                <ActionIcon onClick={handleEditReset}>
                  <IconArrowBackUp size={16} />
                </ActionIcon>
              </>
            ) : (
              <>
                <ActionIcon onClick={toggle}>
                  {opened ? (
                    <IconChevronUp size={16} />
                  ) : (
                    <IconChevronDown size={16} />
                  )}
                </ActionIcon>
                <Tooltip label="編集">
                  <ActionIcon onClick={handleEditSwitch}>
                    <IconEdit size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="削除">
                  <ActionIcon color="red" onClick={handleDeleteSwitch}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              </>
            )}
          </Group>
        </Group>
      </form>

      <Collapse in={opened}>
        <Text>aaaaaaaaa</Text>
      </Collapse>
    </Card>
  );
};
