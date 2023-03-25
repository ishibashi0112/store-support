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
import { useMemuMutation } from "@/lib/hook/useMemuMutation";
import { calculatePriceWithTax } from "@/lib/utils/function";
import { addMenuFormSchema, AddMenuFormValues } from "@/lib/zod/schema";

import { Menu } from "../type/type";

type Props = {
  menu?: Menu;
};

export const MenuForm: FC<Props> = (props) => {
  const { categories } = useCategories();
  const { trigger, isMutating } = useMemuMutation(props.menu ? "PUT" : "POST");

  const form = useForm<AddMenuFormValues>({
    initialValues: {
      name: props.menu ? props.menu.name : "",
      price: props.menu ? props.menu.price : 0,
      description: props.menu ? props.menu.description : "",
      image: null,
      menuCategoryId: props.menu ? props.menu.menuCategoryId : "",
    },
    validate: zodResolver(addMenuFormSchema),
  });

  const selectData = categories
    ? categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const handleSubmit = (values: typeof form.values): void => {
    const data = {
      values,
      id: props.menu ? props.menu.id : "",
      currentImagePath: props.menu?.imagePath ? props.menu.imagePath : "",
    };
    trigger(data, {
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

        <div>
          <FileInput
            label="イメージ"
            placeholder={
              props.menu?.imagePath
                ? "変更が必要な場合は選択してください"
                : "イメージ画像を選択してください"
            }
            size="xs"
            clearable
            accept="image/*"
            icon={<IconPhoto size={18} />}
            {...form.getInputProps("image")}
          />
          {props.menu?.imagePath && <Text>{props.menu.imagePath}</Text>}
        </div>

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
