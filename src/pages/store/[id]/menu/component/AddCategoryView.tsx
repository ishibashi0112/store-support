import {
  Button,
  Card,
  CloseButton,
  Group,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import React, { FC } from "react";
import { z } from "zod";

const scheme = z.object({
  inputs: z.array(
    z.object({
      name: z.string().min(1, "必ず入力してください。"),
    })
  ),
});

type Props = {
  setAddView: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddCategoryView: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      inputs: [{ name: "" }],
    },
    validate: zodResolver(scheme),
  });

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xs">
          {form.values.inputs.map((value, index) => (
            <Card key={index} padding="xs" withBorder>
              <Group position="apart">
                <TextInput
                  className="flex-1"
                  placeholder="カテゴリーを入力してください"
                  size="xs"
                  variant="filled"
                  {...form.getInputProps(`inputs.${index}.name`)}
                />

                <CloseButton
                  onClick={
                    form.values.inputs.length > 1
                      ? () => form.removeListItem("inputs", index)
                      : undefined
                  }
                />
              </Group>
            </Card>
          ))}
        </Stack>

        <Space h={3} />
        <Group position="right">
          <Button
            variant="subtle"
            size="xs"
            leftIcon={<IconPlus size={18} />}
            onClick={() => form.insertListItem("inputs", { name: "", id: "" })}
          >
            追加
          </Button>
        </Group>

        <Space h="2rem" />

        <Group position="right">
          <Button
            variant="default"
            size="xs"
            onClick={() => props.setAddView(false)}
          >
            戻る
          </Button>
          <Button size="xs" type="submit">
            作成
          </Button>
        </Group>
      </form>
    </div>
  );
};
