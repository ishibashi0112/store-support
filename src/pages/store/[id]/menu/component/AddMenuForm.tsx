import {
  Button,
  FileInput,
  Group,
  Image,
  NumberInput,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyYen, IconPhoto } from "@tabler/icons-react";
import React, { FC, memo } from "react";

import { useCategories } from "@/lib/hook/useCategories";
import { useCreateMemuMutation } from "@/lib/hook/useCreateMemuMutation";
import { calculatePriceWithTax } from "@/lib/utils/function";
import { addMenuFormschema, AddMenuFormValues } from "@/lib/zod/schema";

export const AddMenuForm: FC = () => {
  const { categories } = useCategories();
  const { trigger, isMutating } = useCreateMemuMutation();

  const selectData = categories
    ? categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const form = useForm<AddMenuFormValues>({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: null,
      menuCategoryId: "",
    },
    validate: zodResolver(addMenuFormschema),
  });

  const handleSubmit = (values: typeof form.values): void => {
    trigger(values, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xs">
        <TextInput
          label="メニュー名"
          size="xs"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <div>
          <NumberInput
            label="価格"
            icon={<IconCurrencyYen size={18} />}
            size="xs"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }
            withAsterisk
            hideControls
            {...form.getInputProps("price")}
          />
          {form.values.price ? (
            <Group position="right">
              <Text>{`税抜¥ ${form.values.price.toLocaleString()} (税込¥ ${calculatePriceWithTax(
                form.values.price
              ).toLocaleString()})`}</Text>
            </Group>
          ) : null}
        </div>

        <TextInput
          label="説明"
          size="xs"
          {...form.getInputProps("description")}
        />

        <Select
          data={selectData}
          label="カテゴリー"
          placeholder="カテゴリーを選択してください"
          size="xs"
          {...form.getInputProps("menuCategoryId")}
        />

        <FileInput
          label="イメージ"
          placeholder="イメージ画像を選択してください"
          size="xs"
          clearable
          accept="image/*"
          icon={<IconPhoto size={18} />}
          {...form.getInputProps("image")}
        />

        <Preview image={form.values.image} />

        <Space h="1rem" />

        <Button
          size="xs"
          type="submit"
          loading={isMutating}
          loaderPosition="center"
        >
          {isMutating ? "" : "Comfirm"}
        </Button>
      </Stack>
    </form>
  );
};

const Preview: FC<{ image: File | null }> = memo((props) => {
  if (!props.image) {
    return null;
  }

  const imageUrl = URL.createObjectURL(props.image);
  return (
    <Image
      src={imageUrl}
      width={120}
      height={120}
      fit="contain"
      imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
    />
  );
});

Preview.displayName = "Preview";
