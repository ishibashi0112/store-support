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
import React, { FC, useMemo, useState } from "react";

import { useCategories } from "@/lib/hook/useCategories";
import { useMemuMutation } from "@/lib/hook/useMemuMutation";
import { calculatePriceWithTax } from "@/lib/utils/function";
import { addMenuFormschema, AddMenuFormValues } from "@/lib/zod/schema";

export const AddMenuForm: FC = () => {
  // const { query } = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const { categories } = useCategories();
  const { trigger, isMutating } = useMemuMutation();
  // const { mutate } = useSWRConfig();

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

  const preview = useMemo(() => {
    if (!form.values.image) return <></>;

    const imageUrl = URL.createObjectURL(form.values.image);
    return (
      <Image
        src={imageUrl}
        width={120}
        height={120}
        fit="contain"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  }, [form.values.image]);

  const handleSubmit = async (values: typeof form.values) => {
    // if (!query.id) return;
    try {
      // setIsloading(true);
      // const storeId = query.id as string;

      // const filePath = values.image ? await imageUpload(values.image) : null;
      // const { image, ...newValue } = values;

      // const menusData = { ...newValue, imagePath: filePath };
      // await createMenus(menusData);
      trigger(values);
      // await mutate(`/api/${storeId}/menus`);

      form.reset();
      // close();
    } catch (error) {
      console.error(error);
    }
    // finally {
    //   setIsloading(false);
    // }
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

        {preview}

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
