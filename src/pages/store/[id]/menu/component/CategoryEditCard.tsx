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

import { useUpdateCategoryMutation } from "@/lib/hook/useUpdateCategoryMutation";
import { categoryFormSchema, CategoryFormValues } from "@/lib/zod/schema";

import { MenuCategory } from "../type/type";
import { DeleteStateType, EditOverlayStateType } from "./ModalBody";

type Props = {
  category: MenuCategory;
  setDeleteState: React.Dispatch<DeleteStateType>;
  setOverlayState: React.Dispatch<React.SetStateAction<EditOverlayStateType>>;
};

export const CategoryEditCard: FC<Props> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const { trigger, isMutating } = useUpdateCategoryMutation();

  const form = useForm<CategoryFormValues>({
    initialValues: {
      name: props.category.name,
    },
    validate: zodResolver(categoryFormSchema),
  });

  const handleDeleteSwitch = () => {
    props.setDeleteState({ deleteView: true, category: props.category });
  };

  const editReset = () => {
    setEditMode(false);
    form.setFieldValue("name", props.category.name);
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

  const handleEditSubmit = (values: typeof form.values) => {
    const data = { values, id: props.category.id };
    trigger(data, {
      onSuccess: () => {
        props.setOverlayState({ visible: false, onClick: undefined });
        setEditMode(false);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  };

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
      <form onSubmit={form.onSubmit(handleEditSubmit)}>
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
                  <Button
                    className="min-w-[3.25rem]"
                    type="submit"
                    size="xs"
                    compact
                    loading={isMutating}
                    loaderPosition="center"
                  >
                    {isMutating ? "" : "更新"}
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
